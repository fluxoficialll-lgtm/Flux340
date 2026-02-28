
// backend/Repositorios/Repositorio.Publicacao.Comentarios.Feed.js
import ComentariosFeedDB from '../database/GestãoDeDados/PostgreSQL/Consultas.Publicacao.Comentarios.Feed.js';

const createComment = async (commentData) => {
    return ComentariosFeedDB.create(commentData);
};

const findCommentsByPostId = async (postId, options) => {
    return ComentariosFeedDB.findByPostId(postId, options);
};

const findCommentById = async (commentId) => {
    return ComentariosFeedDB.findById(commentId);
};

const updateComment = async (commentId, updates) => {
    return ComentariosFeedDB.update(commentId, updates);
};

const deleteComment = async (commentId) => {
    return ComentariosFeedDB.remove(commentId);
};

export default {
    createComment,
    findCommentsByPostId,
    findCommentById,
    updateComment,
    deleteComment
};
