
import { useState, useCallback } from 'react';
import { loadStripe, Stripe } from '@stripe/stripe-js';
// CORREÇÃO DEFINITIVA: Corrigindo o caminho da importação para o serviço do Stripe
import { ServicoGestaoCredencialStripe as stripeService } from '../../ServiçosFrontend/ServiçoDeProvedoresDePagamentos/ServiçoGestãoCredencialStripe';
import { Group } from '../../types';
import { servicoDeSimulacao } from '../../ServiçosFrontend/ServiçoDeSimulação';

// Tipos exportados para uso no componente
export type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';
export interface UsePaymentFlowOptions {
    onPaymentSuccess?: (details: any) => void;
    onPaymentError?: (error: any) => void;
}

// Hook customizado
export const useFluxoDePagamentoStripe = (group: Group, options: UsePaymentFlowOptions = {}) => {
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const [status, setStatus] = useState<PaymentStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    // Carrega a instância do Stripe com a chave publicável
    useState(() => {
        const load = async () => {
            const publicKey = await stripeService.getPublishableKey();
            if (publicKey) {
                setStripe(await loadStripe(publicKey));
            }
        };
        load();
    }, []);

    // Função para iniciar o fluxo de pagamento
    const iniciarPagamento = useCallback(async () => {
        if (servicoDeSimulacao.estaAtivo()) {
            console.warn("[SIMULAÇÃO] Fluxo de pagamento com Stripe não executado em modo de simulação.");
            setStatus('success'); // Simula sucesso imediato
            if (options.onPaymentSuccess) options.onPaymentSuccess({ simulation: true });
            return;
        }

        if (!stripe || !group) {
            console.error("Stripe ou Grupo não está disponível.");
            setError("O sistema de pagamento não está pronto. Tente novamente em alguns instantes.");
            setStatus('error');
            return;
        }

        setStatus('processing');
        setError(null);

        try {
            const clientSecret = await stripeService.createPaymentIntent(group.price, 'BRL');

            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                // Aqui iriam os detalhes do cartão, se não estiver usando Elements
            });

            if (stripeError) {
                throw new Error(stripeError.message || "Ocorreu um erro durante a confirmação do pagamento.");
            }

            setStatus('success');
            if (options.onPaymentSuccess) options.onPaymentSuccess({ clientSecret });

        } catch (err: any) {
            console.error("Falha no processo de pagamento:", err);
            setError(err.message || "Não foi possível processar seu pagamento.");
            setStatus('error');
            if (options.onPaymentError) options.onPaymentError(err);
        }
    }, [stripe, group, options]);

    return { iniciarPagamento, status, error };
};
