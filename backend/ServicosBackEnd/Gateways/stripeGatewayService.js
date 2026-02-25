
import Stripe from 'stripe';
import { getStripeKeys, saveStripeAccountId, getStripeAccount, findUserById } from '../../GerenciadoresDeDados/financial.repositorio.js';

// Instanciação principal do Stripe, pode ser com uma chave publicável geral ou apenas no contexto da função.
// Para este serviço, a chave será obtida por usuário.

export const stripeGatewayService = {

    // --- Funções de Gerenciamento de Conta --- 

    /**
     * Cria um link de conta do Stripe para o onboarding do vendedor.
     * Se o usuário não tiver uma conta, uma nova será criada.
     * @param {number} userId ID do usuário na sua plataforma.
     * @param {string} refreshUrl URL para redirecionar se o link expirar.
     * @param {string} returnUrl URL para redirecionar após a conclusão.
     * @param {string} traceId ID de rastreamento.
     * @returns {string} URL do link de onboarding.
     */
    async createAccountLink(userId, refreshUrl, returnUrl, traceId) {
        console.log(`[${traceId}] Iniciando a criação do link de conta Stripe para o usuário ${userId}.`);
        const stripeKeys = await getStripeKeys(userId, traceId); // Assume que esta função retorna a chave secreta principal
        const stripe = new Stripe(stripeKeys.secretKey);

        let accountId = await getStripeAccount(userId, traceId);

        if (!accountId) {
            console.log(`[${traceId}] Nenhuma conta Stripe encontrada para o usuário ${userId}. Criando uma nova.`);
            const user = await findUserById(userId, traceId); // Precisamos do email do usuário
            const account = await stripe.accounts.create({
                type: 'express',
                country: 'BR', // Ou dinâmico, se aplicável
                email: user.email,
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            });
            accountId = account.id;
            await saveStripeAccountId(userId, accountId, traceId);
            console.log(`[${traceId}] Nova conta Stripe criada com ID: ${accountId}`);
        }

        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: refreshUrl,
            return_url: returnUrl,
            type: 'account_onboarding',
        });

        console.log(`[${traceId}] Link de conta gerado com sucesso para a conta ${accountId}.`);
        return accountLink.url;
    },

    /**
     * Obtém os detalhes de uma conta Stripe conectada.
     * @param {number} userId ID do usuário.
     * @param {string} traceId ID de rastreamento.
     * @returns {object} Detalhes da conta.
     */
    async getAccount(userId, traceId) {
        console.log(`[${traceId}] Buscando detalhes da conta Stripe para o usuário ${userId}.`);
        const accountId = await getStripeAccount(userId, traceId);
        if (!accountId) {
            throw { statusCode: 404, message: 'Nenhuma conta Stripe conectada encontrada.' };
        }

        const stripeKeys = await getStripeKeys(userId, traceId);
        const stripe = new Stripe(stripeKeys.secretKey);
        const account = await stripe.accounts.retrieve(accountId);
        return account;
    },

    /**
     * Verifica o status de uma conta Stripe (conectada, pagamentos habilitados).
     * @param {number} userId ID do usuário.
     * @param {string} traceId ID de rastreamento.
     * @returns {object} Status da conta.
     */
    async getAccountStatus(userId, traceId) {
        console.log(`[${traceId}] Verificando o status da conta Stripe para o usuário ${userId}.`);
        const accountId = await getStripeAccount(userId, traceId);
        if (!accountId) {
            return { connected: false, message: 'Nenhuma conta Stripe encontrada.' };
        }

        const account = await this.getAccount(userId, traceId);
        const status = {
            connected: true,
            detailsSubmitted: account.details_submitted,
            chargesEnabled: account.charges_enabled,
            payoutsEnabled: account.payouts_enabled,
        };
        return status;
    },

    // --- Funções de Pagamento (já existentes) ---

    async verifyCredentials(secretKey, traceId) {
        console.log(`[${traceId}] Verificando as credenciais do Stripe.`);
        try {
            const stripe = new Stripe(secretKey);
            await stripe.customers.list({ limit: 1 });
            return { success: true, message: 'Credenciais do Stripe válidas.' };
        } catch (error) {
            throw { statusCode: 401, message: 'Credenciais do Stripe inválidas.' };
        }
    },

    async disconnect(userId, traceId) {
        console.log(`[${traceId}] Desconectando o Stripe para o usuário ${userId}.`);
        await saveStripeAccountId(userId, null, traceId); // Define o ID da conta como nulo
        return { success: true, message: 'Provedor desconectado com sucesso.' };
    },

    async createCheckoutSession(sessionData, traceId) {
        console.log(`[${traceId}] Criando sessão de checkout do Stripe.`);
        const stripeKeys = await getStripeKeys(sessionData.userId, traceId);
        const stripe = new Stripe(stripeKeys.secretKey);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: sessionData.line_items,
            mode: 'payment',
            success_url: sessionData.success_url,
            cancel_url: sessionData.cancel_url,
        });

        return { sessionId: session.id };
    },

    async checkStatus(statusData, traceId) {
        console.log(`[${traceId}] Verificando status da sessão do Stripe.`);
        const stripeKeys = await getStripeKeys(statusData.userId, traceId);
        const stripe = new Stripe(stripeKeys.secretKey);

        const session = await stripe.checkout.sessions.retrieve(statusData.sessionId);

        return { status: session.payment_status };
    },
};
