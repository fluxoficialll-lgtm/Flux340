
import { apiClient } from '../Cliente.Backend.js';

/**
 * @typedef {object} SlowModeSettings
 * @property {boolean} enabled
 * @property {number} interval - Em segundos
 */

/**
 * @typedef {object} GroupGuidelinesData
 * @property {string} guidelines
 * @property {SlowModeSettings} slowMode
 * @property {SlowModeSettings} slowModeEntry
 */

/**
 * Atualiza as diretrizes e controles de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {GroupGuidelinesData} data - As configurações a serem salvas.
 * @returns {Promise<any>}
 */
export const updateGroupGuidelines = async (groupId, data) => {
  if (!groupId) {
    throw new Error("O ID do grupo é obrigatório para atualizar as diretrizes.");
  }

  try {
    // Simulação de uma chamada de API para o backend
    // Em um cenário real, a chamada seria: 
    // const response = await apiClient.put(`/groups/${groupId}/guidelines`, data);
    // return response.data;

    console.log(`[MOCK API] Atualizando diretrizes para o grupo ${groupId}:`, data);
    // Simula um atraso de rede
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Retorna os dados enviados como confirmação
    return data;

  } catch (error) {
    console.error("Erro ao atualizar as diretrizes e controles do grupo:", error);
    // Propaga o erro para que o hook possa capturá-lo
    throw error;
  }
};
