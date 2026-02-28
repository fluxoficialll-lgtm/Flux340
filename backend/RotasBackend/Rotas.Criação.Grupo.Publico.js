
const express = require('express');
const ControleCriacaoGrupoPublico = require('../controles/Controles.Criação.Grupo.Publico.js');
const authMiddleware = require('../config/Middleware.Autenticacao.JWT.js');

const router = express.Router();

// @route   POST /api/groups/public
// @desc    Criar um novo grupo público
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPublico.handle);

module.exports = router;
