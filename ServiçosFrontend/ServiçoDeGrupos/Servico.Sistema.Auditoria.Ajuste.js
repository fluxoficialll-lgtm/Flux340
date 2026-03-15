
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Auditoria.Ajuste.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Busca os logs de auditoria relacionados a ajustes e configurações do grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de logs de auditoria de ajustes.
 */
export const getSettingsAuditLogs = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/audit/settings`);
};
