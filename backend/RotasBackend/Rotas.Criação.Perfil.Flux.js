
// backend/RotasBackend/Rotas.Criação.Perfil.Flux.js
import express from 'express';
import ControlesCriacaoPerfilFlux from '../controles/Controles.Criação.Perfil.Flux.js';
// Corrigindo a importação do middleware de autenticação
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// @route   GET /:userId
// @desc    Buscar perfil de um usuário
// @access  Public
router.get('/:userId', ControlesCriacaoPerfilFlux.buscarPerfil);

// @route   PUT /me
// @desc    Atualizar o perfil do usuário autenticado
// @access  Private
router.put('/me', authMiddleware, ControlesCriacaoPerfilFlux.atualizarPerfil);

// @route   DELETE /me
// @desc    Deletar o perfil do usuário autenticado
// @access  Private
router.delete('/me', authMiddleware, ControlesCriacaoPerfilFlux.deletarPerfil);

export default router;
