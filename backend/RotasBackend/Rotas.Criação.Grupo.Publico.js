
const express = require('express');
const ControleCriacaoGrupoPublico = require('../controles/Controles.Criação.Grupo.Publico.js');
const authMiddleware = require('../meu-software-de-servidor/autenticar.js'); // Supondo que você tenha um middleware de autenticação

const router = express.Router();

// @route   POST /api/groups/public
// @desc    Criar um novo grupo público
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPublico.handle);

module.exports = router;
