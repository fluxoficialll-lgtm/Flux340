
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Notificacoes.js

import API_Sistema_Notificacoes from '../APIs/APIsServicoGrupos/API.Sistema.Notificacoes.js';

const contextoBase = "Servico.Sistema.Notificacoes";

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
    const contexto = `${contextoBase}.getNotificationSettings`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Notificacoes.obterConfiguracoes(groupId);
        return data;
    } catch (error) {
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
    const contexto = `${contextoBase}.updateNotificationSettings`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Notificacoes.atualizarConfiguracoes(groupId, settings);
        return data;
    } catch (error) {
        throw error;
    }
};
