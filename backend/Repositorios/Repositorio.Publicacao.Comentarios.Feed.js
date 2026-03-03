
// backend/Repositorios/Repositorio.Publicacao.Comentarios.Feed.js
import ComentariosFeedDB from '../database/GestaoDeDados/PostgreSQL/Consultas.Publicacao.Comentarios.Feed.js';

const criarComentario = async (commentData) => {
    return ComentariosFeedDB.criar(commentData);
};

const buscarComentariosPorPostId = async (postId, options) => {
    return ComentariosFeedDB.buscarPorPostId(postId, options);
};

const buscarComentarioPorId = async (commentId) => {
    return ComentariosFeedDB.buscarPorId(commentId);
};

const atualizarComentario = async (commentId, updates) => {
    return ComentariosFeedDB.atualizar(commentId, updates);
};

const deletarComentario = async (commentId) => {
    return ComentariosFeedDB.remover(commentId);
};

export default {
    criarComentario,
    buscarComentariosPorPostId,
    buscarComentarioPorId,
    atualizarComentario,
    deletarComentario
};
