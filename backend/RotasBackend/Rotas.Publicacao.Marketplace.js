
import express from 'express';
import marketplaceControle from '../controles/Controles.Publicacao.Marketplace.js';
// O caminho da importação foi corrigido para usar o nome do arquivo existente (singular)
import comentariosMarketplaceControle from '../controles/Controle.Publicacao.Comentarios.Marketplace.js';
import authMiddleware from '../config/Middleware.Autenticacao.JWT.js';

const router = express.Router();

// --- Rotas de Itens do Marketplace ---

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

// --- Rotas de Comentários Aninhados ---

// @route   POST /:itemId/comments
// @desc    Adicionar um comentário a um item do marketplace
// @access  Private
router.post('/:itemId/comments', authMiddleware, comentariosMarketplaceControle.createCommentForItem);

// @route   GET /:itemId/comments
// @desc    Buscar todos os comentários de um item do marketplace
// @access  Public
router.get('/:itemId/comments', comentariosMarketplaceControle.getCommentsByItemId);

export default router;
