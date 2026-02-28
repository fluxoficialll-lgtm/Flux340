
// backend/RotasBackend/Rotas.Criação.Perfil.Flux.js

import express from 'express';
import ControlesCriacaoPerfilFlux from '../controles/Controles.Criação.Perfil.Flux.js';
import middlewareAutenticacao from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

/**
 * Rota para buscar o perfil de um usuário.
 * A autenticação é necessária para garantir que apenas usuários logados possam ver perfis.
 * O ID do usuário é passado como parâmetro na URL.
 */
router.get('/:userId', middlewareAutenticacao, ControlesCriacaoPerfilFlux.buscarPerfil);

/**
 * Rota para atualizar o perfil do usuário logado.
 * O middleware de autenticação garante que o usuário só possa atualizar o próprio perfil.
 * Os dados para atualização são enviados no corpo da requisição.
 */
router.put('/:userId', middlewareAutenticacao, ControlesCriacaoPerfilFlux.atualizarPerfil);

/**
 * Rota para deletar o perfil do usuário logado.
 * Ação destrutiva que requer autenticação.
 */
router.delete('/:userId', middlewareAutenticacao, ControlesCriacaoPerfilFlux.deletarPerfil);

export default router;
