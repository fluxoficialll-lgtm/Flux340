
// backend/controles/Controles.Publicacao.Comentarios.Feed.js
import ServicoComentariosFeed from '../ServicosBackend/Servicos.Publicacao.Comentarios.Feed.js';

const criarComentario = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comentario = await ServicoComentariosFeed.criarComentario(req.body, postId, req.user.id);
        res.status(201).json(comentario);
    } catch (error) {
        next(error);
    }
};

const obterComentariosPorPostId = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const comentarios = await ServicoComentariosFeed.obterComentariosPorPostId(postId, req.query);
        res.status(200).json(comentarios);
    } catch (error) {
        next(error);
    }
};

const atualizarComentario = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const comentarioAtualizado = await ServicoComentariosFeed.atualizarComentario(commentId, req.body, req.user.id);
        res.status(200).json(comentarioAtualizado);
    } catch (error) {
        next(error);
    }
};

const deletarComentario = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        await ServicoComentariosFeed.deletarComentario(commentId, req.user.id);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    criarComentario,
    obterComentariosPorPostId,
    atualizarComentario,
    deletarComentario
};
