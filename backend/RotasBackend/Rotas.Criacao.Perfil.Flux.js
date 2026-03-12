
import express from 'express';
import controle from '../../controles/Controles.Criacao.Perfil.Flux.js';
import { verificarToken } from '../../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

router.get('/', verificarToken, controle.buscarPerfil);
router.put('/', verificarToken, controle.atualizarPerfil);
router.delete('/', verificarToken, controle.deletarPerfil);
router.get('/:userId', controle.buscarPerfilPublico);

export default router;
