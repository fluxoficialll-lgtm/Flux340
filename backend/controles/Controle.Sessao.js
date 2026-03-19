
// backend/controles/Controle.Sessao.js

import servicoUsuario from '../ServicosBackend/Servico.Usuario.js';
import servicoSessao from '../ServicosBackend/Servico.Sessao.js';
import ServicoResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';
import ServicoLog from '../ServicosBackend/Servico.Logs.Backend.js';
import validadorUsuario from '../validators/Validator.Estrutura.Usuario.js';

const registrar = async (req, res) => {
    const contexto = "Controle.Sessao.registrar";
    const dadosRequisicao = { userAgent: req.headers['user-agent'], ipAddress: req.ip };

    try {
        // 1. Validar a entrada
        const dadosValidados = validadorUsuario.validarRegistro(req.body);
        ServicoLog.info(contexto, 'Iniciando registro de usuário', { email: dadosValidados.email });

        // 2. Chamar os serviços com os dados validados
        const usuario = await servicoUsuario.registrarNovoUsuario(dadosValidados);
        const token = await servicoSessao.criarNovaSessao({ usuario, dadosRequisicao });

        ServicoLog.info(contexto, 'Registro e sessão criados com sucesso', { userId: usuario.id });
        return ServicoResposta.sucesso(res, { token, user: usuario.paraRespostaHttp() }, 201);

    } catch (error) {
        ServicoLog.erro(contexto, error.message, { email: req.body.email });
        if (error.message.includes('está em uso')) {
            return ServicoResposta.conflito(res, error.message);
        }
        // Captura erros de validação e outros erros de serviço
        return ServicoResposta.requisiçãoInválida(res, error.message);
    }
};

const login = async (req, res) => {
    const contexto = "Controle.Sessao.login";
    const dadosRequisicao = { userAgent: req.headers['user-agent'], ipAddress: req.ip };

    try {
        const dadosValidados = validadorUsuario.validarLogin(req.body);
        ServicoLog.info(contexto, 'Iniciando login de usuário', { email: dadosValidados.email });

        const usuario = await servicoUsuario.autenticarUsuarioPorCredenciais(dadosValidados);
        const token = await servicoSessao.criarNovaSessao({ usuario, dadosRequisicao });

        ServicoLog.info(contexto, 'Login e sessão criados com sucesso', { userId: usuario.id });
        return ServicoResposta.sucesso(res, { token, user: usuario.paraRespostaHttp() });

    } catch (error) {
        ServicoLog.erro(contexto, error.message, { email: req.body.email });
        if (error.message.includes('Credenciais inválidas')) {
            return ServicoResposta.nãoAutorizado(res, error.message);
        }
        return ServicoResposta.requisiçãoInválida(res, error.message);
    }
};

const googleAuth = async (req, res) => {
    const contexto = "Controle.Sessao.googleAuth";
    const dadosRequisicao = { userAgent: req.headers['user-agent'], ipAddress: req.ip };

    try {
        const dadosValidados = validadorUsuario.validarGoogleAuth(req.body);
        ServicoLog.info(contexto, 'Iniciando autenticação Google', { email: dadosValidados.email });

        const { usuario, isNewUser } = await servicoUsuario.autenticarOuCriarPorGoogle(dadosValidados);
        const token = await servicoSessao.criarNovaSessao({ usuario, dadosRequisicao });

        ServicoLog.info(contexto, 'Autenticação Google e sessão processados com sucesso', { userId: usuario.id });
        return ServicoResposta.sucesso(res, { 
            token, 
            user: usuario.paraRespostaHttp(),
            isNewUser
        });

    } catch (error) {
        ServicoLog.erro(contexto, error.message, { email: req.body.email });
        if (error.message.includes('Faça login com sua senha')) {
            return ServicoResposta.conflito(res, error.message);
        }
        return ServicoResposta.requisiçãoInválida(res, error.message);
    }
};

const logout = async (req, res) => {
    const contexto = "Controle.Sessao.logout";
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return ServicoResposta.nãoAutorizado(res, 'Token não fornecido');
        }
        await servicoSessao.encerrarSessao(token);
        return ServicoResposta.sucesso(res, { message: 'Logout bem-sucedido' });

    } catch (error) {
        ServicoLog.erro(contexto, error.message);
        return ServicoResposta.erro(res, 'Falha ao fazer logout');
    }
};

export default {
    registrar,
    login,
    googleAuth,
    logout
};