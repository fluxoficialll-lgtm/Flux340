// backend/ServicosBackend/Servicos.Metricas.Comentario.Marketplace.js
import * as marketplaceCommentMetricsRepository from '../Repositorios/Repositorio.Metricas.Comentario.Marketplace.js';

export async function trackComment(commentData) {
    return marketplaceCommentMetricsRepository.trackComment(commentData);
}

export async function trackCommentLike(commentId) {
   return marketplaceCommentMetricsRepository.trackCommentLike(commentId);
}

export async function trackCommentReply(commentId, replyData) {
    return marketplaceCommentMetricsRepository.trackCommentReply(commentId, replyData);
}
