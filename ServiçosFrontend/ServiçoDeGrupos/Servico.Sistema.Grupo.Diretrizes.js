
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Grupo.Diretrizes.js

import API_Sistema_Grupo_Diretrizes from '../APIs/API.Sistema.Grupo.Diretrizes.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Grupo.Diretrizes";

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
 * Atualiza as diretrizes e controles de moderação de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {GroupGuidelinesData} data - As configurações a serem salvas.
 * @returns {Promise<any>}
 */
export const updateGroupGuidelines = async (groupId, data) => {
    const contexto = `${contextoBase}.updateGroupGuidelines`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { guidelines, slowMode, slowModeEntry } = data;
        const promises = [];

        // Atualiza as diretrizes de texto, se fornecidas
        if (guidelines !== undefined) {
            promises.push(API_Sistema_Grupo_Diretrizes.atualizarDiretrizes(groupId, { guidelines }));
        }

        // Prepara as configurações de moderação (slow mode)
        const settings = {};
        if (slowMode !== undefined) {
            settings.slowMode = slowMode;
        }
        if (slowModeEntry !== undefined) {
            settings.slowModeEntry = slowModeEntry;
        }

        // Atualiza as configurações de moderação, se houver alguma
        if (Object.keys(settings).length > 0) {
            promises.push(API_Sistema_Grupo_Diretrizes.atualizarConfiguracoes(groupId, settings));
        }

        // Executa todas as atualizações em paralelo
        await Promise.all(promises);

        ServicoLog.info(contexto, `Diretrizes e configurações atualizadas para o grupo ${groupId}.`);
        return data; // Retorna os dados como confirmação

    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao atualizar diretrizes para o grupo ${groupId}:`, { error, data });
        throw error; // Propaga o erro
    }
};

/**
 * Obtém as diretrizes de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<any>}
 */
export const getGroupGuidelines = async (groupId) => {
    const contexto = `${contextoBase}.getGroupGuidelines`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }
    try {
        const { data } = await API_Sistema_Grupo_Diretrizes.obterDiretrizes(groupId);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao obter diretrizes do grupo ${groupId}:`, { error });
        throw error;
    }
};
