
import { useState, useEffect, useRef } from 'react';
import { ServicoGestaoCredencialStripe as stripeService } from '../../ServiçosFrontend/ServiçoDeProvedoresDePagamentos/ServiçoGestãoCredencialStripe.js';
import { Group } from '../../types';
import { ControleDeSimulacao } from '../../ServiçosFrontend/ServiçoDeSimulação/ControleDeSimulacao.js';

// Tipos exportados para uso no componente
export interface ConversionResult { amount: number; currency: string; symbol: string; formatted: string; }
export interface GeoData { countryCode: string; countryName: string; city: string; region: string; }
export type StripeView = 'selection' | 'pix' | 'card' | 'debit_card' | 'oxxo' | 'sepa' | 'klarna' | 'sofort' | 'bacs' | 'ach' | 'konbini' | 'upi' | 'processing' | 'boleto' | 'redirection' | 'link' | 'wallet' | 'interac' | 'paynow' | 'grabpay' | 'afterpay' | 'becs' | 'pad';

const USE_MOCKS = ControleDeSimulacao.isMockMode();

interface UseFluxoDePagamentoStripeProps {
    group: Group;
    onSuccess: () => void;
    onError: (msg: string) => void;
    onTransactionId: (id: string) => void;
}

export const useFluxoDePagamentoStripe = ({ group, onSuccess, onError, onTransactionId }: UseFluxoDePagamentoStripeProps) => {
    const [currentView, setCurrentView] = useState<StripeView>('selection');
    const [paymentData, setPaymentData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const pollingInterval = useRef<any>(null);

    useEffect(() => {
        // Limpa o intervalo de polling quando o hook é desmontado
        return () => { if (pollingInterval.current) clearInterval(pollingInterval.current); };
    }, []);

    const startPolling = (id: string) => {
        if (pollingInterval.current) clearInterval(pollingInterval.current);
        
        pollingInterval.current = setInterval(async () => {
            try {
                // Em modo de simulação, o sucesso é imediato para fins de teste.
                if (USE_MOCKS) {
                    clearInterval(pollingInterval.current);
                    onSuccess();
                    return;
                }

                const res = await stripeService.checkSessionStatus(id, group.creatorEmail!);
                if (res.status === 'paid') {
                    clearInterval(pollingInterval.current);
                    onSuccess();
                }
            } catch (e) {
                // Em caso de erro no polling, o intervalo é limpo para evitar chamadas contínuas.
                clearInterval(pollingInterval.current);
            }
        }, 4000);
    };

    const generatePayment = async (method: StripeView) => {
        setIsLoading(true);
        setCurrentView('processing');

        if (USE_MOCKS) {
            setTimeout(() => {
                setIsLoading(false);
                setCurrentView(method);
                startPolling('mock_id');
            }, 1200);
            return;
        }

        try {
            const intent = await stripeService.createPaymentIntent(group, group.creatorEmail!, method);
            setPaymentData(intent);
            onTransactionId(intent.id);
            setCurrentView(method); // Altera para a view do método (ex: 'pix', 'boleto')
            startPolling(intent.id);
        } catch (err: any) {
            onError(err.message || "Erro ao gerar o pagamento.");
            setCurrentView('selection'); // Retorna para a seleção em caso de erro
        } finally {
            setIsLoading(false);
        }
    };

    return {
        currentView,
        setCurrentView, // Exposto para que o componente possa controlar as views que não exigem API calls
        paymentData,
        isLoading,
        generatePayment, // Nova função para lidar apenas com a criação de pagamentos
    };
};
