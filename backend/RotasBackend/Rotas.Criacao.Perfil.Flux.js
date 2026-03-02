
// backend/RotasBackend/Rotas.Criação.Perfil.Flux.js
import express from 'express';
import ControlesCriacaoPerfilFlux from '../controles/Controles.Criacao.Perfil.Flux.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// @route   GET /:userId
// @desc    Buscar perfil de um usuário
// @access  Public
router.get('/:userId', ControlesCriacaoPerfilFlux.buscarPerfil);

// @route   PUT /
// @desc    Atualizar o perfil do usuário autenticado
// @access  Private
router.put('/', authMiddleware, ControlesCriacaoPerfilFlux.atualizarPerfil);

// @route   DELETE /
// @desc    Deletar o perfil do usuário autenticado
// @access  Private
router.delete('/', authMiddleware, ControlesCriacaoPerfilFlux.deletarPerfil);

export default router;
