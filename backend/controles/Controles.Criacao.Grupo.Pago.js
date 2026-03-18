
import { createLogger } from '../ServicosBackend/Logger.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPago from '../ServicosBackend/Servicos.Criacao.Grupo.Pago.js';

const logger = createLogger('PaidGroup');

class ControleCriacaoGrupoPago {
    async handle(req, res) {
        const donoId = req.user.id;
        const dadosDoRequest = req.body; // { nome, descricao, limiteMembros, preco }

        logger.info('GROUP_PAID_CREATE_START', { donoId, nome: dadosDoRequest.nome });

        try {
            const dadosParaServico = {
                ...dadosDoRequest,
                donoId: donoId,
            };

            const grupoSalvo = await ServicoCriacaoGrupoPago.criar(dadosParaServico);

            logger.info('GROUP_PAID_CREATE_SUCCESS', { groupId: grupoSalvo.id, donoId });

            return ServicoHTTPResposta.sucesso(res, grupoSalvo, 201);

        } catch (error) {
            logger.error('GROUP_PAID_CREATE_ERROR', error, { donoId, data: dadosDoRequest });

            return ServicoHTTPResposta.erro(res, 'Falha ao criar grupo pago.', 400, error.message);
        }
    }
}

export default new ControleCriacaoGrupoPago();
