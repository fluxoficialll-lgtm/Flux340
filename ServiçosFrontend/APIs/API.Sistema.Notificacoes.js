
// Arquivo: ServiçosFrontend/APIs/API.Sistema.Notificacoes.js

import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Notificacoes = {
    /**
     * Busca as configurações de notificação de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterConfiguracoes(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/notifications`);
    },

    /**
     * Atualiza as configurações de notificação de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {object} configuracoes - As configurações a serem atualizadas.
     * @returns {Promise<AxiosResponse<any>>}
     */
    atualizarConfiguracoes(idGrupo, configuracoes) {
        return ClienteBackend.put(`/groups/${idGrupo}/notifications`, configuracoes);
    },
};

export default API_Sistema_Notificacoes;
