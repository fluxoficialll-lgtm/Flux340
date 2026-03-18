
// Arquivo: ServiçosFrontend/APIs/API.Sistema.Grupo.Moderacao.js

import ClienteBackend from '../../Cliente.Backend.js';

const API_Sistema_Grupo_Moderacao = {
    /**
     * Busca as configurações de moderação de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterConfiguracoes(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/moderation`);
    },

    /**
     * Atualiza as configurações de moderação de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {object} configuracoes - As configurações a serem atualizadas.
     * @returns {Promise<AxiosResponse<any>>}
     */
    atualizarConfiguracoes(idGrupo, configuracoes) {
        return ClienteBackend.put(`/groups/${idGrupo}/moderation`, configuracoes);
    },
};

export default API_Sistema_Grupo_Moderacao;
