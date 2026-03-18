
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import * as feedCommentMetricsService from '../ServicosBackend/Servicos.Metricas.Comentario.Feed.js';

async function trackComment(req, res) {
    try {
        const { commentData } = req.body;
        await feedCommentMetricsService.trackComment(commentData);
        return ServicoHTTPResposta.sucesso(res, { message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking feed comment:', error);
        return ServicoHTTPResposta.erro(res, 'Error tracking metric', 500, error.message);
    }
}

async function trackCommentLike(req, res) {
    try {
        const { commentId } = req.body;
        await feedCommentMetricsService.trackCommentLike(commentId);
        return ServicoHTTPResposta.sucesso(res, { message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking feed comment like:', error);
        return ServicoHTTPResposta.erro(res, 'Error tracking metric', 500, error.message);
    }
}

async function trackCommentReply(req, res) {
    try {
        const { commentId, replyData } = req.body;
        await feedCommentMetricsService.trackCommentReply(commentId, replyData);
        return ServicoHTTPResposta.sucesso(res, { message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking feed comment reply:', error);
        return ServicoHTTPResposta.erro(res, 'Error tracking metric', 500, error.message);
    }
}

export {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};
