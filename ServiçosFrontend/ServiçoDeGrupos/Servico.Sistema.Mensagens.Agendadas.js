
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Mensagens.Agendadas.js

import API_Sistema_Mensagens_Agendadas from '../APIs/API.Sistema.Mensagens.Agendadas.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Mensagens.Agendadas";

/**
 * Busca as mensagens agendadas de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array<Object>>} Uma promessa que resolve com a lista de mensagens agendadas.
 */
export const getScheduledMessages = async (groupId) => {
    const contexto = `${contextoBase}.getScheduledMessages`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Mensagens_Agendadas.obterMensagensAgendadas(groupId);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao buscar mensagens agendadas para o grupo ${groupId}:`, { error });
        throw error;
    }
};

/**
 * Cria uma nova mensagem agendada.
 * @param {string} groupId - O ID do grupo.
 * @param {Object} messageData - Os dados da mensagem a ser agendada.
 * @returns {Promise<Object>} Uma promessa que resolve com a mensagem agendada criada.
 */
export const createScheduledMessage = async (groupId, messageData) => {
    const contexto = `${contextoBase}.createScheduledMessage`;
    if (!groupId) {
        const erro = "O ID do grupo é obrigatório.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Mensagens_Agendadas.criarMensagemAgendada(groupId, messageData);
        ServicoLog.info(contexto, `Mensagem agendada criada para o grupo ${groupId}.`);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao criar mensagem agendada para o grupo ${groupId}:`, { error, messageData });
        throw error;
    }
};

/**
 * Atualiza uma mensagem agendada.
 * @param {string} groupId - O ID do grupo.
 * @param {string} messageId - O ID da mensagem agendada.
 * @param {Object} messageData - Os dados atualizados da mensagem.
 * @returns {Promise<Object>} Uma promessa que resolve com a mensagem agendada atualizada.
 */
export const updateScheduledMessage = async (groupId, messageId, messageData) => {
    const contexto = `${contextoBase}.updateScheduledMessage`;
    if (!groupId || !messageId) {
        const erro = "Os IDs do grupo e da mensagem são obrigatórios.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Mensagens_Agendadas.atualizarMensagemAgendada(groupId, messageId, messageData);
        ServicoLog.info(contexto, `Mensagem agendada ${messageId} do grupo ${groupId} atualizada.`);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao atualizar mensagem agendada ${messageId} para o grupo ${groupId}:`, { error, messageData });
        throw error;
    }
};

/**
 * Deleta uma mensagem agendada.
 * @param {string} groupId - O ID do grupo.
 * @param {string} messageId - O ID da mensagem agendada.
 * @returns {Promise<Object>} Uma promessa que resolve com o resultado da operação.
 */
export const deleteScheduledMessage = async (groupId, messageId) => {
    const contexto = `${contextoBase}.deleteScheduledMessage`;
    if (!groupId || !messageId) {
        const erro = "Os IDs do grupo e da mensagem são obrigatórios.";
        ServicoLog.aviso(contexto, erro);
        return Promise.reject(erro);
    }

    try {
        const { data } = await API_Sistema_Mensagens_Agendadas.deletarMensagemAgendada(groupId, messageId);
        ServicoLog.info(contexto, `Mensagem agendada ${messageId} do grupo ${groupId} deletada.`);
        return data;
    } catch (error) {
        ServicoLog.erro(contexto, `Erro ao deletar mensagem agendada ${messageId} para o grupo ${groupId}:`, { error });
        throw error;
    }
};
