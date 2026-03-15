
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Configuracoes.js

import ClienteBackend from '../Cliente.Backend.js';

/**
 * Serviço para gerenciar as configurações gerais, estatísticas, diretrizes e 
 * notificações de um grupo.
 */

// --- Configurações Gerais e Estatísticas ---

export const updateGroupSettings = (groupId, settings) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.put(`/api/groups/${groupId}/settings`, settings);
};

export const getGroupStats = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/stats`);
};

// --- Diretrizes do Grupo ---

export const getGuidelines = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/guidelines`);
};

export const updateGuidelines = (groupId, guidelines) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.put(`/api/groups/${groupId}/guidelines`, guidelines);
};

// --- Configurações de Notificação ---

export const getNotificationSettings = (groupId) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.get(`/api/groups/${groupId}/notification-settings`);
};

export const updateNotificationSettings = (groupId, settings) => {
    if (!groupId) return Promise.reject('ID do grupo não fornecido.');
    return ClienteBackend.put(`/api/groups/${groupId}/notification-settings`, settings);
};
