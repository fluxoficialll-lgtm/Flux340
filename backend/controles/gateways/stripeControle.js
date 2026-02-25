
import { stripeGatewayService } from '../../ServiçosBackEnd/Gateways/stripeGatewayService.js';

const stripeControle = {

    // --- Novas Funções de Gerenciamento de Credenciais ---

    /**
     * Gera um link de conexão do Stripe para o vendedor.
     */
    generateAccountLink: async (req, res) => {
        try {
            const userId = req.user.id; // Assumindo que o ID do usuário está no objeto req.user
            const { refreshUrl, returnUrl } = req.body;
            const accountLink = await stripeGatewayService.createAccountLink(userId, refreshUrl, returnUrl, req.traceId);
            res.json({ url: accountLink });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao gerar o link de conexão do Stripe.' });
        }
    },

    /**
     * Obtém detalhes da conta Stripe conectada.
     */
    getAccountDetails: async (req, res) => {
        try {
            const userId = req.user.id;
            const accountDetails = await stripeGatewayService.getAccount(userId, req.traceId);
            res.json(accountDetails);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao buscar detalhes da conta Stripe.' });
        }
    },

    /**
     * Verifica o status da conta Stripe (conectada, pagamentos ativos, etc.).
     */
    getAccountStatus: async (req, res) => {
        try {
            const userId = req.user.id;
            const status = await stripeGatewayService.getAccountStatus(userId, req.traceId);
            res.json(status);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao verificar o status da conta Stripe.' });
        }
    },

    // --- Funções existentes ---

    /**
     * Rota para verificar as credenciais do Stripe.
     */
    getAuthToken: async (req, res) => {
        try {
            const { secretKey } = req.body;
            const result = await stripeGatewayService.verifyCredentials(secretKey, req.traceId);
            res.json(result);
        } catch (e) {
            res.status(e.statusCode || 401).json({ error: e.message });
        }
    },

    /**
     * Rota para desconectar a conta do Stripe de um usuário.
     */
    disconnect: async (req, res) => {
        try {
            const userId = req.user.id;
            const result = await stripeGatewayService.disconnect(userId, req.traceId);
            res.json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao desconectar o provedor.' });
        }
    },

    /**
     * Rota para criar uma sessão de checkout do Stripe.
     */
    createSession: async (req, res) => {
        try {
            const sessionData = { ...req.body, userId: req.user.id };
            const session = await stripeGatewayService.createCheckoutSession(sessionData, req.traceId);
            res.json(session);
        } catch (e) {
            res.status(e.statusCode || 500).json({ error: e.message });
        }
    },

    /**
     * Rota para verificar o status de uma sessão de checkout do Stripe.
     */
    checkStatus: async (req, res) => {
        try {
            const statusData = { ...req.body, userId: req.user.id };
            const result = await stripeGatewayService.checkStatus(statusData, req.traceId);
            res.json(result);
        } catch (e) {
            res.status(e.statusCode || 500).json({ error: e.message });
        }
    }
};

export default stripeControle;
