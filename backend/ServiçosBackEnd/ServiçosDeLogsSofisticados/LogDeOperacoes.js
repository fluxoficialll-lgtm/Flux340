
/**
 * @file LogDeOperacoes.js
 * @description Logger Estruturado e Configurável para Produção com Trace ID Automático.
 * @version 4.0.0
 *
 * Esta versão introduz a integração com `AsyncLocalStorage` para injeção automática de Trace ID,
 * eliminando a necessidade de passá-lo manualmente em cada chamada de log.
 *
 * Destaques:
 * - **Trace ID Automático:** O `traceId` é obtido do contexto da requisição (`requestContext`).
 * - **API Simplificada:** As funções de log (`log`, `warn`, etc.) não precisam mais do parâmetro `traceId`.
 * - **Observabilidade Aprimorada:** Garante que todos os logs dentro de uma requisição sejam correlacionados.
 */
import os from 'os';
import { requestContext } from './requestContext.js';

const levels = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
    fatal: 50,
    silent: Infinity,
};

const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const configuredLevel = levels[LOG_LEVEL.toLowerCase()] || levels.info;
const SERVICE_NAME = process.env.SERVICE_NAME || 'flux-app';
const SENSITIVE_KEYS = ['password', 'token', 'apiKey', 'clientSecret'];

/**
 * Sanitiza um objeto recursivamente.
 * @private
 */
function sanitize(obj) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    const newObj = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if (SENSITIVE_KEYS.includes(key.toLowerCase())) {
                newObj[key] = '[REDACTED]';
            } else {
                newObj[key] = sanitize(obj[key]);
            }
        }
    }
    return newObj;
}

/**
 * Função central que escreve o log formatado em JSON.
 * O traceId é obtido automaticamente do contexto da requisição.
 * @private
 */
const writeLog = (levelName, contexto, data) => {
    const level = levels[levelName];
    if (level < configuredLevel) {
        return;
    }

    // O traceId é recuperado do AsyncLocalStorage
    const traceId = requestContext.get('traceId');

    const { error, ...rest } = data || {};
    const sanitizedData = sanitize(rest);

    const logObject = {
        level: levelName,
        service: SERVICE_NAME,
        hostname: os.hostname(),
        pid: process.pid,
        time: Date.now(),
        timestamp: new Date().toISOString(),
        contexto,
        traceId, // Injetado automaticamente
        data: sanitizedData,
    };

    if (error instanceof Error) {
        logObject.error = {
            message: error.message,
            stack: error.stack,
            name: error.name,
        };
    }

    let output;
    try {
        output = JSON.stringify(logObject);
    } catch (e) {
        const simplifiedLog = {
            level: 'error',
            service: SERVICE_NAME,
            contexto: 'LOGGING_ERROR',
            error: {
                message: 'Failed to serialize log object: ' + e.message,
                originalContext: contexto,
                traceId, // Tenta incluir o traceId até no erro de logging
            },
        };
        output = JSON.stringify(simplifiedLog);
    }

    if (level >= levels.error) {
        console.error(output);
    } else if (level === levels.warn) {
        console.warn(output);
    } else {
        console.log(output);
    }
};

/**
 * Logger com API simplificada. O traceId é gerenciado automaticamente.
 */
export const LogDeOperacoes = {
    debug: (contexto, data = {}) => {
        writeLog('debug', contexto, data);
    },
    log: (contexto, data = {}) => {
        writeLog('info', contexto, data);
    },
    warn: (contexto, data = {}) => {
        writeLog('warn', contexto, data);
    },
    error: (contexto, data = {}) => {
        writeLog('error', contexto, data);
    },
    fatal: (contexto, data = {}) => {
        writeLog('fatal', contexto, data);
    },
};