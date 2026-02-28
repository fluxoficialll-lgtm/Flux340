// backend/controles/Controles.Métricas.Comentário.Marketplace.js

const marketplaceCommentMetricsService = require('../ServicosBackend/Servicos.Métricas.Comentário.Marketplace.js');

async function trackComment(req, res) {
    try {
        const { commentData } = req.body;
        await marketplaceCommentMetricsService.trackComment(commentData);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking marketplace comment:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

async function trackCommentLike(req, res) {
    try {
        const { commentId } = req.body;
        await marketplaceCommentMetricsService.trackCommentLike(commentId);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking marketplace comment like:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

async function trackCommentReply(req, res) {
    try {
        const { commentId, replyData } = req.body;
        await marketplaceCommentMetricsService.trackCommentReply(commentId, replyData);
        res.status(200).send({ message: 'Metric tracked successfully' });
    } catch (error) {
        console.error('Error tracking marketplace comment reply:', error);
        res.status(500).send({ message: 'Error tracking metric', error: error.message });
    }
}

module.exports = {
    trackComment,
    trackCommentLike,
    trackCommentReply,
};