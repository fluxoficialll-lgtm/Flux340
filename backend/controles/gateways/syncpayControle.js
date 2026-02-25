
import { syncpayGatewayService } from '../../ServiçosBackEnd/Gateways/syncpayGatewayService.js';

const syncpayControle = {

    // --- Novas Funções de Gerenciamento de Credenciais ---

    /**
     * Salva as credenciais do SyncPay para um vendedor.
     */
    saveCredentials: async (req, res) => {
        try {
            const userId = req.user.id;
            const { credentials } = req.body;
            const result = await syncpayGatewayService.saveCredentials(userId, credentials, req.traceId);
            res.json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao salvar as credenciais do SyncPay.' });
        }
    },

    /**
     * Valida as credenciais do SyncPay.
     */
    validateCredentials: async (req, res) => {
        try {
            const userId = req.user.id;
            const result = await syncpayGatewayService.validateCredentials(userId, req.traceId);
            res.json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao validar as credenciais.' });
        }
    },

    /**
     * Obtém detalhes da conta SyncPay.
     */
    getAccountDetails: async (req, res) => {
        try {
            const userId = req.user.id;
            const details = await syncpayGatewayService.getAccountDetails(userId, req.traceId);
            res.json(details);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao buscar detalhes da conta.' });
        }
    },

    // --- Funções existentes ---

    /**
     * Rota para obter um token de autenticação do SyncPay.
     */
    getAuthToken: async (req, res) => {
        try {
            const { clientId, clientSecret } = req.body;
            if (!clientId || !clientSecret) {
                return res.status(400).json({ error: 'Credenciais ausentes no corpo da requisição.' });
            }
            const result = await syncpayGatewayService.getAuthToken(clientId, clientSecret, req.traceId);
            res.json(result);
        } catch (e) {
            res.status(e.statusCode || 401).json({ error: e.message });
        }
    },

    /**
     * Rota para desconectar o SyncPay de um usuário.
     */
    disconnect: async (req, res) => {
        try {
            const userId = req.user.id;
            const result = await syncpayGatewayService.disconnect(userId, req.traceId);
            res.json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ error: error.message || 'Falha ao desconectar o provedor.' });
        }
    },

    /**
     * Rota para processar um pagamento (cash-in).
     */
    cashIn: async (req, res) => {
        try {
            const result = await syncpayGatewayService.createPayment({ payload: req.body.payload }, req.traceId);
            res.json(result);
        } catch (e) {
            res.status(e.statusCode || 500).json({ error: e.message });
        }
    },

    /**
     * Rota para verificar o status de uma transação.
     */
    checkStatus: async (req, res) => {
        try {
            const txData = await syncpayGatewayService.getTransactionStatus(req.body, req.traceId);
            res.json(txData);
        } catch (e) {
            // O serviço já retorna um objeto de erro padronizado em caso de falha na API
            res.json(e);
        }
    },

    /**
     * Rota para verificar o saldo de um vendedor.
     */
    getBalance: async (req, res) => {
        try {
            const data = await syncpayGatewayService.getBalance(req.body, req.traceId);
            res.json(data);
        } catch (e) {
            res.status(e.statusCode || 500).json({ error: e.message });
        }
    }
};

export default syncpayControle;
