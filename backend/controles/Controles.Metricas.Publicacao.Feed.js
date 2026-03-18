
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import { getPostMetrics as getPostMetricsService } from '../ServicosBackend/Servicos.Metricas.Publicacao.Feed.js';

export const getPostMetrics = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const metrics = await getPostMetricsService(postId);
        return ServicoHTTPResposta.sucesso(res, metrics);
    } catch (error) {
        console.error(`Error fetching post metrics for postId ${req.params.postId}:`, error);
        return ServicoHTTPResposta.erro(res, 'Failed to fetch post metrics', 500, error);
    }
};
