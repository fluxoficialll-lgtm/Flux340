
import servicoCriacaoConta from '../ServicosBackend/Servicos.Criacao.Conta.Flux.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import config from '../config/Variaveis.Backend.js';
import ServicoLog from '../ServicosBackend/Servico.Logs.Backend.js';
import ServicoRespostaHTTP from '../ServicosBackend/Servico.HTTP.Resposta.js';

const client = new OAuth2Client(config.googleClientId);

const registerUser = async (req, res) => {
    const contexto = "Controle.CriacaoConta.registerUser";
    ServicoLog.info(contexto, "Iniciando registro de usuário", req.body);

    try {
        const { name, email, password, google_id } = req.body;

        if (!name || !email) {
            ServicoLog.warn(contexto, "Tentativa de registro sem nome ou email.");
            return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
        }

        if (!password && !google_id) {
            ServicoLog.warn(contexto, "Tentativa de registro sem senha ou ID do Google.");
            return res.status(400).json({ message: 'É necessário fornecer uma senha ou um ID do Google.' });
        }

        const result = await servicoCriacaoConta.registerUser({ name, email, password, google_id });
        ServicoLog.info(contexto, "Usuário registrado com sucesso", result);
        
        ServicoRespostaHTTP.criado(res, result, 'Usuário criado com sucesso.');
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao registrar usuário', error);
        res.status(400).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
};

const loginUser = async (req, res) => {
    const contexto = "Controle.CriacaoConta.loginUser";
    ServicoLog.info(contexto, "Iniciando login de usuário", req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            ServicoLog.warn(contexto, "Tentativa de login sem email ou senha.");
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const result = await servicoCriacaoConta.loginUser({ email, password });
        ServicoLog.info(contexto, "Login bem-sucedido", result);

        ServicoRespostaHTTP.sucesso(res, result, 'Login bem-sucedido.');

    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao fazer login', error);
        ServicoRespostaHTTP.naoAutorizado(res, error.message || 'Credenciais inválidas.');
    }
};

const googleAuth = async (req, res) => {
    const contexto = "Controle.CriacaoConta.googleAuth";
    ServicoLog.info(contexto, "Iniciando autenticação com Google", req.body.token ? { token: "present" } : { token: "absent" });

    try {
        const { token } = req.body;
        if (!token) {
            ServicoLog.warn(contexto, "Token do Google não fornecido.");
            return res.status(400).json({ message: 'Token do Google não fornecido.' });
        }

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.googleClientId,
        });

        const payload = ticket.getPayload();
        ServicoLog.debug(contexto, "Payload recebido do Google", payload);
        const { name, email, sub: google_id } = payload;

        const { user, isNewUser } = await servicoCriacaoConta.findOrCreateUser({
            name,
            email,
            google_id,
        });

        const jwtToken = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '7d' });

        const response = {
            message: "Autenticação com Google bem-sucedida!",
            token: jwtToken, 
            user, 
            isNewUser 
        };
        ServicoLog.info(contexto, "Autenticação com Google bem-sucedida", { userId: user.id, isNewUser });

        ServicoRespostaHTTP.sucesso(res, response, 'Autenticação com Google bem-sucedida!');

    } catch (error) {
        ServicoLog.erro(contexto, 'Erro na autenticação com Google', error);
        ServicoRespostaHTTP.naoAutorizado(res, 'Falha na autenticação com o Google.');
    }
};

const controleCriacaoConta = {
    registerUser,
    loginUser,
    googleAuth,
};

export default controleCriacaoConta;
