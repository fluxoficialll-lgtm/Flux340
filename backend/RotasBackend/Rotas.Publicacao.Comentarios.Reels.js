
import express from 'express';
import comentariosReelsControle from '../controles/Controles.Publicacao.Comentarios.Reels.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js'; // Caminho corrigido

const router = express.Router();

// @route   PUT /:commentId
// @desc    Atualizar um comentário em um Reel
// @access  Private
router.put('/:commentId', authMiddleware, comentariosReelsControle.updateComment);

// @route   DELETE /:commentId
// @desc    Deletar um comentário em um Reel
// @access  Private
router.delete('/:commentId', authMiddleware, comentariosReelsControle.deleteComment);

export default router;
