
import express from 'express';
import ControleCriacaoGrupoPublico from '../controles/Controles.Criação.Grupo.Publico.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// @route   POST /api/groups/public
// @desc    Criar um novo grupo público
// @access  Private
router.post('/', authMiddleware, ControleCriacaoGrupoPublico.handle);

export default router;
