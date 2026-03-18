
import { createLogger } from '../ServicosBackend/Logger.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoCriacaoGrupoPublico from '../ServicosBackend/Servicos.Criacao.Grupo.Publico.js';

const logger = createLogger('PublicGroup');

class ControleCriacaoGrupoPublico {
    async handle(req, res) {
        const donoId = req.user.id;
        const dadosDoRequest = req.body; // { nome, descricao, limiteMembros }

        logger.info('GROUP_PUBLIC_CREATE_START', { donoId, nome: dadosDoRequest.nome });

        try {
            const dadosParaServico = {
                ...dadosDoRequest,
                donoId: donoId,
            };

            const grupoSalvo = await ServicoCriacaoGrupoPublico.criar(dadosParaServico);

            logger.info('GROUP_PUBLIC_CREATE_SUCCESS', { groupId: grupoSalvo.id, donoId });

            return ServicoHTTPResposta.sucesso(res, grupoSalvo, 201);

        } catch (error) {
            logger.error('GROUP_PUBLIC_CREATE_ERROR', error, { donoId, data: dadosDoRequest });

            return ServicoHTTPResposta.erro(res, 'Falha ao criar grupo público.', 400, error.message);
        }
    }
}

export default new ControleCriacaoGrupoPublico();
