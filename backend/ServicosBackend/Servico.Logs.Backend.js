
// backend/ServicosBackend/Servico.Logs.Backend.js

/**
 * @file Serviço de Log genérico para o Backend.
 * Centraliza a forma como os logs são registrados no lado do servidor.
 */

const ServicoDeLog = {

    /**
     * Registra uma mensagem de informação.
     * @param {string} message - A mensagem a ser registrada.
     * @param {object} data - Dados adicionais para incluir no log.
     * @param {string} context - O contexto (módulo/serviço) de onde o log se origina.
     */
    info(message, data = {}, context = 'Geral') {
        console.log(`[INFO][${context}] ${message}`, data);
    },

    /**
     * Registra uma mensagem de aviso.
     * @param {string} message - A mensagem a ser registrada.
     * @param {object} data - Dados adicionais para incluir no log.
     * @param {string} context - O contexto de onde o log se origina.
     */
    warn(message, data = {}, context = 'Geral') {
        console.warn(`[WARN][${context}] ${message}`, data);
    },

    /**
     * Registra uma mensagem de erro.
     * @param {string} message - A mensagem a ser registrada.
     * @param {object} errorData - Dados do erro, como stack trace e informações adicionais.
     * @param {string} context - O contexto de onde o log se origina.
     */
    error(message, errorData = {}, context = 'Geral') {
        console.error(`[ERROR][${context}] ${message}`, errorData);
    }
};

export default ServicoDeLog;
