
import ClienteBackend from '../../Cliente.Backend.js';

const API_Sistema_Auditoria_Entrada_Saida = {
    /**
     * Busca os logs de auditoria de entrada e saída de membros no grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterLogs(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/audit/entry-exit`);
    },
};

export default API_Sistema_Auditoria_Entrada_Saida;
