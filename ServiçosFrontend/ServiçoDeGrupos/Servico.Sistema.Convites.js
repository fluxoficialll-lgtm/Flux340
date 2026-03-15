
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Convites.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Serviço para gerenciar os links de convite de um grupo.
 */

/**
 * Busca todos os links de convite de um grupo específico.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de links.
 */
export const getInviteLinks = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/invites`);
};

/**
 * Cria um novo link de convite para um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {object} linkData - Os dados do novo link (nome, tipo, expiração, etc.).
 * @returns {Promise<object>} Uma promessa que resolve para o link recém-criado.
 */
export const createInviteLink = (groupId, linkData) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.post(`/api/groups/${groupId}/invites`, linkData);
};

/**
 * Revoga (desativa) um link de convite existente.
 * @param {string} groupId - O ID do grupo.
 * @param {string} linkId - O ID do link a ser revogado.
 * @returns {Promise<object>} Uma promessa com a confirmação da revogação.
 */
export const revokeInviteLink = (groupId, linkId) => {
    if (!groupId || !linkId) return Promise.reject('IDs não fornecidos.');
    return ClienteBackend.delete(`/api/groups/${groupId}/invites/${linkId}`);
};
