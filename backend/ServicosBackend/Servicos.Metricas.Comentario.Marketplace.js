// backend/ServicosBackend/Servicos.Métricas.Comentário.Marketplace.js

const marketplaceCommentMetricsRepository = require('../Repositorios/Repositorio.Métricas.Comentário.Marketplace.js');

async function trackComment(commentData) {
    return marketplaceCommentMetricsRepository.trackComment(commentData);
}

async function trackCommentLike(commentId) {
    return marketplaceCommentMetricsRepository.trackCommentLike(commentId);
}

async function trackCommentReply(commentId, replyData) {
    return marketplaceCommentMetricsRepository.trackCommentReply(commentId, replyData);
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};