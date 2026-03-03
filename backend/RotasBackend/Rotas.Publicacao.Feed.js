
import express from 'express';
import feedControle from '../controles/Controles.Publicacao.Feed.js';
import comentariosFeedControle from '../controles/Controles.Comentarios.Feed.js'; // Supondo que este controle exista
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// --- Rotas de Posts ---

// @route   POST /
// @desc    Criar um novo post no feed
// @access  Private
router.post('/', authMiddleware, feedControle.createPost);

// @route   GET /
// @desc    Obter todos os posts do feed
// @access  Public
router.get('/', feedControle.getAllPosts);

// @route   GET /:postId
// @desc    Obter um post específico do feed
// @access  Public
router.get('/:postId', feedControle.getPostById);

// @route   PUT /:postId
// @desc    Atualizar um post do feed
// @access  Private
router.put('/:postId', authMiddleware, feedControle.updatePost);

// @route   DELETE /:postId
// @desc    Deletar um post do feed
// @access  Private
router.delete('/:postId', authMiddleware, feedControle.deletePost);

// --- Rotas de Comentários Aninhados ---

// @route   POST /:postId/comments
// @desc    Adicionar um comentário a um post
// @access  Private
router.post('/:postId/comments', authMiddleware, comentariosFeedControle.createComment);

// @route   GET /:postId/comments
// @desc    Buscar todos os comentários de um post
// @access  Public
router.get('/:postId/comments', comentariosFeedControle.getCommentsByPostId);

export default router;
