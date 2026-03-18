
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Modo.Hub.js

import API_Sistema_Modo_Hub from '../APIs/APIsServicoGrupos/API.Sistema.Modo.Hub.js';

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
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Modo_Hub.obterStatusModoHub(groupId);
        return data;
    } catch (error) {
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
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Modo_Hub.definirStatusModoHub(groupId, payload);
        return data;
    } catch (error) {
        throw error;
    }
};
