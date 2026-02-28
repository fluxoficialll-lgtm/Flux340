
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

// @route   PUT /:userId
// @desc    Atualizar o perfil de um usuário
// @access  Private (somente o próprio usuário pode atualizar)
router.put('/:userId', authMiddleware, ControlesCriacaoPerfilFlux.atualizarPerfil);

// @route   DELETE /:userId
// @desc    Deletar o perfil de um usuário
// @access  Private (somente o próprio usuário pode deletar)
router.delete('/:userId', authMiddleware, ControlesCriacaoPerfilFlux.deletarPerfil);

export default router;
