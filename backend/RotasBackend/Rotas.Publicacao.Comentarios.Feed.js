
// backend/RotasBackend/Rotas.Publicacao.Comentarios.Feed.js
import express from 'express';
// Importa o novo controlador que segue a arquitetura correta
import comentariosController from '../controles/Controles.Publicacao.Comentarios.Feed.js';
// Middleware para proteger rotas (exemplo)
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

// @route   POST /api/posts/:postId/comments
// @desc    Criar um novo comentário em um post do feed
// @access  Private
router.post('/', protect, comentariosController.createComment);

// @route   GET /api/posts/:postId/comments
// @desc    Obter todos os comentários de um post do feed
// @access  Public
router.get('/', comentariosController.getCommentsForPost);

// @route   PUT /api/posts/:postId/comments/:commentId
// @desc    Atualizar um comentário específico
// @access  Private
router.put('/:commentId', protect, comentariosController.updateComment);

// @route   DELETE /api/posts/:postId/comments/:commentId
// @desc    Deletar um comentário específico
// @access  Private
router.delete('/:commentId', protect, comentariosController.deleteComment);

export default router;
