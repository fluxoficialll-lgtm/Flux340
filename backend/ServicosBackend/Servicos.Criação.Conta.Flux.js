
// backend/ServicosBackend/Servicos.Criação.Conta.Flux.js

import repositorioCriacaoConta from '../Repositorios/Repositorio.Criação.Conta.Flux.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

const registerUser = async (userData) => {
    const { name, email, password, google_id } = userData;
    console.log(`Serviço: Iniciando registro para o email: ${email}`);

    const id = uuidv4();
    const userForDb = { id, name, email };

    if (password) {
        const salt = await bcrypt.genSalt(10);
        userForDb.password_hash = await bcrypt.hash(password, salt);
        console.log('Serviço: Senha criptografada com sucesso.');
    } else if (google_id) {
        userForDb.google_id = google_id;
        console.log(`Serviço: Preparando registro com Google ID: ${google_id}`);
    } else {
        throw new Error('Método de registro inválido. É necessário fornecer senha ou ID do Google.');
    }

    const newUser = await repositorioCriacaoConta.registerUser(userForDb);
    return { message: 'Usuário registrado com sucesso!', user: newUser };
};

const loginUser = async (loginData) => {
    const { email, password } = loginData;
    console.log(`Serviço: Tentativa de login com o email: ${email}`);

    const user = await repositorioCriacaoConta.findUserByEmail(email);
    if (!user) {
        console.warn(`Serviço: Tentativa de login falhou. Email não encontrado: ${email}`);
        throw new Error('Credenciais inválidas.');
    }

    if (!user.password_hash) {
        console.warn(`Serviço: Tentativa de login com senha em uma conta sem senha definida (email: ${email})`);
        throw new Error('Esta conta foi criada usando um provedor social. Tente logar com o Google.');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        console.warn(`Serviço: Tentativa de login falhou. Senha incorreta para o email: ${email}`);
        throw new Error('Credenciais inválidas.');
    }

    const payload = { user: { id: user.id, name: user.name, email: user.email } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    console.log(`Serviço: Login bem-sucedido e token gerado para ${email}`);

    return {
        message: 'Login bem-sucedido!',
        token,
        user: { id: user.id, name: user.name, email: user.email },
    };
};

const findOrCreateUser = async ({ name, email, google_id }) => {
    console.log(`Serviço: Procurando ou criando usuário com Google ID: ${google_id}`);

    // 1. Tenta encontrar um usuário existente pelo google_id
    let user = await repositorioCriacaoConta.findUserByGoogleId(google_id);
    if (user) {
        console.log('Serviço: Usuário encontrado com Google ID.');
        return { user, isNewUser: false };
    }

    // 2. Se o usuário não existir, cria um novo
    console.log('Serviço: Usuário com Google ID não encontrado. Criando um novo.');
    const newUser = {
        id: uuidv4(),
        name,
        email,
        google_id,
    };

    user = await repositorioCriacaoConta.registerUser(newUser);
    console.log('Serviço: Novo usuário criado com sucesso através do Google Auth.');

    return { user, isNewUser: true };
};

const servicoCriacaoConta = {
    registerUser,
    loginUser,
    findOrCreateUser, // Adiciona a nova função ao serviço
};

export default servicoCriacaoConta;
