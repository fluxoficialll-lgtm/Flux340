
import express from 'express';
import reelsControle from '../controles/Controles.Publicacao.Reels.js'; // Corrigido
import rotasComentariosReels from './Rotas.Publicacao.Comentarios.Reels.js';

const router = express.Router();

// @route   POST /
// @desc    Criar um novo Reel
// @access  Private
router.post('/', reelsControle.createReel);

// @route   GET /
// @desc    Obter todos os Reels
// @access  Public
router.get('/', reelsControle.getAllReels);

// @route   GET /:reelId
// @desc    Obter um Reel específico
// @access  Public
router.get('/:reelId', reelsControle.getReelById);

// @route   PUT /:reelId
// @desc    Atualizar um Reel
// @access  Private
router.put('/:reelId', reelsControle.updateReel);

// @route   DELETE /:reelId
// @desc    Deletar um Reel
// @access  Private
router.delete('/:reelId', reelsControle.deleteReel);

// Aninhando as rotas de comentários
// /api/reels/:reelId/comments
router.use('/:reelId/comments', rotasComentariosReels);


export default router;
