import { getPostMetrics as getPostMetricsService } from '../ServicosBackend/Servicos.Metricas.Publicacao.Feed.js';

export const getPostMetrics = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const metrics = await getPostMetricsService(postId);
        res.status(200).json(metrics);
    } catch (error) {
        next(error);
    }
};
