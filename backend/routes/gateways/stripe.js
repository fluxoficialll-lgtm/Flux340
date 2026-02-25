
import express from 'express';
import stripeControle from '../../controles/gateways/stripeControle.js';

const router = express.Router();

// --- Rotas de Credenciamento e Conexão ---
router.post('/connect/account-link', stripeControle.generateAccountLink);
router.get('/account-details', stripeControle.getAccountDetails);
router.get('/account-status', stripeControle.getAccountStatus);

// Rota para desconectar a conta do Stripe de um usuário
router.post('/disconnect', stripeControle.disconnect);


// --- Rotas de Pagamento (já existentes) ---

// Rota para verificar as credenciais do Stripe
router.post('/auth-token', stripeControle.getAuthToken);

// Rota para criar uma sessão de checkout do Stripe
router.post('/create-session', stripeControle.createSession);

// Rota para verificar o status de uma sessão de checkout do Stripe
router.post('/check-status', stripeControle.checkStatus);

export default router;
