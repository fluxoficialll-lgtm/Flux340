
import express from 'express';
import comentariosController from '../controles/Controles.Publicacao.Comentarios.Feed.js';
import authMiddleware from '../../config/Middleware.Autenticacao.JWT.js';

const router = express.Router({ mergeParams: true });

// @route   POST /api/posts/:postId/comments
// @desc    Criar um novo comentário em um post do feed
// @access  Private
router.post('/', authMiddleware, comentariosController.createComment);

// @route   GET /api/posts/:postId/comments
// @desc    Obter todos os comentários de um post do feed
// @access  Public
router.get('/', comentariosController.getCommentsForPost);

// @route   PUT /api/posts/:postId/comments/:commentId
// @desc    Atualizar um comentário específico
// @access  Private
router.put('/:commentId', authMiddleware, comentariosController.updateComment);

// @route   DELETE /api/posts/:postId/comments/:commentId
// @desc    Deletar um comentário específico
// @access  Private
router.delete('/:commentId', authMiddleware, comentariosController.deleteComment);

export default router;
