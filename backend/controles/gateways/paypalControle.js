
import { paypalGatewayService } from '../../ServiçosBackEnd/Gateways/paypalGatewayService.js';

const paypalControle = {

    // --- Novas Funções de Gerenciamento de Credenciais ---

    /**
     * Gera um link de conexão do PayPal para o vendedor.
     */
    generateAccountLink: async (req, res) => {
        try {
            const userId = req.user.id;
            const { returnUrl, refreshUrl } = req.body; // O PayPal pode precisar de URLs de retorno
            const approvalUrl = await paypalGatewayService.createAccountLink(userId, returnUrl, refreshUrl, req.traceId);
            res.json({ approvalUrl });
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao gerar o link de conexão do PayPal.' });
        }
    },

    /**
     * Obtém detalhes da conta PayPal conectada.
     */
    getAccountDetails: async (req, res) => {
        try {
            const userId = req.user.id;
            const accountDetails = await paypalGatewayService.getAccountDetails(userId, req.traceId);
            res.json(accountDetails);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao buscar detalhes da conta PayPal.' });
        }
    },

    /**
     * Verifica o status da conta PayPal.
     */
    getAccountStatus: async (req, res) => {
        try {
            const userId = req.user.id;
            const status = await paypalGatewayService.getAccountStatus(userId, req.traceId);
            res.json(status);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao verificar o status da conta PayPal.' });
        }
    },

    // --- Funções existentes ---

    /**
     * Rota para verificar credenciais do PayPal e obter um token.
     */
    getAuthToken: async (req, res) => {
        try {
            const { clientId, clientSecret } = req.body;
            const result = await paypalGatewayService.verifyCredentials(clientId, clientSecret, req.traceId);
            res.json(result);
        } catch (e) {
            res.status(e.statusCode || 401).json({ error: e.message });
        }
    },

    /**
     * Rota para desconectar a conta do PayPal de um usuário.
     */
    disconnect: async (req, res) => {
        try {
            const userId = req.user.id;
            const result = await paypalGatewayService.disconnect(userId, req.traceId);
            res.json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao desconectar o provedor.' });
        }
    },

    /**
     * Rota para criar uma ordem de pagamento no PayPal.
     */
    createOrder: async (req, res) => {
        try {
            const order = await paypalGatewayService.createOrder(req.body, req.traceId);
            res.json(order);
        } catch (e) {
            res.status(e.statusCode || 500).json({ error: e.message });
        }
    },

    /**
     * Rota para verificar o status de uma ordem de pagamento.
     */
    checkStatus: async (req, res) => {
        try {
            const result = await paypalGatewayService.checkStatus(req.body, req.traceId);
            res.json(result);
        } catch (e) {
            res.status(e.statusCode || 500).json({ error: e.message });
        }
    }
};

export default paypalControle;
