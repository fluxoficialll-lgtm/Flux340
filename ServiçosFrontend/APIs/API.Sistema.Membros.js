
import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Membros = {
    /**
     * Busca a lista de membros de um grupo específico.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obter(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/members`);
    },

    /**
     * Adverte um usuário em um grupo, incluindo um motivo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idUsuario - O ID do usuário a ser advertido.
     * @param {object} payload - O corpo da requisição, contendo o motivo da advertência.
     * @returns {Promise<AxiosResponse<any>>}
     */
    advertir(idGrupo, idUsuario, payload) {
        return ClienteBackend.post(`/groups/${idGrupo}/members/${idUsuario}/warn`, payload);
    },

    /**
     * Bane um membro de um grupo, incluindo um motivo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idUsuario - O ID do usuário a ser banido.
     * @param {object} payload - O corpo da requisição, contendo o motivo do banimento.
     * @returns {Promise<AxiosResponse<any>>}
     */
    banir(idGrupo, idUsuario, payload) {
        return ClienteBackend.post(`/groups/${idGrupo}/members/${idUsuario}/ban`, payload);
    },

    /**
     * Remove (expulsa) um membro de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idMembro - O ID do membro a ser expulso.
     * @returns {Promise<AxiosResponse<any>>}
     */
    expulsar(idGrupo, idMembro) {
        return ClienteBackend.delete(`/groups/${idGrupo}/members/${idMembro}`);
    },
};

export default API_Sistema_Membros;
