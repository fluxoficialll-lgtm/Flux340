
// backend/RotasBackend/Rotas.Criacao.Perfil.Flux.js
import express from 'express';
import ControlesCriacaoPerfilFlux from '../controles/Controles.Criacao.Perfil.Flux.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// As rotas agora usam os nomes de função exportados corretamente do controlador.

// @route   GET /api/profiles/me
// @desc    Buscar o perfil do usuário autenticado
// @access  Private
router.get('/me', authMiddleware, ControlesCriacaoPerfilFlux.buscarPerfil);

// @route   PUT /api/profiles/me
// @desc    Atualizar (ou criar) o perfil do usuário autenticado
// @access  Private
router.put('/me', authMiddleware, ControlesCriacaoPerfilFlux.atualizarPerfil);

// @route   DELETE /api/profiles/me
// @desc    Deletar o perfil do usuário autenticado
// @access  Private
router.delete('/me', authMiddleware, ControlesCriacaoPerfilFlux.deletarPerfil);

// As rotas públicas, se existirem, não precisam de autenticação.
// Exemplo: buscar perfil público de outro usuário.
// router.get('/:userId', ControlesCriacaoPerfilFlux.buscarPerfilPublico);

export default router;
