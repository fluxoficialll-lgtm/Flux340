
// backend/controles/Controles.Criação.Conta.Flux.js

import servicoCriacaoConta from '../ServicosBackend/Servicos.Criação.Conta.Flux.js';

const registerUser = async (req, res) => {
    try {
        // Extrai todos os campos possíveis do corpo da requisição
        const { name, email, password, google_id } = req.body;

        // Validação: nome e email são sempre obrigatórios.
        if (!name || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
        }

        // Validação: É necessário ter uma senha OU um google_id para se registrar.
        if (!password && !google_id) {
            return res.status(400).json({ message: 'É necessário fornecer uma senha ou um ID do Google.' });
        }

        // Passa todos os dados recebidos para o serviço.
        // O serviço saberá como lidar com a presença de `password` ou `google_id`.
        const result = await servicoCriacaoConta.registerUser({ name, email, password, google_id });
        
        res.status(201).json(result);
    } catch (error) {
        console.error('Erro no controlador ao registrar usuário:', error);
        // Retorna o erro específico do serviço (ex: email duplicado)
        res.status(400).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
};

const loginUser = async (req, res) => {
    try {
        // TODO: Adicionar lógica de login para o Google aqui, que provavelmente receberá um `token` do Google em vez de email/senha
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

const controleCriacaoConta = {
    registerUser,
    loginUser,
};

export default controleCriacaoConta;
