
// backend/RotasBackend/Rotas.Criacao.Perfil.Flux.js
import express from 'express';
import ControlesCriacaoPerfilFlux from '../controles/Controles.Criacao.Perfil.Flux.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// @route   GET /me
// @desc    Buscar o perfil do usuário autenticado
// @access  Private
router.get('/me', authMiddleware, ControlesCriacaoPerfilFlux.PossibilidadeBuscarPerfilAutenticado);

// @route   PUT /me
// @desc    Atualizar o perfil do usuário autenticado
// @access  Private
router.put('/me', authMiddleware, ControlesCriacaoPerfilFlux.PossibilidadeProcessarAtualizacaoPerfil);

// @route   DELETE /me
// @desc    Deletar o perfil do usuário autenticado
// @access  Private
router.delete('/me', authMiddleware, ControlesCriacaoPerfilFlux.PossibilidadeSolicitarExclusaoPerfil);

// @route   GET /:userId
// @desc    Buscar perfil de um usuário público
// @access  Public
router.get('/:userId', ControlesCriacaoPerfilFlux.PossibilidadeBuscarPerfilPublico);

export default router;
