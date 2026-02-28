
const express = require('express');
const credencialStripeController = require('../controles/Controles.Gestao.Credencial.Stripe.js');

const router = express.Router();

// @route   POST /api/credenciais-stripe/account-link
// @desc    Cria um link de onboarding do Stripe
router.post('/account-link', credencialStripeController.createAccountLink);

// @route   GET /api/credenciais-stripe/account-details
// @desc    Busca detalhes da conta Stripe conectada
router.get('/account-details', credencialStripeController.getAccountDetails);

// @route   DELETE /api/credenciais-stripe/disconnect
// @desc    Desconecta a conta Stripe
router.delete('/disconnect', credencialStripeController.disconnectAccount);

module.exports = router;
