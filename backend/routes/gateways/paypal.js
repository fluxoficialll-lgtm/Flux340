
import express from 'express';
import paypalControle from '../../controles/gateways/paypalControle.js';

const router = express.Router();

// --- Rotas de Credenciamento e Conexão ---
router.post('/connect/account-link', paypalControle.generateAccountLink);
router.get('/account-details', paypalControle.getAccountDetails);
router.get('/account-status', paypalControle.getAccountStatus);

// Rota para desconectar a conta do PayPal de um usuário
router.post('/disconnect', paypalControle.disconnect);


// --- Rotas de Pagamento (já existentes) ---

// Rota para verificar credenciais do PayPal e obter um token
router.post('/auth-token', paypalControle.getAuthToken);

// Rota para criar uma ordem de pagamento no PayPal
router.post('/create-order', paypalControle.createOrder);

// Rota para verificar o status de uma ordem de pagamento
router.post('/check-status', paypalControle.checkStatus);

export default router;
