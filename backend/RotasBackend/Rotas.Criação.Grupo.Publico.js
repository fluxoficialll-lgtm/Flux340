
import express from 'express';
import ControleCriacaoGrupoPublico from '../controles/Controles.Criação.Grupo.Publico.js';
import authMiddleware from '../meu-software-de-servidor/autenticar.js'; // Supondo que você tenha um middleware de autenticação

const router = express.Router();

// @route   POST /api/groups/public
// @desc    Criar um novo grupo público
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPublico.handle);

export default router;
