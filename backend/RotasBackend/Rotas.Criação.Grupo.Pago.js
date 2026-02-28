
const express = require('express');
const ControleCriacaoGrupoPago = require('../controles/Controles.Criação.Grupo.Pago.js');
const authMiddleware = require('../config/Middleware.Autenticacao.JWT.js');

const router = express.Router();

// @route   POST /api/groups/paid
// @desc    Criar um novo grupo pago (VIP)
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPago.handle);

module.exports = router;
