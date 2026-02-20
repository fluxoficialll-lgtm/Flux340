
/**
 * @file requestContext.js
 * @description Gerencia o contexto assíncrono para cada requisição usando AsyncLocalStorage.
 * @version 1.0.0
 *
 * Este módulo permite que dados, como um traceId ou um logger com contexto,
 * sejam acessíveis em qualquer ponto do código durante o ciclo de vida de uma requisição,
 * sem a necessidade de passá-los como parâmetros.
 */

import { AsyncLocalStorage } from 'async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

export const requestContext = {
    /**
     * Executa uma função dentro de um novo contexto assíncrono.
     * @param {Map} store - O mapa de armazenamento para o contexto.
     * @param {Function} callback - A função a ser executada dentro do contexto.
     */
    run: (store, callback) => {
        asyncLocalStorage.run(store, callback);
    },

    /**
     * Retorna o valor associado a uma chave do armazenamento de contexto atual.
     * @param {string} key - A chave para recuperar.
     * @returns {*} O valor associado à chave, ou undefined se não houver contexto ativo.
     */
    get: (key) => {
        const store = asyncLocalStorage.getStore();
        return store ? store.get(key) : undefined;
    },

    /**
     * Define um valor no armazenamento de contexto atual.
     * @param {string} key - A chave para definir.
     * @param {*} value - O valor a ser armazenado.
     */
    set: (key, value) => {
        const store = asyncLocalStorage.getStore();
        if (store) {
            store.set(key, value);
        }
    }
};
