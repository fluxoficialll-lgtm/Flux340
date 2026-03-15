
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Membros.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Serviço para gerenciar os membros de um grupo.
 */

/**
 * Busca a lista de membros de um grupo específico.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de membros.
 */
export const getGroupMembers = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/members`);
};

/**
 * Adverte um usuário em um grupo, incluindo um motivo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} userId - O ID do usuário a ser advertido.
 * @param {object} payload - O corpo da requisição, contendo o motivo da advertência. Ex: { reason: '...' }
 * @returns {Promise<object>} Confirmação da ação.
 */
export const warnUser = (groupId, userId, payload) => {
    if (!groupId || !userId) return Promise.reject('IDs de grupo e/ou usuário não fornecidos.');
    // O hook `useGroupMessageAuditLog` depende desta função.
    return ClienteBackend.post(`/api/groups/${groupId}/members/${userId}/warn`, payload);
};

/**
 * Bane um membro de um grupo, incluindo um motivo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} userId - O ID do usuário a ser banido.
 * @param {object} payload - O corpo da requisição, contendo o motivo do banimento. Ex: { reason: '...' }
 * @returns {Promise<object>} Confirmação da ação.
 */
export const banUser = (groupId, userId, payload) => {
    if (!groupId || !userId) return Promise.reject('IDs de grupo e/ou usuário não fornecidos.');
    // O hook `useGroupReportLog` depende desta função.
    return ClienteBackend.post(`/api/groups/${groupId}/members/${userId}/ban`, payload);
};

/**
 * Remove (expulsa) um membro de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} memberId - O ID do membro a ser expulso.
 * @returns {Promise<object>} Confirmação da ação.
 */
export const kickMember = (groupId, memberId) => {
    if (!groupId || !memberId) return Promise.reject('IDs não fornecidos.');
    // A implementação e simulação para esta função ainda precisa ser criada.
    console.warn(`[Refatoração] A implementação para 'kickMember' (DELETE /api/groups/${groupId}/members/${memberId}) ainda precisa ser criada.`);
    return ClienteBackend.delete(`/api/groups/${groupId}/members/${memberId}`);
};
