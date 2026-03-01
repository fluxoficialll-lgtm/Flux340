
import express from 'express';
import marketplaceControle from '../controles/Controles.Publicacao.Marketplace.js';
import rotasComentariosMarketplace from './Rotas.Comentarios.Marketplace.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// @route   POST /
// @desc    Criar um novo item no marketplace
// @access  Private
router.post('/', authMiddleware, marketplaceControle.createItem);

// @route   GET /
// @desc    Obter todos os itens do marketplace
// @access  Public
router.get('/', marketplaceControle.getAllItems);

// @route   GET /:itemId
// @desc    Obter um item específico do marketplace
// @access  Public
router.get('/:itemId', marketplaceControle.getItemById);

// @route   PUT /:itemId
// @desc    Atualizar um item do marketplace
// @access  Private
router.put('/:itemId', authMiddleware, marketplaceControle.updateItem);

// @route   DELETE /:itemId
// @desc    Deletar um item do marketplace
// @access  Private
router.delete('/:itemId', authMiddleware, marketplaceControle.deleteItem);

// Aninhando as rotas de comentários
// /api/marketplace/:itemId/comments
router.use('/:itemId/comments', rotasComentariosMarketplace);

export default router;
