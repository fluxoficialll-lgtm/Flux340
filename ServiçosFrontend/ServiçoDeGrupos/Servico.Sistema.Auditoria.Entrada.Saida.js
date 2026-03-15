
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Auditoria.Entrada.Saida.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Busca os logs de auditoria de entrada e saída de membros no grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de logs de entrada e saída.
 */
export const getEntryExitLogs = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/audit/entry-exit`);
};
