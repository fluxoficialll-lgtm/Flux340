// backend/controles/Controles.Metricas.Comentario.Reels.js

const reelsCommentMetricsService = require('../ServicosBackend/Servicos.Metricas.Comentario.Reels.js');

async function trackComment(req, res) {
    try {
        const { commentData } = req.body;
        await reelsCommentMetricsService.trackComment(commentData);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking reels comment:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

async function trackCommentLike(req, res) {
    try {
        const { commentId } = req.body;
        await reelsCommentMetricsService.trackCommentLike(commentId);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking reels comment like:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

async function trackCommentReply(req, res) {
    try {
        const { commentId, replyData } = req.body;
        await reelsCommentMetricsService.trackCommentReply(commentId, replyData);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking reels comment reply:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};