
import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Auditoria_Ajuste = {
    /**
     * Busca os logs de auditoria relacionados a ajustes e configurações do grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterLogs(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/audit/settings`);
    },
};

export default API_Sistema_Auditoria_Ajuste;
