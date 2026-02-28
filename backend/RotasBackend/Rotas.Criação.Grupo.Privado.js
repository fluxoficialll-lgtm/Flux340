
import express from 'express';
import ControleCriacaoGrupoPrivado from '../controles/Controles.Criação.Grupo.Privado.js';
import authMiddleware from '../meu-software-de-servidor/autenticar.js';

const router = express.Router();

// @route   POST /api/groups/private
// @desc    Criar um novo grupo privado
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPrivado.handle);

export default router;
