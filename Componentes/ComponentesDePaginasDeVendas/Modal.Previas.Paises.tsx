
import React, { Suspense, lazy } from 'react';
import { Group } from '../../types';
import { GeoData } from '../../ServiçosFrontend/geoService';
import { ConversionResult } from '../../ServiçosFrontend/currencyService';
import { Country } from './Modal.Seletor.Pais';

// --- Modais de Fluxo Real ---
const PaymentFlowModal = lazy(() => import('../ComponentesDeProvedores/PaymentFlowModal').then(m => ({ default: m.PaymentFlowModal })));
const EmailCaptureModal = lazy(() => import('../ComponentesDeProvedores/EmailCaptureModal').then(m => ({ default: m.EmailCaptureModal })));
const ModalSeletorProvedor = lazy(() => import('./Modal.Seletor.Provedor').then(m => ({ default: m.ModalSeletorProvedor })));

// --- Modais de PRÉVIA para Simulação ---
const ModalPreviaStripe = lazy(() => import('./Modal.Previa.Stripe').then(m => ({ default: m.ModalPreviaStripe })));
const ModalPreviaPayPal = lazy(() => import('./Modal.Previa.PayPal').then(m => ({ default: m.ModalPreviaPayPal })));
const ModalPreviaSyncPay = lazy(() => import('./Modal.Previa.SyncPay').then(m => ({ default: m.ModalPreviaSyncPay })));

interface ModalPreviasPaisesProps {
  isOpen: {
    pix: boolean;
    email: boolean;
    simulator: boolean;
  };
  onClose: () => void;
  group: Group;
  geoData: GeoData | null;
  priceInfo: ConversionResult | null;
  onEmailSuccess: (email: string) => void;
  onSimulateConfirm?: (provider: 'syncpay' | 'stripe' | 'paypal', country: Country) => void;
  forcedProvider?: 'syncpay' | 'stripe' | 'paypal' | null;

  isSimulated?: boolean;
  simulationProvider?: 'syncpay' | 'stripe' | 'paypal';
  simulationCountryCode?: string;
}

// Componente interno para decidir qual modal renderizar (real ou prévia)
const ModalContent: React.FC<ModalPreviasPaisesProps> = (props) => {
  const {
    isOpen, onClose, group, geoData, priceInfo,
    isSimulated, simulationProvider, simulationCountryCode
  } = props;

  // 1. Se estamos em MODO DE SIMULAÇÃO, renderizamos um dos modais de PRÉVIA.
  if (isSimulated) {
    if (!simulationProvider) return null; // Segurança: não renderiza nada se o provedor de simulação não foi escolhido.

    const commonProps = {
      isOpen: isOpen.pix,
      onClose: onClose,
      // Usa o preço dos mocks ou um valor padrão.
      valor: group.vipPrice || 19.99,
      moeda: simulationCountryCode === 'BR' ? 'BRL' : 'USD'
    };

    if (simulationProvider === 'stripe') {
      return <ModalPreviaStripe {...commonProps} />;
    }
    if (simulationProvider === 'paypal') {
      return <ModalPreviaPayPal {...commonProps} />;
    }
    if (simulationProvider === 'syncpay') {
      return <ModalPreviaSyncPay {...commonProps} pais={simulationCountryCode || 'BR'} />;
    }
    return null;
  }

  // 2. Se NÃO estamos em simulação, renderizamos o fluxo de pagamento REAL.
  const effectiveProvider = props.forcedProvider || (geoData?.countryCode === 'BR' ? 'syncpay' : 'stripe');

  return (
    <PaymentFlowModal
      isOpen={isOpen.pix}
      onClose={onClose}
      group={group}
      provider={effectiveProvider}
      convertedPriceInfo={priceInfo}
      geo={geoData}
    />
  );
};


export const ModalPreviasPaises: React.FC<ModalPreviasPaisesProps> = (props) => {
  const { isOpen, onClose, group, onEmailSuccess, onSimulateConfirm } = props;

  return (
    <Suspense fallback={
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <i className="fa-solid fa-circle-notch fa-spin text-2xl text-white"></i>
        </div>
    }>
      {/* A lógica de qual modal exibir (real vs prévia) foi movida para o ModalContent */}
      {isOpen.pix && <ModalContent {...props} />}

      {isOpen.email && (
        <EmailCaptureModal
          isOpen={isOpen.email}
          onClose={onClose}
          onSuccess={onEmailSuccess}
          pixelId={group.pixelId}
          groupId={group.id}
        />
      )}

      {isOpen.simulator && onSimulateConfirm && (
        <ModalSeletorProvedor
          isOpen={isOpen.simulator}
          onClose={onClose}
          onConfirm={onSimulateConfirm}
        />
      )}
    </Suspense>
  );
};
