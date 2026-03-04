
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ModalOpcoesPagamentosSyncPay } from './CardsOpcoesDePagamentos/ModalOpcoesPagamentosSyncPay';
import { ModalOpcoesPagamentosPayPal } from './CardsOpcoesDePagamentos/ModalOpcoesPagamentosPayPal';
import { ModalOpcoesPagamentosStripe } from './CardsOpcoesDePagamentos/ModalOpcoesPagamentosStripe';
import { authService } from '../../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { GeoData } from '../../ServiçosFrontend/geoService';
import { ConversionResult } from '../../ServiçosFrontend/currencyService';
import { Group } from '../../types';
import { getSimulatedPaymentData, SimulatedCheckoutResponse } from '../../ServiçosFrontend/ServiçoDeSimulação/simulacoes/Simulacao.Pagamento';

interface PaymentFlowModalProps {
    isOpen: boolean;
    onClose: () => void;
    group: Group;
    provider: 'syncpay' | 'paypal' | 'stripe';
    convertedPriceInfo: ConversionResult | null;
    geo: GeoData | null;
    isSimulated?: boolean;
    simulationCountryCode?: string;
}

export const PaymentFlowModal: React.FC<PaymentFlowModalProps> = ({ 
    isOpen, onClose, group, provider, convertedPriceInfo, geo, isSimulated, simulationCountryCode 
}) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [txId, setTxId] = useState('');
    const [simulatedData, setSimulatedData] = useState<SimulatedCheckoutResponse | null>(null);

    const user = authService.getCurrentUser();
    const isCreator = user?.email === group.creatorEmail;

    useEffect(() => {
        if (!isOpen) {
            setStatus('idle');
            setSimulatedData(null); // Limpa os dados da simulação ao fechar
        } else if (isSimulated && provider && simulationCountryCode) {
            // Se for simulação, busca os dados mockados
            const data = getSimulatedPaymentData(provider, simulationCountryCode);
            setSimulatedData(data);
        }
    }, [isOpen, isSimulated, provider, simulationCountryCode]);

    const handleSuccess = () => setStatus('success');
    const handleError = (msg: string) => { setStatus('error'); setErrorMessage(msg); };

    const handleRedeem = () => {
        const email = authService.getCurrentUserEmail() || localStorage.getItem('guest_email_capture');
        if (!email) {
            sessionStorage.setItem('redirect_after_login', `/payment-success-bridge/${group.id}`);
            navigate('/register');
            return;
        }
        navigate(`/payment-success-bridge/${group.id}`, { replace: true });
    };

    const renderSimulatedContent = () => {
        if (!simulatedData) {
            return <p className="text-white">Carregando dados da simulação...</p>;
        }

        return (
            <div className='text-white'>
                <h2 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Checkout Simulado</h2>
                <p className="text-xs text-gray-400 mb-4">Provedor: <span className='font-bold'>{simulatedData.provider}</span> | País: <span className='font-bold'>{simulatedData.country}</span></p>
                
                {simulatedData.paymentMethods.map(method => {
                    if (method.method === 'pix') {
                        return (
                            <div key="pix" className="text-left p-4 bg-white/5 rounded-lg mb-2">
                                <h3 className='font-bold text-lg'><i className="fa-brands fa-pix mr-2"></i> PIX</h3>
                                <p className='text-xs text-gray-300 truncate mt-2'>QR Code: {method.details.qrCode}</p>
                                <p className='text-xs text-gray-300 truncate mt-1'>Copia e Cola: {method.details.copiaECola}</p>
                                 <button onClick={handleSuccess} className="w-full mt-4 py-2 bg-[#00ff82] text-black rounded-lg font-bold text-sm">Simular Pagamento PIX</button>
                            </div>
                        );
                    }
                     if (method.method === 'boleto') {
                        return (
                            <div key="boleto" className="text-left p-4 bg-white/5 rounded-lg mb-2">
                                <h3 className='font-bold text-lg'><i className="fa-solid fa-barcode mr-2"></i> BOLETO</h3>
                                <p className='text-xs text-gray-300 truncate mt-2'>Linha Digitável: {method.details.linhaDigitavel}</p>
                                 <button onClick={handleSuccess} className="w-full mt-4 py-2 bg-gray-400 text-black rounded-lg font-bold text-sm">Simular Pagamento Boleto</button>
                            </div>
                        );
                    }
                    if (method.method === 'card') {
                         return (
                            <div key="card" className="text-left p-4 bg-white/5 rounded-lg mb-2">
                                <h3 className='font-bold text-lg'><i className="fa-solid fa-credit-card mr-2"></i> Cartão de Crédito</h3>
                                <p className='text-sm text-gray-300 mt-2'>Um formulário para inserção de dados do cartão seria exibido aqui.</p>
                                <button onClick={handleSuccess} className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg font-bold text-sm">Simular Pagamento Cartão</button>
                            </div>
                        );
                    }
                    if (method.method === 'paypal_redirect') {
                         return (
                            <div key="paypal" className="text-left p-4 bg-white/5 rounded-lg mb-2">
                                <h3 className='font-bold text-lg'><i className="fa-brands fa-paypal mr-2"></i> PayPal</h3>
                                <p className='text-sm text-gray-300 mt-2'>Você seria redirecionado para o PayPal para completar a compra.</p>
                                <button onClick={handleSuccess} className="w-full mt-4 py-2 bg-[#0070ba] text-white rounded-lg font-bold text-sm">Simular Redirecionamento</button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/95 z-[100] flex justify-center items-center backdrop-blur-md animate-fade-in" 
             onClick={(e) => { if(e.target === e.currentTarget && status !== 'success') onClose(); }}>
            
            <style>{`
                .payment-modal-card { 
                    background: #0c0f14; padding: 30px 24px; border-radius: 20px; 
                    width: 90%; max-width: 380px; text-align: center;
                    border: 1px solid #00c2ff; box-shadow: 0 0 40px rgba(0, 194, 255, 0.2);
                    max-height: 90vh; overflow-y: auto;
                    position: relative;
                }
                .sim-badge {
                    position: absolute; top: 0; left: 0; transform: translateY(-100%); width: 100%;
                    background: #FFD700; color: #000; font-size: 10px; font-weight: 900;
                    padding: 4px; text-transform: uppercase; letter-spacing: 1px;
                    border-radius: 20px 20px 0 0;
                }
            `}</style>

            <div className="payment-modal-card animate-pop-in">
                {(isCreator || isSimulated) && <div className="sim-badge"><i className="fa-solid fa-wand-magic-sparkles mr-1"></i> {isSimulated ? 'MODO SIMULAÇÃO' : 'Visualização de Proprietário'}</div>}

                {status === 'idle' && (
                    isSimulated ? renderSimulatedContent() :
                    <>
                        {provider === 'syncpay' && <ModalOpcoesPagamentosSyncPay group={group} onSuccess={handleSuccess} onError={handleError} onTransactionId={setTxId} />}
                        {provider === 'paypal' && <ModalOpcoesPagamentosPayPal group={group} convertedPriceInfo={convertedPriceInfo} onSuccess={handleSuccess} onError={handleError} onTransactionId={setTxId} />}
                        {provider === 'stripe' && <ModalOpcoesPagamentosStripe group={group} geo={geo} convertedPriceInfo={convertedPriceInfo} onSuccess={handleSuccess} onError={handleError} onTransactionId={setTxId} />}
                    </>
                )}

                {status === 'success' && (
                    <div className="py-6 animate-fade-in">
                         <div className="w-20 h-20 bg-[#00ff82]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#00ff82]">
                            <i className="fa-solid fa-check text-4xl text-[#00ff82]"></i>
                        </div>
                        <h2 className="text-2xl font-black text-white mb-2">PAGAMENTO {isSimulated ? 'SIMULADO' : 'APROVADO'}</h2>
                        <p className="text-gray-400 text-sm mb-8">Sua vaga na área VIP foi liberada com sucesso!</p>
                        {isSimulated ? (
                            <button onClick={onClose} className="w-full py-4 bg-gray-600 text-white rounded-xl font-bold text-lg">FECHAR SIMULAÇÃO</button>
                        ) : (
                            <button onClick={handleRedeem} className="w-full py-4 bg-[#00ff82] text-black rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,255,130,0.3)]">
                                ACESSAR AGORA <i className="fa-solid fa-arrow-right ml-2"></i>
                            </button>
                        )}
                    </div>
                )}

                {status === 'error' && (
                    <div className="py-6">
                        <i className="fa-solid fa-circle-exclamation text-5xl text-red-500 mb-4"></i>
                        <p className="text-red-400 mb-6">{errorMessage}</p>
                        <button onClick={() => setStatus('idle')} className="w-full py-3 bg-white/5 text-white rounded-lg font-bold border border-white/10">
                            TENTAR NOVAMENTE
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
