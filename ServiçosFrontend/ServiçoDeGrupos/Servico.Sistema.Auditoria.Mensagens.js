
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Auditoria.Mensagens.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Serviço para gerenciar e auditar mensagens de um grupo.
 */

/**
 * Busca os logs de auditoria de mensagens, com um filtro opcional por usuário.
 * @param {string} groupId - O ID do grupo.
 * @param {object} [filter] - Filtros para a busca. Ex: { userId: '...' }
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de logs de mensagens.
 */
export const getMessageAuditLogs = (groupId, filter) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    
    let url = `/api/groups/${groupId}/audit/messages`;
    if (filter && filter.userId) {
        url += `?userId=${filter.userId}`;
    }
    
    return ClienteBackend.get(url);
};

/**
 * Apaga uma mensagem específica dentro de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} messageId - O ID da mensagem a ser apagada.
 * @returns {Promise<object>} Uma promessa com a confirmação da exclusão.
 */
export const deleteGroupMessage = (groupId, messageId) => {
    if (!groupId || !messageId) return Promise.reject('IDs não fornecidos.');
    return ClienteBackend.delete(`/api/groups/${groupId}/messages/${messageId}`);
};
