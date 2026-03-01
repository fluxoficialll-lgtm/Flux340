// backend/controles/Controles.Metricas.Comentario.Feed.js

const feedCommentMetricsService = require('../ServicosBackend/Servicos.Metricas.Comentario.Feed.js');

async function trackComment(req, res) {
    try {
        const { commentData } = req.body;
        await feedCommentMetricsService.trackComment(commentData);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking feed comment:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

async function trackCommentLike(req, res) {
    try {
        const { commentId } = req.body;
        await feedCommentMetricsService.trackCommentLike(commentId);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking feed comment like:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

async function trackCommentReply(req, res) {
    try {
        const { commentId, replyData } = req.body;
        await feedCommentMetricsService.trackCommentReply(commentId, replyData);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking feed comment reply:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};