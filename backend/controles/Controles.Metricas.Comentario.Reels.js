
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import * as reelsCommentMetricsService from '../ServicosBackend/Servicos.Metricas.Comentario.Reels.js';

async function trackComment(req, res) {
    try {
        const { commentData } = req.body;
        await reelsCommentMetricsService.trackComment(commentData);
        return ServicoHTTPResposta.sucesso(res, { message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking reels comment:', error);
        return ServicoHTTPResposta.erro(res, 'Error tracking metric', 500, error.message);
    }
}

async function trackCommentLike(req, res) {
    try {
        const { commentId } = req.body;
        await reelsCommentMetricsService.trackCommentLike(commentId);
        return ServicoHTTPResposta.sucesso(res, { message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking reels comment like:', error);
        return ServicoHTTPResposta.erro(res, 'Error tracking metric', 500, error.message);
    }
}

async function trackCommentReply(req, res) {
    try {
        const { commentId, replyData } = req.body;
        await reelsCommentMetricsService.trackCommentReply(commentId, replyData);
        return ServicoHTTPResposta.sucesso(res, { message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking reels comment reply:', error);
        return ServicoHTTPResposta.erro(res, 'Error tracking metric', 500, error.message);
    }
}

export {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};