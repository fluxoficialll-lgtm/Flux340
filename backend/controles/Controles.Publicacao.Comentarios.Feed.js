
// backend/controles/Controles.Publicacao.Comentarios.Feed.js
import ServicoComentariosFeed from '../ServicosBackend/Servicos.Publicacao.Comentarios.Feed.js';

const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        // Supondo que a autenticação middleware adiciona o usuário ao req (req.user)
        const comment = await ServicoComentariosFeed.createComment(req.body, postId, req.user.id);
        res.status(201).json(comment);
    } catch (error) {
        next(error);
    }
};

const getCommentsForPost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comments = await ServicoComentariosFeed.getCommentsForPost(postId, req.query);
        res.status(200).json(comments);
    } catch (error) {
        next(error);
    }
};

const updateComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const updatedComment = await ServicoComentariosFeed.updateComment(commentId, req.body, req.user.id);
        res.status(200).json(updatedComment);
    } catch (error) {
        next(error);
    }
};

const deleteComment = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        await ServicoComentariosFeed.deleteComment(commentId, req.user.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    createComment,
    getCommentsForPost,
    updateComment,
    deleteComment
};
