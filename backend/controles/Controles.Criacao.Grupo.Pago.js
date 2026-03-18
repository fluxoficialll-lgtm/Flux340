
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPago from '../ServicosBackend/Servicos.Criacao.Grupo.Pago.js';

class ControleCriacaoGrupoPago {
    async handle(req, res) {
        try {
            const creatorId = req.user.id;
            const dadosGrupo = req.body;

            // Validações básicas
            if (!dadosGrupo.groupName || !dadosGrupo.numericPrice) {
                return ServicoHTTPResposta.erro(res, 'Nome do grupo e preço são obrigatórios.', 400);
            }

            const grupoCriado = await ServicoCriacaoGrupoPago.criar(dadosGrupo, creatorId);
            return ServicoHTTPResposta.sucesso(res, grupoCriado, 201);

        } catch (error) {
            console.error("Erro no controlador ao criar grupo pago:", error);
            return ServicoHTTPResposta.erro(res, 'Erro interno do servidor', 500);
        }
    }
}

export default new ControleCriacaoGrupoPago();
