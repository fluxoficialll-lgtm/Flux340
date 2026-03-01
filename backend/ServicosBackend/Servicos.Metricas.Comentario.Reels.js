// backend/ServicosBackend/Servicos.Métricas.Comentário.Reels.js

const reelsCommentMetricsRepository = require('../Repositorios/Repositorio.Métricas.Comentário.Reels.js');

async function trackComment(commentData) {
    return reelsCommentMetricsRepository.trackComment(commentData);
}

async function trackCommentLike(commentId) {
    return reelsCommentMetricsRepository.trackCommentLike(commentId);
}

async function trackCommentReply(commentId, replyData) {
    return reelsCommentMetricsRepository.trackCommentReply(commentId, replyData);
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};