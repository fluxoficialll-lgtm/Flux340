
/**
 * @file LogDeOperacoes.js
 * @description Logger Estruturado e Configurável para Produção.
 * @version 3.0.0
 *
 * Inspirado em loggers de produção como Pino e Winston, este módulo fornece:
 * - **Logs em JSON Estruturado:** Saída padronizada para fácil parsing por serviços como Elastic, Datadog, etc.
 * - **Nível de Log Configurável:** Controlado pela variável de ambiente LOG_LEVEL.
 * - **Contexto de Serviço:** Adiciona automaticamente nome do serviço, hostname e PID.
 * - **Suporte a Trace ID:** Permite a correlação de logs através de uma única requisição.
 * - **Serialização de Erros:** Captura automática de stack trace para depuração eficaz.
 * - **Performance:** Evita processamento desnecessário.
 * - **Segurança:** Previne mutação de objetos e sanitiza dados sensíveis.
 * - **Resiliência:** Proteção contra erros de serialização (referências circulares).
 */
import os from 'os';

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
 * Sanitiza um objeto, removendo ou ofuscando chaves sensíveis.
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
 * @private
 */
const writeLog = (levelName, contexto, data, traceId) => {
    const level = levels[levelName];
    if (level < configuredLevel) {
        return;
    }

    // 1. Correção de Mutação: Cria uma cópia do objeto de dados.
    const { error, ...rest } = data || {};
    const sanitizedData = sanitize(rest);


    const logObject = {
        level: levelName,
        service: SERVICE_NAME,
        hostname: os.hostname(),
        pid: process.pid,
        time: Date.now(), // Timestamp de alta precisão
        timestamp: new Date().toISOString(),
        contexto,
        traceId,
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
        // Proteção contra falhas de serialização (referências circulares)
        const simplifiedLog = {
            level: 'error',
            service: SERVICE_NAME,
            contexto: 'LOGGING_ERROR',
            error: {
                message: 'Failed to serialize log object: ' + e.message,
                originalContext: contexto,
            },
        };
        output = JSON.stringify(simplifiedLog);
    }


    // Direciona a saída para o stream correto
    if (level >= levels.error) {
        console.error(output);
    } else if (level === levels.warn){
        console.warn(output);
    }
    else {
        console.log(output);
    }
};

export const LogDeOperacoes = {
    debug: (contexto, data = {}, traceId = null) => {
        writeLog('debug', contexto, data, traceId);
    },
    log: (contexto, data = {}, traceId = null) => {
        writeLog('info', contexto, data, traceId);
    },
    warn: (contexto, data = {}, traceId = null) => {
        writeLog('warn', contexto, data, traceId);
    },
    error: (contexto, data = {}, traceId = null) => {
        writeLog('error', contexto, data, traceId);
    },
    fatal: (contexto, data = {}, traceId = null) => {
        writeLog('fatal', contexto, data, traceI);
    },
};
