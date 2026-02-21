
import axios from 'axios';
import { financialRepositorio } from '../GerenciadoresDeDados/financial.repositorio.js';

// Usamos a chave da FLUX (Plataforma) para criar as sessões e coletar taxas
const PLATFORM_STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const STRIPE_API_BASE = 'https://api.stripe.com/v1';

export const stripeService = {
    /**
     * Verifica as credenciais buscando informações da conta
     */
    verifyCredentials: async (secretKey) => {
        try {
            const response = await axios.get(`${STRIPE_API_BASE}/account`, {
                auth: { username: secretKey, password: '' }
            });
            return response.data;
        } catch (error) {
            console.error('Stripe Auth Error:', error.response?.data || error.message);
            const stripeError = error.response?.data?.error?.message;
            throw new Error(stripeError || 'Falha na autenticação com a Stripe. Verifique sua Secret Key.');
        }
    },

    /**
     * Cria uma sessão de Checkout com Split de Taxa Automático
     */
    createCheckoutSession: async (group, sellerId, successUrl, cancelUrl) => {
        try {
            const grossAmount = parseFloat(group.price);
            
            // Mock do cálculo de taxas, já que o FeeEngine foi removido
            const feeData = {
                platformFee: 0,
                providerFee: 0, // A taxa do provedor é tratada pela Stripe
                netAmount: grossAmount
            };

            const isSubscription = group.accessType === 'temporary';
            const params = new URLSearchParams();
            
            params.append('mode', isSubscription ? 'subscription' : 'payment');
            params.append('automatic_payment_methods[enabled]', 'true');

            params.append('line_items[0][price_data][currency]', (group.currency || 'BRL').toLowerCase());
            params.append('line_items[0][price_data][product_data][name]', `VIP: ${group.name}`);
            params.append('line_items[0][price_data][unit_amount]', Math.round(grossAmount * 100));
            
            if (isSubscription) {
                params.append('line_items[0][price_data][recurring][interval]', 'month');
            }
            
            params.append('line_items[0][quantity]', '1');
            params.append('success_url', successUrl);
            params.append('cancel_url', cancelUrl);
            
            params.append('metadata[groupId]', group.id);
            params.append('metadata[sellerId]', sellerId);
            params.append('metadata[platformFee]', feeData.platformFee.toString());

            const feeInCents = Math.round(feeData.platformFee * 100);
            if (feeInCents > 0) {
                params.append('payment_intent_data[application_fee_amount]', feeInCents.toString());
            }

            const response = await axios.post(`${STRIPE_API_BASE}/checkout/sessions`, params, {
                auth: { username: PLATFORM_STRIPE_SECRET, password: '' },
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });

            return {
                id: response.data.id,
                url: response.data.url
            };
        } catch (error) {
            console.error('Stripe Session Error:', error.response?.data || error.message);
            throw new Error('Erro ao criar checkout na Stripe.');
        }
    },

    handleWebhook: async (event) => {
        const type = event.type;
        const data = event.data.object;

        if (type === 'checkout.session.completed') {
            await stripeService.fulfillOrder(data);
        }
    },

    fulfillOrder: async (session) => {
        const { groupId, sellerId } = session.metadata;
        const grossAmount = session.amount_total / 100;
        const platformFee = parseFloat(session.metadata.platformFee || 0);
        const netAmount = grossAmount - platformFee;

        try {
            await financialRepositorio.recordTransaction({
                userId: sellerId,
                relatedEntityId: groupId,
                relatedEntityType: 'group',
                grossAmount: grossAmount,
                platformFee: platformFee,
                providerFee: 0, // A taxa do provedor já é descontada pela Stripe
                netAmount: netAmount,
                currency: session.currency.toUpperCase(),
                type: 'sale',
                status: 'completed',
                provider: 'stripe',
                providerTransactionId: session.id,
                metadata: {
                    payment_intent: session.payment_intent
                }
            });
        } catch (e) {
            console.error(`❌ [Fulfill Error]:`, e.message);
        }
    }
};
