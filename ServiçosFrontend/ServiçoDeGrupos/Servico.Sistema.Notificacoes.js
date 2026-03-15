
import ClienteBackend from '../Cliente.Backend.js';

/**
 * @typedef {'all' | 'admins_only' | 'off'} MentionNotificationSetting
 */

/**
 * @typedef {object} GroupNotificationSettings
 * @property {boolean} notifyOnNewMember
 * @property {MentionNotificationSetting} notifyOnMention
 * @property {boolean} notifyOnNewPost
 * @property {boolean} disableAll - Uma chave geral para desligar tudo
 */

/**
 * Busca as configurações de notificação de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<GroupNotificationSettings>}
 */
export const getNotificationSettings = async (groupId) => {
  if (!groupId) throw new Error("O ID do grupo é obrigatório.");

  try {
    // Simulação de chamada de API
    // Em um cenário real: const response = await ClienteBackend.get(`/groups/${groupId}/notifications`);
    // return response.data;

    console.log(`[MOCK API] Buscando configurações de notificação para o grupo ${groupId}`);
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockSettings = {
      notifyOnNewMember: true,
      notifyOnMention: 'all',
      notifyOnNewPost: true,
      disableAll: false,
    };
    
    return mockSettings;

  } catch (error) {
    console.error("Erro ao buscar configurações de notificação:", error);
    throw error;
  }
};

/**
 * Atualiza as configurações de notificação de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {Partial<GroupNotificationSettings>} settings - As configurações a serem atualizadas.
 * @returns {Promise<GroupNotificationSettings>}
 */
export const updateNotificationSettings = async (groupId, settings) => {
  if (!groupId) throw new Error("O ID do grupo é obrigatório.");

  try {
    // Simulação de chamada de API
    // Em um cenário real: const response = await ClienteBackend.put(`/groups/${groupId}/notifications`, settings);
    // return response.data;

    console.log(`[MOCK API] Atualizando configurações de notificação para o grupo ${groupId}:`, settings);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Retorna as configurações atualizadas para o frontend ter certeza da mudança
    return { ...settings };

  } catch (error) {
    console.error("Erro ao atualizar configurações de notificação:", error);
    throw error;
  }
};
