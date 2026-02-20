
import crypto from 'crypto';
import { LogDeOperacoes } from './ServiçosBackEnd/ServiçosDeLogsSofisticados/LogDeOperacoes.js';
import { requestContext } from './ServiçosBackEnd/ServiçosDeLogsSofisticados/requestContext.js';

/**
 * Middleware principal que estabelece um contexto assíncrono para cada requisição.
 * Ele gera um traceId, armazena-o no contexto e garante que esteja disponível
 * durante todo o ciclo de vida da requisição.
 */
export const requestContextMiddleware = (req, res, next) => {
    const traceId = crypto.randomUUID();
    
    res.setHeader('X-Trace-Id', traceId);

    const store = new Map();
    store.set('traceId', traceId);

    requestContext.run(store, () => {
        LogDeOperacoes.log('REQUISICAO_RECEBIDA', {
            method: req.method,
            url: req.originalUrl,
            ip: req.ip,
            userAgent: req.headers['user-agent'],
        });
        next();
    });
};


/**
 * Middleware para validar o token de administrador.
 * O logger agora buscará o traceId automaticamente do contexto.
 */
export const validateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const expectedToken = process.env.VITE_ADMIN_TOKEN || 'ADMIN_TOKEN_V3';
    
    if (!authHeader || authHeader !== `Bearer ${expectedToken}`) {
        LogDeOperacoes.warn(
            'ACESSO_ADMIN_RECUSADO',
            { 
                reason: 'Token de administrador inválido ou ausente',
                path: req.originalUrl,
                ip: req.ip
            }
        );
        return res.status(401).json({ error: 'Não autorizado. Token de administrador inválido ou ausente.' });
    }
    
    LogDeOperacoes.log(
        'ACESSO_ADMIN_AUTORIZADO',
        { 
            path: req.originalUrl,
            ip: req.ip
        }
    );
    
    next();
};
