
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Pagina.Vendas.js

import { api } from '../../api';
import { checkService } from '../../utils';

/**
 * @file Serviço para o gerenciamento da página de vendas de grupos.
 */

/**
 * Busca o conteúdo da página de vendas de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Object>} Uma promessa que resolve com o conteúdo da página de vendas.
 */
export const getSalesPage = async (groupId) => {
    const endpoint = `/groups/${groupId}/sales-page`;
    const response = await api.get(endpoint);
    return checkService(response);
};

/**
 * Atualiza o conteúdo da página de vendas de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {Object} pageData - Os dados da página de vendas a serem atualizados.
 * @returns {Promise<Object>} Uma promessa que resolve com o conteúdo da página de vendas atualizado.
 */
export const updateSalesPage = async (groupId, pageData) => {
    const endpoint = `/groups/${groupId}/sales-page`;
    const response = await api.put(endpoint, pageData);
    return checkService(response);
};
