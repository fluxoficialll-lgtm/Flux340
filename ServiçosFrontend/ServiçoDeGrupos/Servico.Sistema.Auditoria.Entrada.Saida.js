
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Auditoria.Entrada.Saida.js

import API_Sistema_Auditoria_Entrada_Saida from '../APIs/API.Sistema.Auditoria.Entrada.Saida.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Auditoria.Entrada.Saida";

/**
 * Busca os logs de auditoria de entrada e saída de membros no grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array>} Uma promessa que resolve para a lista de logs de entrada e saída.
 */
export const getEntryExitLogs = async (groupId) => {
    const contexto = `${contextoBase}.getEntryExitLogs`;
    if (!groupId) {
        ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Auditoria_Entrada_Saida.obterLogs(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};
