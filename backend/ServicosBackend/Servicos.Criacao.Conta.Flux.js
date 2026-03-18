
import repositorioCriacaoConta from '../Repositorios/Repositorio.Criacao.Conta.Flux.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import ServicoLog from './Servico.Logs.Backend.js';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

const registerUser = async (userData) => {
    const contexto = "Servico.CriacaoConta.registerUser";
    const { name, email, password, google_id } = userData;
    ServicoLog.info(contexto, `Iniciando registro para o email: ${email}`);

    try {
        const id = uuidv4();
        const userForDb = { id, name, email };

        if (password) {
            const salt = await bcrypt.genSalt(10);
            userForDb.password_hash = await bcrypt.hash(password, salt);
            ServicoLog.debug(contexto, 'Senha criptografada com sucesso.');
        } else if (google_id) {
            userForDb.google_id = google_id;
            ServicoLog.debug(contexto, `Preparando registro com Google ID: ${google_id}`);
        } else {
            ServicoLog.warn(contexto, 'Método de registro inválido. Faltando senha ou ID do Google.');
            throw new Error('Método de registro inválido. É necessário fornecer senha ou ID do Google.');
        }

        const newUser = await repositorioCriacaoConta.registerUser(userForDb);
        ServicoLog.info(contexto, "Usuário registrado com sucesso no repositório", { userId: newUser.id });
        return { message: 'Usuário registrado com sucesso!', user: newUser };
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao registrar usuário', error);
        throw error;
    }
};

const loginUser = async (loginData) => {
    const contexto = "Servico.CriacaoConta.loginUser";
    const { email, password } = loginData;
    ServicoLog.info(contexto, `Tentativa de login com o email: ${email}`);

    try {
        const user = await repositorioCriacaoConta.findUserByEmail(email);
        if (!user) {
            ServicoLog.warn(contexto, `Tentativa de login falhou. Email não encontrado: ${email}`);
            throw new Error('Credenciais inválidas.');
        }

        if (!user.password_hash) {
            ServicoLog.warn(contexto, `Tentativa de login com senha em uma conta Google (email: ${email})`);
            throw new Error('Esta conta foi criada usando um provedor social. Tente logar com o Google.');
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            ServicoLog.warn(contexto, `Tentativa de login falhou. Senha incorreta para o email: ${email}`);
            throw new Error('Credenciais inválidas.');
        }

        const payload = { user: { id: user.id, name: user.name, email: user.email } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        ServicoLog.info(contexto, `Login bem-sucedido e token gerado para ${email}`);

        return {
            message: 'Login bem-sucedido!',
            token,
            user: { id: user.id, name: user.name, email: user.email },
        };
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro durante o processo de login', { email, message: error.message });
        // Re-lança o erro para ser tratado pelo controller
        throw error;
    }
};

const findOrCreateUser = async ({ name, email, google_id }) => {
    const contexto = "Servico.CriacaoConta.findOrCreateUser";
    ServicoLog.info(contexto, `Procurando ou criando usuário com Google ID: ${google_id}`);

    try {
        let user = await repositorioCriacaoConta.findUserByGoogleId(google_id);
        if (user) {
            ServicoLog.info(contexto, 'Usuário encontrado com Google ID.', { userId: user.id });
            return { user, isNewUser: false };
        }

        ServicoLog.info(contexto, 'Usuário com Google ID não encontrado. Criando um novo.');
        const newUser = {
            id: uuidv4(),
            name,
            email,
            google_id,
        };

        user = await repositorioCriacaoConta.registerUser(newUser);
        ServicoLog.info(contexto, 'Novo usuário criado com sucesso através do Google Auth.', { userId: user.id });

        return { user, isNewUser: true };
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao procurar ou criar usuário com Google ID', error);
        throw error;
    }
};

const servicoCriacaoConta = {
    registerUser,
    loginUser,
    findOrCreateUser,
};

export default servicoCriacaoConta;
