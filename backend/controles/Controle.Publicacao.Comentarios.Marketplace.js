
import { RepositorioComentariosMarketplace } from '../Repositorios/Repositorio.Publicacao.Comentarios.Marketplace.js';

// @desc    Criar um novo comentário em um item do marketplace
const createComment = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id; // Supondo que req.user é populado pelo middleware de autenticação
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'O conteúdo do comentário é obrigatório.' });
        }

        const newComment = await RepositorioComentariosMarketplace.createComment(itemId, userId, content);
        res.status(201).json(newComment);
    } catch (error) {
        console.error('Erro ao criar comentário no marketplace:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

// @desc    Obter todos os comentários de um item do marketplace
const getCommentsForItem = async (req, res) => {
    try {
        const { itemId } = req.params;
        const comments = await RepositorioComentariosMarketplace.getCommentsByItemId(itemId);
        res.status(200).json(comments);
    } catch (error) {
        console.error('Erro ao buscar comentários do marketplace:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

// @desc    Atualizar um comentário
const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'O conteúdo do comentário é obrigatório para atualização.' });
        }

        const comment = await RepositorioComentariosMarketplace.findCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado.' });
        }

        if (comment.user_id !== userId) {
            return res.status(403).json({ message: 'Acesso negado. Você só pode editar seus próprios comentários.' });
        }

        const updatedComment = await RepositorioComentariosMarketplace.updateComment(commentId, userId, content);
        res.status(200).json(updatedComment);
    } catch (error) {
        console.error('Erro ao atualizar comentário no marketplace:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

// @desc    Deletar um comentário
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        const comment = await RepositorioComentariosMarketplace.findCommentById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Comentário não encontrado.' });
        }

        if (comment.user_id !== userId) {
            return res.status(403).json({ message: 'Acesso negado. Você só pode deletar seus próprios comentários.' });
        }

        await RepositorioComentariosMarketplace.deleteComment(commentId, userId);
        res.status(204).send(); // HTTP 204 No Content
    } catch (error) {
        console.error('Erro ao deletar comentário no marketplace:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};

export default {
    createComment,
    getCommentsForItem,
    updateComment,
    deleteComment
};
