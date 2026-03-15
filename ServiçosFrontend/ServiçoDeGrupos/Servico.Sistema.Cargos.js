
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Cargos.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Serviço para gerenciar os cargos (roles) de um grupo.
 */

/**
 * Busca todos os cargos de um grupo específico.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de cargos.
 */
export const getRoles = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/roles`);
};

/**
 * Cria um novo cargo para um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {object} roleData - Os dados do novo cargo (nome, cor, etc.).
 * @returns {Promise<object>} Uma promessa que resolve para o cargo recém-criado.
 */
export const createRole = (groupId, roleData) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.post(`/api/groups/${groupId}/roles`, roleData);
};

/**
 * Atualiza um cargo existente.
 * @param {string} groupId - O ID do grupo.
 * @param {string} roleId - O ID do cargo a ser atualizado.
 * @param {object} updates - Os campos a serem atualizados.
 * @returns {Promise<object>} Uma promessa que resolve para o cargo atualizado.
 */
export const updateRole = (groupId, roleId, updates) => {
    if (!groupId || !roleId) return Promise.reject('IDs não fornecidos.');
    return ClienteBackend.put(`/api/groups/${groupId}/roles/${roleId}`, updates);
};

/**
 * Deleta um cargo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} roleId - O ID do cargo a ser deletado.
 * @returns {Promise<void>} Uma promessa que é resolvida quando o cargo é deletado.
 */
export const deleteRole = (groupId, roleId) => {
    if (!groupId || !roleId) return Promise.reject('IDs não fornecidos.');
    return ClienteBackend.delete(`/api/groups/${groupId}/roles/${roleId}`);
};

/**
 * Atribui um cargo a um membro do grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {string} memberId - O ID do membro.
 * @param {string | null} roleId - O ID do cargo a ser atribuído (ou null para remover).
 * @returns {Promise<object>} Uma promessa com a confirmação.
 */
export const assignRole = (groupId, memberId, roleId) => {
    if (!groupId || !memberId) return Promise.reject('IDs não fornecidos.');
    return ClienteBackend.post(`/api/groups/${groupId}/members/${memberId}/assign-role`, { roleId });
};
