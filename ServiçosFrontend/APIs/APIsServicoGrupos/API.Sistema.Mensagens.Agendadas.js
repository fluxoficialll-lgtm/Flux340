
// Arquivo: ServiçosFrontend/APIs/API.Sistema.Mensagens.Agendadas.js

import ClienteBackend from '../../Cliente.Backend.js';

const API_Sistema_Mensagens_Agendadas = {
    /**
     * Busca as mensagens agendadas de um grupo.
     * @param {string} idGrupo - O ID do grupo.
     * @returns {Promise<AxiosResponse<any>>}
     */
    obterMensagensAgendadas(idGrupo) {
        return ClienteBackend.get(`/groups/${idGrupo}/scheduled-messages`);
    },

    /**
     * Cria uma nova mensagem agendada.
     * @param {string} idGrupo - O ID do grupo.
     * @param {Object} dadosMensagem - Os dados da mensagem a ser agendada.
     * @returns {Promise<AxiosResponse<any>>}
     */
    criarMensagemAgendada(idGrupo, dadosMensagem) {
        return ClienteBackend.post(`/groups/${idGrupo}/scheduled-messages`, dadosMensagem);
    },

    /**
     * Atualiza uma mensagem agendada.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idMensagem - O ID da mensagem agendada.
     * @param {Object} dadosMensagem - Os dados atualizados da mensagem.
     * @returns {Promise<AxiosResponse<any>>}
     */
    atualizarMensagemAgendada(idGrupo, idMensagem, dadosMensagem) {
        return ClienteBackend.put(`/groups/${idGrupo}/scheduled-messages/${idMensagem}`, dadosMensagem);
    },

    /**
     * Deleta uma mensagem agendada.
     * @param {string} idGrupo - O ID do grupo.
     * @param {string} idMensagem - O ID da mensagem agendada.
     * @returns {Promise<AxiosResponse<any>>}
     */
    deletarMensagemAgendada(idGrupo, idMensagem) {
        return ClienteBackend.delete(`/groups/${idGrupo}/scheduled-messages/${idMensagem}`);
    },
};

export default API_Sistema_Mensagens_Agendadas;
