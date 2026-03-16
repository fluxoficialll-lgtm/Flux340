
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Receita.js

import { api } from '../../api';
import { checkService } from '../../utils';

/**
 * @file Serviço para o gerenciamento da receita de grupos.
 */

/**
 * Busca os dados de faturamento detalhado de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Object>} Uma promessa que resolve com os dados de faturamento.
 */
export const getGroupRevenue = async (groupId) => {
    const endpoint = `/groups/${groupId}/revenue`;
    const response = await api.get(endpoint);
    return checkService(response);
};
