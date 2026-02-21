
import { auditLogRepositorio } from '../../GerenciadoresDeDados/auditLog.repositorio.js';

const SERVICE_NAME = process.env.SERVICE_NAME || 'Flux-Backend';

// Mapeamento de níveis de log para cores no console
const colors = {
    log: '\x1b[36m',    // Cyan
    info: '\x1b[32m',   // Green
    warn: '\x1b[33m',   // Yellow
    error: '\x1b[31m',  // Red
    fatal: '\x1b[35m',  // Magenta
    debug: '\x1b[90m',  // Gray
    reset: '\x1b[0m'
};

// Função centralizada para processar e formatar logs
const processLog = (level, contexto, data = {}, traceId = null) => {
    const timestamp = new Date().toISOString();
    
    // 1. Formata a mensagem para o console (ainda útil para dev)
    const color = colors[level] || colors.log;
    const traceInfo = traceId ? `[traceId=${traceId}]` : '';
    console.log(`${color}[${timestamp}] [${level.toUpperCase()}] [${contexto}]${traceInfo}${colors.reset} - ${JSON.stringify(data)}`);

    // 2. Persiste o log no banco de dados usando o novo repositório
    // A inserção é "fire-and-forget" para não impactar a performance da requisição.
    auditLogRepositorio.insert({
        traceId,
        level,
        service: SERVICE_NAME,
        contexto,
        data,
        timestamp
    });
};

// Objeto principal do serviço de log
export const LogDeOperacoes = {
    log: (contexto, data, traceId) => processLog('log', contexto, data, traceId),
    info: (contexto, data, traceId) => processLog('info', contexto, data, traceId),
    warn: (contexto, data, traceId) => processLog('warn', contexto, data, traceId),
    error: (contexto, data, traceId) => processLog('error', contexto, data, traceId),
    fatal: (contexto, data, traceId) => processLog('fatal', contexto, data, traceId),
    debug: (contexto, data, traceId) => processLog('debug', contexto, data, traceId)
};