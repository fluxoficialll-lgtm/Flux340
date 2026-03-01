import ServicoMetricasPublicacaoReels from '../ServicosBackend/Servicos.Metricas.Publicacao.Reels.js';

class ControlesMetricasPublicacaoReels {
    async getReelMetrics(req, res, next) {
        try {
            const { reelId } = req.params;
            const metrics = await ServicoMetricasPublicacaoReels.getReelMetrics(reelId);
            res.status(200).json(metrics);
        } catch (error) {
            next(error);
        }
    }
}

export default new ControlesMetricasPublicacaoReels();
