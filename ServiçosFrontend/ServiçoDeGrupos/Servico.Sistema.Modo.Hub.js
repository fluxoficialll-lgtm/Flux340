
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Modo.Hub.js

import API_Sistema_Modo_Hub from '../APIs/API.Sistema.Modo.Hub.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Modo.Hub";

/**
 * Busca o estado atual do Modo Hub para um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<{ isEnabled: boolean }>}
 */
export const getHubModeStatus = async (groupId) => {
    const contexto = `${contextoBase}.getHubModeStatus`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Modo_Hub.obterStatusModoHub(groupId);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao buscar o estado do Modo Hub para o grupo ${groupId}:`, { error });
        throw error;
    }
};

/**
 * Define o estado do Modo Hub para um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {{ isEnabled: boolean }} payload - O novo estado.
 * @returns {Promise<object>}
 */
export const setHubModeStatus = async (groupId, payload) => {
    const contexto = `${contextoBase}.setHubModeStatus`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Modo_Hub.definirStatusModoHub(groupId, payload);
        ServicoLog.info(contexto, `Modo Hub do grupo ${groupId} atualizado para ${payload.isEnabled}.`);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao definir o estado do Modo Hub para o grupo ${groupId}:`, { error, payload });
        throw error;
    }
};
