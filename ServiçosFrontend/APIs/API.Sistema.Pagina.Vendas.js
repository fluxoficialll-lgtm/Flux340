
// Arquivo: ServiçosFrontend/APIs/API.Sistema.Pagina.Vendas.js

import ClienteBackend from '../Cliente.Backend.js';

const API_Sistema_Pagina_Vendas = {
    /**
     * Busca o conteúdo da página de vendas de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterPaginaVendas(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/sales-page`);
    },

    /**
     * Atualiza o conteúdo da página de vendas de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @param {Object} dadosPagina - Os dados da página de vendas a serem atualizados.
     * @returns {Promise<AxiosResponse<any>>}
     */
    atualizarPaginaVendas(idGrupo, dadosPagina) {
        return ClienteBackend.put(`/groups/${idGrupo}/sales-page`, dadosPagina);
    },
};

export default API_Sistema_Pagina_Vendas;
