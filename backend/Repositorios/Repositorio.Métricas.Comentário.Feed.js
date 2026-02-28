// backend/Repositorios/Repositorio.Métricas.Comentário.Feed.js

const queries = require('../database/GestãoDeDados/PostgreSQL/Consultas.Métricas.Comentário.Feed.js');

async function trackComment(commentData) {
    // Em um cenário real, aqui você chamaria a consulta para inserir no banco de dados
    console.log('Repositório: Rastreando comentário do feed:', commentData);
    return queries.insertCommentMetric(commentData);
}

async function trackCommentLike(commentId) {
    console.log('Repositório: Rastreando like em comentário do feed:', commentId);
    return queries.insertCommentLikeMetric(commentId);
}

async function trackCommentReply(commentId, replyData) {
    console.log('Repositório: Rastreando resposta em comentário do feed:', commentId, replyData);
    return queries.insertCommentReplyMetric(commentId, replyData);
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};