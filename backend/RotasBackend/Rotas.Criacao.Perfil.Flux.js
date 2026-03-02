
// backend/RotasBackend/Rotas.Criação.Perfil.Flux.js
import express from 'express';
import ControlesCriacaoPerfilFlux from '../controles/Controles.Criacao.Perfil.Flux.js';

const router = express.Router();

// @route   GET /:userId
// @desc    Buscar perfil de um usuário
// @access  Public
router.get('/:userId', ControlesCriacaoPerfilFlux.buscarPerfil);

export default router;
