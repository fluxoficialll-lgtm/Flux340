
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Auditoria.Ajuste.js

import API_Sistema_Auditoria_Ajuste from '../APIs/APIsServicoGrupos/API.Sistema.Auditoria.Ajuste.js';
// import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Auditoria.Ajuste";

/**
 * Busca os logs de auditoria relacionados a ajustes e configurações do grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de logs de auditoria de ajustes.
 */
export const getSettingsAuditLogs = async (groupId) => {
    const contexto = `${contextoBase}.getSettingsAuditLogs`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Auditoria_Ajuste.obterLogs(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};
