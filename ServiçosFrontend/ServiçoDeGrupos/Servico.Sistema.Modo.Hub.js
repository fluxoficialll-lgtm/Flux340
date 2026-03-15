
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Modo.Hub.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Busca o estado atual do Modo Hub para um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<object>} Uma promessa que resolve para o estado do Modo Hub. Ex: { isEnabled: true }
 */
export const getHubModeStatus = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    // Simula a chamada à API para buscar o estado do Modo Hub
    return ClienteBackend.get(`/api/groups/${groupId}/settings/hub-mode`);
};

/**
 * Define o estado do Modo Hub para um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {object} payload - O novo estado. Ex: { isEnabled: true }
 * @returns {Promise<object>} Uma promessa com a confirmação da mudança.
 */
export const setHubModeStatus = (groupId, payload) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    // Simula a chamada à API para atualizar o estado
    return ClienteBackend.put(`/api/groups/${groupId}/settings/hub-mode`, payload);
};
