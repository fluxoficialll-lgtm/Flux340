
import express from 'express';
import syncpayControle from '../../controles/gateways/syncpayControle.js';

const router = express.Router();

// --- Rotas de Credenciamento e Conexão ---
router.post('/save-credentials', syncpayControle.saveCredentials);
router.get('/validate-credentials', syncpayControle.validateCredentials);
router.get('/account-details', syncpayControle.getAccountDetails);

// Rota para desconectar o SyncPay de um usuário
router.post('/disconnect', syncpayControle.disconnect);


// --- Rotas de Pagamento (já existentes) ---

// Rota para obter um token de autenticação do SyncPay
router.post('/auth-token', syncpayControle.getAuthToken);

// Rota para processar um pagamento (cash-in)
router.post('/cash-in', syncpayControle.cashIn);

// Rota para verificar o status de uma transação
router.post('/check-status', syncpayControle.checkStatus);

// Rota para verificar o saldo de um vendedor
router.post('/balance', syncpayControle.getBalance);

export default router;
