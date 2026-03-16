
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Mensagens.Agendadas.js

import { api } from '../../api';
import { checkService } from '../../utils';

/**
 * @file Serviço para o gerenciamento de mensagens agendadas em grupos.
 */

/**
 * Busca as mensagens agendadas de um grupo.
 * @param {string} groupId - O ID do grupo.
 * @returns {Promise<Array<Object>>} Uma promessa que resolve com a lista de mensagens agendadas.
 */
export const getScheduledMessages = async (groupId) => {
    const endpoint = `/groups/${groupId}/scheduled-messages`;
    const response = await api.get(endpoint);
    return checkService(response);
};

/**
 * Cria uma nova mensagem agendada.
 * @param {string} groupId - O ID do grupo.
 * @param {Object} messageData - Os dados da mensagem a ser agendada.
 * @returns {Promise<Object>} Uma promessa que resolve com a mensagem agendada criada.
 */
export const createScheduledMessage = async (groupId, messageData) => {
    const endpoint = `/groups/${groupId}/scheduled-messages`;
    const response = await api.post(endpoint, messageData);
    return checkService(response);
};

/**
 * Atualiza uma mensagem agendada.
 * @param {string} groupId - O ID do grupo.
 * @param {string} messageId - O ID da mensagem agendada.
 * @param {Object} messageData - Os dados atualizados da mensagem.
 * @returns {Promise<Object>} Uma promessa que resolve com a mensagem agendada atualizada.
 */
export const updateScheduledMessage = async (groupId, messageId, messageData) => {
    const endpoint = `/groups/${groupId}/scheduled-messages/${messageId}`;
    const response = await api.put(endpoint, messageData);
    return checkService(response);
};

/**
 * Deleta uma mensagem agendada.
 * @param {string} groupId - O ID do grupo.
 * @param {string} messageId - O ID da mensagem agendada.
 * @returns {Promise<Object>} Uma promessa que resolve com o resultado da operação.
 */
export const deleteScheduledMessage = async (groupId, messageId) => {
    const endpoint = `/groups/${groupId}/scheduled-messages/${messageId}`;
    const response = await api.delete(endpoint);
    return checkService(response);
};
