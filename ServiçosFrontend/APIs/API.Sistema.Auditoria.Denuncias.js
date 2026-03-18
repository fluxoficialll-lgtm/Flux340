
import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Auditoria_Denuncias = {
    /**
     * Busca todas as denúncias de um grupo específico.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterDenuncias(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/reports`);
    },

    /**
     * Rejeita (ignora) uma denúncia específica.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idDenuncia - O ID da denúncia a ser rejeitada.
     * @returns {Promise<AxiosResponse<any>>}
     */
    rejeitarDenuncia(idGrupo, idDenuncia) {
        return ClienteBackend.delete(`/groups/${idGrupo}/reports/${idDenuncia}`);
    },
};

export default API_Sistema_Auditoria_Denuncias;
