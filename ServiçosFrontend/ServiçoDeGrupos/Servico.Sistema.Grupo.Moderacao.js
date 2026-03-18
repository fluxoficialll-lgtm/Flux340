
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Grupo.Moderacao.js

import API_Sistema_Grupo_Moderacao from '../APIs/API.Sistema.Grupo.Moderacao.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Grupo.Moderacao";

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
    const contexto = `${contextoBase}.getModerationSettings`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Grupo_Moderacao.obterConfiguracoes(groupId);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao buscar configurações de moderação para o grupo ${groupId}:`, { error });
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
    const contexto = `${contextoBase}.updateModerationSettings`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Grupo_Moderacao.atualizarConfiguracoes(groupId, settings);
        ServicoLog.info(contexto, `Configurações de moderação atualizadas para o grupo ${groupId}.`);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao atualizar configurações de moderação para o grupo ${groupId}:`, { error, settings });
        throw error;
    }
};
