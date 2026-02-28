// backend/Repositorios/Repositorio.Métricas.Comentário.Marketplace.js

const queries = require('../database/GestãoDeDados/PostgreSQL/Consultas.Métricas.Comentário.Marketplace.js');

async function trackComment(commentData) {
    return queries.insertCommentMetric(commentData);
}

async function trackCommentLike(commentId) {
    return queries.insertCommentLikeMetric(commentId);
}

async function trackCommentReply(commentId, replyData) {
    return queries.insertCommentReplyMetric(commentId, replyData);
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};