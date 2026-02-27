
// backend/ServicosBackend/Servicos.Criação.Conta.Flux.js

import repositorioCriacaoConta from '../Repositorios/Repositorio.Criação.Conta.Flux.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

const registerUser = async (userData) => {
    // Agora pode receber name, email, password e/ou google_id
    const { name, email, password, google_id } = userData;
    console.log(`Serviço: Iniciando registro para o email: ${email}`);

    // 1. Gerar um ID único para o usuário
    const id = uuidv4();

    // 2. Montar o objeto de usuário para o banco de dados
    const userForDb = {
        id,
        name,
        email,
    };

    // 3. Lidar com a senha ou com o ID do Google
    if (password) {
        // Se for um registro com senha, criptografa a senha
        const salt = await bcrypt.genSalt(10);
        userForDb.password_hash = await bcrypt.hash(password, salt);
        console.log('Serviço: Senha criptografada com sucesso.');
    } else if (google_id) {
        // Se for um registro com o Google, adiciona o google_id
        userForDb.google_id = google_id;
        console.log(`Serviço: Preparando registro com Google ID: ${google_id}`);
    } else {
        // Se nenhum método de autenticação for fornecido (deve ser prevenido na rota/controlador)
        throw new Error('Método de registro inválido. É necessário fornecer senha ou ID do Google.');
    }

    // 4. Chamar o repositório para salvar o usuário
    const newUser = await repositorioCriacaoConta.registerUser(userForDb);
    return { message: 'Usuário registrado com sucesso!', user: newUser };
};

const loginUser = async (loginData) => {
    const { email, password } = loginData;
    console.log(`Serviço: Tentativa de login com o email: ${email}`);

    // 1. Buscar o usuário pelo email
    const user = await repositorioCriacaoConta.findUserByEmail(email);
    if (!user) {
        console.warn(`Serviço: Tentativa de login falhou. Email não encontrado: ${email}`);
        throw new Error('Credenciais inválidas.'); // Mensagem genérica por segurança
    }

    // TODO: Adicionar lógica para login com Google (verificar se a conta é só google, etc)

    // 2. Verificar a senha (apenas se o usuário tiver uma senha definida)
    if (!user.password_hash) {
        // Este caso pode ocorrer se um usuário tentou logar com senha em uma conta criada com Google
        console.warn(`Serviço: Tentativa de login com senha em uma conta sem senha definida (email: ${email})`);
        throw new Error('Esta conta foi criada usando um provedor social. Tente logar com o Google.');
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        console.warn(`Serviço: Tentativa de login falhou. Senha incorreta para o email: ${email}`);
        throw new Error('Credenciais inválidas.'); // Mensagem genérica por segurança
    }

    // 3. Gerar o token JWT
    const payload = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Token expira em 1 hora
    console.log(`Serviço: Login bem-sucedido e token gerado para ${email}`);

    // 4. Retornar os dados
    return {
        message: 'Login bem-sucedido!',
        token,
        user: { id: user.id, name: user.name, email: user.email },
    };
};

const servicoCriacaoConta = {
    registerUser,
    loginUser,
};

export default servicoCriacaoConta;
