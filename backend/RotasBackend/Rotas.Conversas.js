
import express from 'express';
import { verificarToken } from '../../config/Middleware.Autenticacao.JWT.js';
import controleConversas from '../../controles/Controle.Conversas.js';

const router = express.Router();

// Rota para obter todas as conversas do usuário autenticado
router.get('/', verificarToken, controleConversas.obterConversas);

export default router;
