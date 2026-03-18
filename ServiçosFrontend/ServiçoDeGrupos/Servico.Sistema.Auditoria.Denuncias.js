
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Auditoria.Denuncias.js

import API_Sistema_Auditoria_Denuncias from '../APIs/APIsServicoGrupos/API.Sistema.Auditoria.Denuncias.js';
// import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Auditoria.Denuncias";

/**
 * Busca todas as denúncias de um grupo específico.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de denúncias.
 */
export const getReports = async (groupId) => {
    const contexto = `${contextoBase}.getReports`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Auditoria_Denuncias.obterDenuncias(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};

/**
 * Rejeita (ignora) uma denúncia específica.
 * @param {string} groupId - O ID do grupo.
 * @param {string} reportId - O ID da denúncia a ser rejeitada.
 * @returns {Promise<object>} Uma promessa com a confirmação da rejeição.
 */
export const dismissReport = async (groupId, reportId) => {
    const contexto = `${contextoBase}.dismissReport`;
    if (!groupId || !reportId) {
        // ServicoLog.aviso(contexto, 'IDs não fornecidos.');
        return Promise.reject('IDs não fornecidos.');
    }
    try {
        const { data } = await API_Sistema_Auditoria_Denuncias.rejeitarDenuncia(groupId, reportId);
        return data;
    } catch (error) {
        throw error;
    }
};
