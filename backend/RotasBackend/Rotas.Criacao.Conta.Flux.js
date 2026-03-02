
import express from 'express';
import controleCriacaoConta from '../controles/Controles.Criacao.Conta.Flux.js';
import ControlesCriacaoPerfilFlux from '../controles/Controles.Criacao.Perfil.Flux.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// Rota para registrar um novo usuário
// O frontend vai chamar: POST /api/auth/register
router.post('/register', controleCriacaoConta.registerUser);

// Rota para login de usuário
// O frontend vai chamar: POST /api/auth/login
router.post('/login', controleCriacaoConta.loginUser);

// Rota para autenticação com Google
// O frontend vai chamar: POST /api/auth/google
router.post('/google', controleCriacaoConta.googleAuth);

// @route   PUT /me
// @desc    Atualizar o perfil do usuário autenticado
// @access  Private
router.put('/me', authMiddleware, ControlesCriacaoPerfilFlux.atualizarPerfil);


export default router;
