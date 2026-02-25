
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { LogDeOperacoes } from './ServiçosBackEnd/ServiçosDeLogsSofisticados/LogDeOperacoes.js';
import { requestContext } from './ServiçosBackEnd/ServiçosDeLogsSofisticados/requestContext.js';
import { userRepositorio } from '../GerenciadoresDeDados/user.repositorio.js';

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

/**
 * Middleware de autenticação de usuário.
 * Verifica o token JWT, busca o usuário no banco e o anexa à requisição.
 */
export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Acesso negado. Token de autenticação não fornecido ou mal formatado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verifica o token usando a chave secreta das variáveis de ambiente
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Busca o usuário no banco de dados com o ID extraído do token
        const user = await userRepositorio.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        // Anexa o objeto do usuário à requisição para uso nos próximos middlewares/controllers
        req.user = user;

        next(); // Tudo certo, pode prosseguir para a rota
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ error: 'Token expirado.' });
        }
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ error: 'Token inválido.' });
        }
        // Para outros erros inesperados
        return res.status(500).json({ error: 'Erro interno ao verificar o token.' });
    }
};
