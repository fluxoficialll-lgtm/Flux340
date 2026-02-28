// backend/ServicosBackend/Servicos.Métricas.Comentário.Feed.js

const feedCommentMetricsRepository = require('../Repositorios/Repositorio.Métricas.Comentário.Feed.js');

async function trackComment(commentData) {
    return feedCommentMetricsRepository.trackComment(commentData);
}

async function trackCommentLike(commentId) {
    return feedCommentMetricsRepository.trackCommentLike(commentId);
}

async function trackCommentReply(commentId, replyData) {
    return feedCommentMetricsRepository.trackCommentReply(commentId, replyData);
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};