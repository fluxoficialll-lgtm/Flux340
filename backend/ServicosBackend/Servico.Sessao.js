
// backend/ServicosBackend/Servico.Sessao.js

import jwt from 'jsonwebtoken';
import repositorioSessao from '../Repositorios/Repositorio.Sessao.js';
import ServicoLog from './Servico.Logs.Backend.js';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';
const contextoBase = "Servico.Sessao";

/**
 * Cria uma nova sessão para um usuário, gerando um token JWT.
 */
const criarNovaSessao = async (data) => {
    const contexto = `${contextoBase}.criarNovaSessao`;
    const { usuario, dadosRequisicao } = data;

    if (!usuario || !usuario.id) {
        throw new Error('Dados de usuário inválidos para criar sessão.');
    }

    ServicoLog.info(contexto, `Criando sessão para o usuário ${usuario.id}`);

    const payload = { user: usuario.paraRespostaHttp() };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });

    await repositorioSessao.criar({
        idUsuario: usuario.id,
        token,
        userAgent: dadosRequisicao.userAgent,
        enderecoIp: dadosRequisicao.ipAddress,
        dataExpiracao: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 horas a partir de agora
    });

    ServicoLog.info(contexto, `Sessão criada e token gerado para ${usuario.id}`);
    
    return token;
};

/**
 * Invalida um token de sessão (logout).
 */
const encerrarSessao = async (token) => {
    const contexto = `${contextoBase}.encerrarSessao`;
    ServicoLog.info(contexto, "Iniciando processo de logout.");

    await repositorioSessao.invalidar(token);

    ServicoLog.info(contexto, "Sessão invalidada com sucesso.");
    return { message: "Logout bem-sucedido" };
};

export default {
    criarNovaSessao,
    encerrarSessao,
};