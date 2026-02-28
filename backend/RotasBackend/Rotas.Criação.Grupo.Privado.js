
const express = require('express');
const ControleCriacaoGrupoPrivado = require('../controles/Controles.Criação.Grupo.Privado.js');
const authMiddleware = require('../config/Middleware.Autenticacao.JWT.js');

const router = express.Router();

// @route   POST /api/groups/private
// @desc    Criar um novo grupo privado
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPrivado.handle);

module.exports = router;
