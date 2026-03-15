
import { apiClient } from '../Cliente.Backend.js';

/**
 * @typedef {object} KeywordFilter
 * @property {boolean} enabled
 * @property {string[]} keywords
 */

/**
 * @typedef {object} MediaControl
 * @property {boolean} allowImages
 * @property {boolean} allowVideos
 */

/**
 * @typedef {object} AntiFlood
 * @property {boolean} enabled
 * @property {number} messageLimit
 * @property {number} timeFrame // in seconds
 */

/**
 * @typedef {object} PostApproval
 * @property {boolean} enabled
 * @property {('new_members'|'all_members')} scope
 */

/**
 * @typedef {object} GroupModerationSettings
 * @property {KeywordFilter} keywordFilter
 * @property {MediaControl} mediaControl
 * @property {AntiFlood} antiFlood
 * @property {PostApproval} postApproval
 */

/**
 * Busca as configurações de moderação de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<GroupModerationSettings>}
 */
export const getModerationSettings = async (groupId) => {
  if (!groupId) throw new Error("O ID do grupo é obrigatório.");

  try {
    // Simulação de chamada de API
    // Em um cenário real: const response = await apiClient.get(`/groups/${groupId}/moderation`);
    // return response.data;

    console.log(`[MOCK API] Buscando configurações de moderação para o grupo ${groupId}`);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockSettings = {
      keywordFilter: { enabled: true, keywords: ['spam', 'promoção'] },
      mediaControl: { allowImages: true, allowVideos: false },
      antiFlood: { enabled: true, messageLimit: 5, timeFrame: 10 },
      postApproval: { enabled: false, scope: 'new_members' },
    };
    
    return mockSettings;

  } catch (error) {
    console.error("Erro ao buscar configurações de moderação:", error);
    throw error;
  }
};

/**
 * Atualiza as configurações de moderação de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {Partial<GroupModerationSettings>} settings - As configurações a serem atualizadas.
 * @returns {Promise<GroupModerationSettings>}
 */
export const updateModerationSettings = async (groupId, settings) => {
  if (!groupId) throw new Error("O ID do grupo é obrigatório.");

  try {
    // Simulação de chamada de API
    // Em um cenário real: const response = await apiClient.put(`/groups/${groupId}/moderation`, settings);
    // return response.data;

    console.log(`[MOCK API] Atualizando configurações de moderação para o grupo ${groupId}:`, settings);
    await new Promise(resolve => setTimeout(resolve, 500));

    return { ...settings }; // Retorna as configurações atualizadas

  } catch (error) {
    console.error("Erro ao atualizar configurações de moderação:", error);
    throw error;
  }
};
