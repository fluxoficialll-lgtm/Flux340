
import { createLogger } from '../ServicosBackend/Logger.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPrivado from '../ServicosBackend/Servicos.Criacao.Grupo.Privado.js';

const logger = createLogger('PrivateGroup');

class ControleCriacaoGrupoPrivado {
    async handle(req, res) {
        const donoId = req.user.id;
        const dadosDoRequest = req.body; // { nome, descricao, limiteMembros }

        logger.info('GROUP_PRIVATE_CREATE_START', { donoId, nome: dadosDoRequest.nome });

        try {
            const dadosParaServico = {
                ...dadosDoRequest,
                donoId: donoId,
            };

            const grupoSalvo = await ServicoCriacaoGrupoPrivado.criar(dadosParaServico);

            logger.info('GROUP_PRIVATE_CREATE_SUCCESS', { groupId: grupoSalvo.id, donoId });

            return ServicoHTTPResposta.sucesso(res, grupoSalvo, 201);

        } catch (error) {
            logger.error('GROUP_PRIVATE_CREATE_ERROR', error, { donoId, data: dadosDoRequest });

            return ServicoHTTPResposta.erro(res, 'Falha ao criar grupo privado.', 400, error.message);
        }
    }
}

export default new ControleCriacaoGrupoPrivado();
