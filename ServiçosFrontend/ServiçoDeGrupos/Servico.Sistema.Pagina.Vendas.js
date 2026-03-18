
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Pagina.Vendas.js

import API_Sistema_Pagina_Vendas from '../APIs/APIsServicoGrupos/API.Sistema.Pagina.Vendas.js';

const contextoBase = "Servico.Sistema.Pagina.Vendas";

/**
 * Busca o conteúdo da página de vendas de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Object>} Uma promessa que resolve com o conteúdo da página de vendas.
 */
export const getSalesPage = async (groupId) => {
    const contexto = `${contextoBase}.getSalesPage`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Pagina_Vendas.obterPaginaVendas(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Atualiza o conteúdo da página de vendas de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {Object} pageData - Os dados da página de vendas a serem atualizados.
 * @returns {Promise<Object>} Uma promessa que resolve com o conteúdo da página de vendas atualizado.
 */
export const updateSalesPage = async (groupId, pageData) => {
    const contexto = `${contextoBase}.updateSalesPage`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Pagina_Vendas.atualizarPaginaVendas(groupId, pageData);
        return data;
    } catch (error) {
        throw error;
    }
};
