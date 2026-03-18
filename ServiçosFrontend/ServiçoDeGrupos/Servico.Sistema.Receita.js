
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Receita.js

import API_Sistema_Receita from '../APIs/API.Sistema.Receita.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Receita";

/**
 * Busca os dados de faturamento detalhado de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Object>} Uma promessa que resolve com os dados de faturamento.
 */
export const getGroupRevenue = async (groupId) => {
    const contexto = `${contextoBase}.getGroupRevenue`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Receita.obterReceita(groupId);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao buscar a receita do grupo ${groupId}:`, { error });
        throw error;
    }
};
