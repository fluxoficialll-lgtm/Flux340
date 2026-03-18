
// Arquivo: ServiçosFrontend/APIs/API.Sistema.Modo.Hub.js

import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Modo_Hub = {
    /**
     * Busca o estado atual do Modo Hub para um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterStatusModoHub(idGrupo) {
        return ClienteBackend.get(`/api/groups/${idGrupo}/settings/hub-mode`);
    },

    /**
     * Define o estado do Modo Hub para um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {object} payload - O novo estado. Ex: { isEnabled: true }
     * @returns {Promise<AxiosResponse<any>>}
     */
    definirStatusModoHub(idGrupo, payload) {
        return ClienteBackend.put(`/api/groups/${idGrupo}/settings/hub-mode`, payload);
    },
};

export default API_Sistema_Modo_Hub;
