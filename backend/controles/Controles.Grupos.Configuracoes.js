
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import { createLogger } from '../ServicosBackend/Logger.js';
import ServicoGruposConfig from '../ServicosBackend/Servico.Grupos.Configuracoes.js';

const logger = createLogger('Controles.Grupos.Configuracoes');

class GruposConfiguracoesControle {

    async atualizarConfiguracoes(req, res) {
        const { groupId } = req.params;
        const configuracoes = req.body;

        try {
            logger.info(`Atualizando configurações para o grupo ${groupId}`, { configuracoes });
            const resultado = await ServicoGruposConfig.atualizarConfiguracoes(groupId, configuracoes);
            return ServicoHTTPResposta.sucesso(res, resultado);
        } catch (error) {
            logger.error('GROUP_SETTINGS_UPDATE_ERROR', error, { groupId });
            return ServicoHTTPResposta.erro(res, 'Falha ao atualizar configurações do grupo.', 500, error.message);
        }
    }

    async obterConfiguracoes(req, res) {
        const { groupId } = req.params;
        try {
            logger.info(`Obtendo configurações para o grupo ${groupId}`);
            const resultado = await ServicoGruposConfig.obterConfiguracoes(groupId);
            if(!resultado) {
                return ServicoHTTPResposta.naoEncontrado(res, "Configurações do grupo não encontradas");
            }
            return ServicoHTTPResposta.sucesso(res, resultado);
        } catch (error) {
            logger.error('GROUP_SETTINGS_GET_ERROR', error, { groupId });
            return ServicoHTTPResposta.erro(res, 'Falha ao obter configurações do grupo.', 500, error.message);
        }
    }
    
    // ... (outros métodos permanecem, mas precisarão ser implementados no serviço)

}

export default new GruposConfiguracoesControle();
