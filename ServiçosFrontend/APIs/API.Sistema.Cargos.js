
import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Cargos = {
    /**
     * Busca os cargos de um grupo específico.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obter(idGrupo) {
        // O endpoint correto não deve ter /api, o ClienteBackend já resolve isso.
        return ClienteBackend.get(`/groups/${idGrupo}/roles`);
    },

    /**
     * Adiciona um novo cargo a um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {object} dadosCargo - Os dados do novo cargo (nome, permissões, etc.).
     * @returns {Promise<AxiosResponse<any>>}
     */
    adicionar(idGrupo, dadosCargo) {
        return ClienteBackend.post(`/groups/${idGrupo}/roles`, dadosCargo);
    },

    /**
     * Atualiza um cargo existente em um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idCargo - O ID do cargo a ser atualizado.
     * @param {object} atualizacoesCargo - As atualizações a serem aplicadas.
     * @returns {Promise<AxiosResponse<any>>}
     */
    atualizar(idGrupo, idCargo, atualizacoesCargo) {
        return ClienteBackend.put(`/groups/${idGrupo}/roles/${idCargo}`, atualizacoesCargo);
    },

    /**
     * Remove um cargo de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idCargo - O ID do cargo a ser removido.
     * @returns {Promise<AxiosResponse<any>>}
     */
    remover(idGrupo, idCargo) {
        return ClienteBackend.delete(`/groups/${idGrupo}/roles/${idCargo}`);
    },

    /**
     * Atribui um cargo a um membro do grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idMembro - O ID do membro.
     * @param {string | null} idCargo - O ID do cargo a ser atribuído (ou null para remover).
     * @returns {Promise<AxiosResponse<any>>}
     */
    atribuir(idGrupo, idMembro, idCargo) {
        return ClienteBackend.post(`/groups/${idGrupo}/members/${idMembro}/assign-role`, { roleId: idCargo });
    },
};

export default API_Sistema_Cargos;
