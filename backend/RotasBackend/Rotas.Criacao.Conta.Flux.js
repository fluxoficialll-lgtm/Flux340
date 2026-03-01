
import express from 'express';
import controleCriacaoConta from '../controles/Controles.Criacao.Conta.Flux.js';

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

export default router;
