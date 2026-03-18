
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Notificacoes.js

import API_Sistema_Notificacoes from '../APIs/API.Sistema.Notificacoes.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

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
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Notificacoes.obterConfiguracoes(groupId);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao buscar configurações de notificação para o grupo ${groupId}:`, { error });
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
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Notificacoes.atualizarConfiguracoes(groupId, settings);
        ServicoLog.info(contexto, `Configurações de notificação atualizadas para o grupo ${groupId}.`);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao atualizar configurações de notificação para o grupo ${groupId}:`, { error, settings });
        throw error;
    }
};
