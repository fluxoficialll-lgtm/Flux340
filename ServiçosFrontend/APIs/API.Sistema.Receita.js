
// Arquivo: ServiçosFrontend/APIs/API.Sistema.Receita.js

import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Receita = {
    /**
     * Busca os dados de faturamento detalhado de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterReceita(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/revenue`);
    },
};

export default API_Sistema_Receita;
