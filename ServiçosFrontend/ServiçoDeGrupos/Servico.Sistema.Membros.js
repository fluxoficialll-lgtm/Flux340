
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
    // A simulação para esta rota já existe em `Simulacao.Grupo.Membros.ts`
    return ClienteBackend.get(`/api/groups/${groupId}/members`);
};

/**
 * (Futuro) Remove (expulsa) um membro de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} memberId - O ID do membro a ser expulso.
 * @returns {Promise<object>} Confirmação da ação.
 */
export const kickMember = (groupId, memberId) => {
    if (!groupId || !memberId) return Promise.reject('IDs não fornecidos.');
    console.warn(`[Refatoração] A implementação e simulação para 'kickMember' (DELETE /api/groups/${groupId}/members/${memberId}) ainda precisa ser criada.`);
    return ClienteBackend.delete(`/api/groups/${groupId}/members/${memberId}`);
};

/**
 * (Futuro) Bane um membro de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} memberId - O ID do membro a ser banido.
 * @returns {Promise<object>} Confirmação da ação.
 */
export const banMember = (groupId, memberId) => {
    if (!groupId || !memberId) return Promise.reject('IDs não fornecidos.');
    console.warn(`[Refatoração] A implementação e simulação para 'banMember' (PUT /api/groups/${groupId}/members/${memberId}/ban) ainda precisa ser criada.`);
    return ClienteBackend.put(`/api/groups/${groupId}/members/${memberId}/ban`);
};
