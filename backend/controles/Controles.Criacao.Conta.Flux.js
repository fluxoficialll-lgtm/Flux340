
// backend/controles/Controles.Criação.Conta.Flux.js

import servicoCriacaoConta from '../ServicosBackend/Servicos.Criacao.Conta.Flux.js';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import config from '../config/Variaveis.Backend.js';

// Inicializa o cliente do Google com o ID do cliente das variáveis de ambiente
const client = new OAuth2Client(config.googleClientId);

const registerUser = async (req, res) => {
    try {
        const { name, email, password, google_id } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
        }

        if (!password && !google_id) {
            return res.status(400).json({ message: 'É necessário fornecer uma senha ou um ID do Google.' });
        }

        const result = await servicoCriacaoConta.registerUser({ name, email, password, google_id });
        
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro no controlador ao registrar usuário:', error);
        res.status(400).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
        }

        const result = await servicoCriacaoConta.loginUser({ email, password });

        res.status(200).json(result);

    } catch (error) {
        console.error('Erro no controlador ao fazer login:', error);
        res.status(401).json({ message: error.message || 'Credenciais inválidas.' });
    }
};

const googleAuth = async (req, res) => {
    try {
        const { token } = req.body; // Recebe o idToken do Google
        if (!token) {
            return res.status(400).json({ message: 'Token do Google não fornecido.' });
        }

        // Verifica o token do Google
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: config.googleClientId,
        });

        const payload = ticket.getPayload();
        const { name, email, sub: google_id } = payload; // 'sub' é o ID exclusivo do usuário no Google

        // Encontra ou cria um usuário no banco de dados
        const { user, isNewUser } = await servicoCriacaoConta.findOrCreateUser({
            name,
            email,
            google_id,
        });

        // Gera um token JWT para a sessão do usuário
        const jwtToken = jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, { expiresIn: '7d' });

        // Retorna o token JWT, os dados do usuário e se é um novo usuário
        res.status(200).json({ token: jwtToken, user, isNewUser });

    } catch (error) {
        console.error('Erro na autenticação com Google:', error);
        res.status(401).json({ message: 'Falha na autenticação com o Google.' });
    }
};

const controleCriacaoConta = {
    registerUser,
    loginUser,
    googleAuth,
};

export default controleCriacaoConta;
