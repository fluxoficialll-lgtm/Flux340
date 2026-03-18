
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Convites.js

import API_Sistema_Convites from '../APIs/APIsServicoGrupos/API.Sistema.Convites.js';
// import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Convites";

/**
 * Busca todos os links de convite de um grupo específico.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de links.
 */
export const getInviteLinks = async (groupId) => {
    const contexto = `${contextoBase}.getInviteLinks`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Convites.obter(groupId);
        return data;
    } catch (error) {
        // O erro já é logado pelo interceptor do ClienteBackend
        throw error;
    }
};

/**
 * Cria um novo link de convite para um grupo.
 * @param {string} groupId - O ID do grupo.
 * @param {object} linkData - Os dados do novo link (nome, tipo, expiração, etc.).
 * @returns {Promise<object>} Uma promessa que resolve para o link recém-criado.
 */
export const createInviteLink = async (groupId, linkData) => {
    const contexto = `${contextoBase}.createInviteLink`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Convites.criar(groupId, linkData);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Revoga (desativa) um link de convite existente.
 * @param {string} groupId - O ID do grupo.
 * @param {string} linkId - O ID do link a ser revogado.
 * @returns {Promise<object>} Uma promessa com a confirmação da revogação.
 */
export const revokeInviteLink = async (groupId, linkId) => {
    const contexto = `${contextoBase}.revokeInviteLink`;
    if (!groupId || !linkId) {
        // ServicoLog.aviso(contexto, 'IDs não fornecidos.');
        return Promise.reject('IDs não fornecidos.');
    }
    try {
        // A resposta de um DELETE bem-sucedido pode não ter corpo (data), 
        // então retornamos um objeto de sucesso genérico ou a própria resposta.
        const resposta = await API_Sistema_Convites.revogar(groupId, linkId);
        return resposta.data || { success: true };
    } catch (error) {
        throw error;
    }
};
