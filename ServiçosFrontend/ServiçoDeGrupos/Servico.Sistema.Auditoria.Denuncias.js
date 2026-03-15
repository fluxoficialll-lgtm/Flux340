
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Auditoria.Denuncias.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Serviço para gerenciar denúncias dentro de um grupo.
 */

/**
 * Busca todas as denúncias de um grupo específico.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de denúncias.
 */
export const getReports = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/reports`);
};

/**
 * Rejeita (ignora) uma denúncia específica.
 * @param {string} groupId - O ID do grupo.
 * @param {string} reportId - O ID da denúncia a ser rejeitada.
 * @returns {Promise<object>} Uma promessa com a confirmação da rejeição.
 */
export const dismissReport = (groupId, reportId) => {
    if (!groupId || !reportId) return Promise.reject('IDs não fornecidos.');
    return ClienteBackend.delete(`/api/groups/${groupId}/reports/${reportId}`);
};
