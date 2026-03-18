
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoMetricasPublicacaoReels from '../ServicosBackend/Servicos.Metricas.Publicacao.Reels.js';

class ControlesMetricasPublicacaoReels {
    async getReelMetrics(req, res, next) {
        try {
            const { reelId } = req.params;
            const metrics = await ServicoMetricasPublicacaoReels.getReelMetrics(reelId);
            return ServicoHTTPResposta.sucesso(res, metrics);
        } catch (error) {
            console.error(`Error fetching reel metrics for reelId ${req.params.reelId}:`, error);
            return ServicoHTTPResposta.erro(res, 'Failed to fetch reel metrics', 500, error);
        }
    }
}

export default new ControlesMetricasPublicacaoReels();
