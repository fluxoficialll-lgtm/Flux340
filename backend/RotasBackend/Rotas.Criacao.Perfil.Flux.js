
import express from 'express';
import controle from '../controles/Controles.Criacao.Perfil.Flux.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

router.get('/', authMiddleware, controle.buscarPerfil);
router.put('/', authMiddleware, controle.atualizarPerfil);
router.delete('/', authMiddleware, controle.deletarPerfil);
router.get('/:userId', controle.buscarPerfilPublico);

export default router;
