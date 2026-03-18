
import repositorioCriacaoConta from '../Repositorios/Repositorio.Criacao.Conta.Flux.js';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import ServicoLog from './Servico.Logs.Backend.js';
import Conta from '../models/Models.Estrutura.Conta.Flux.js';

const JWT_SECRET = process.env.JWT_SECRET || 'seu_segredo_jwt_super_secreto';

const registrarUsuario = async (dadosUsuario) => {
    const contexto = "Servico.CriacaoConta.registrarUsuario";
    const { nome, email, senha, google_id } = dadosUsuario;
    ServicoLog.info(contexto, `Iniciando registro para o email: ${email}`);

    try {
        const conta = new Conta({ id: uuidv4(), nome, email, senha, google_id });

        if (!senha && !google_id) {
            ServicoLog.warn(contexto, 'Método de registro inválido. Faltando senha ou ID do Google.');
            throw new Error('Método de registro inválido. É necessário fornecer senha ou ID do Google.');
        }

        await conta.criptografarSenha();

        const novoUsuario = await repositorioCriacaoConta.registerUser(conta.paraBancoDeDados());
        const contaSalva = Conta.deBancoDeDados(novoUsuario);

        ServicoLog.info(contexto, "Usuário registrado com sucesso no repositório", { userId: contaSalva.id });
        return { message: 'Usuário registrado com sucesso!', user: contaSalva.paraRespostaHttp() };
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao registrar usuário', error);
        throw error;
    }
};

const loginUsuario = async (dadosLogin) => {
    const contexto = "Servico.CriacaoConta.loginUsuario";
    const { email, senha } = dadosLogin;
    ServicoLog.info(contexto, `Tentativa de login com o email: ${email}`);

    try {
        const usuarioDb = await repositorioCriacaoConta.findUserByEmail(email);
        if (!usuarioDb) {
            ServicoLog.warn(contexto, `Tentativa de login falhou. Email não encontrado: ${email}`);
            throw new Error('Credenciais inválidas.');
        }

        const conta = Conta.deBancoDeDados(usuarioDb);

        if (!conta.senha_hash) {
            ServicoLog.warn(contexto, `Tentativa de login com senha em uma conta Google (email: ${email})`);
            throw new Error('Esta conta foi criada usando um provedor social. Tente logar com o Google.');
        }

        const isMatch = await bcrypt.compare(password, conta.senha_hash);
        if (!isMatch) {
            ServicoLog.warn(contexto, `Tentativa de login falhou. Senha incorreta para o email: ${email}`);
            throw new Error('Credenciais inválidas.');
        }

        const payload = { user: conta.paraRespostaHttp() };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        ServicoLog.info(contexto, `Login bem-sucedido e token gerado para ${email}`);

        return {
            message: 'Login bem-sucedido!',
            token,
            user: conta.paraRespostaHttp(),
        };
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro durante o processo de login', { email, message: error.message });
        throw error;
    }
};

const encontrarOuCriarUsuario = async ({ nome, email, google_id }) => {
    const contexto = "Servico.CriacaoConta.encontrarOuCriarUsuario";
    ServicoLog.info(contexto, `Procurando ou criando usuário com Google ID: ${google_id}`);

    try {
        let usuarioDb = await repositorioCriacaoConta.findUserByGoogleId(google_id);
        if (usuarioDb) {
            ServicoLog.info(contexto, 'Usuário encontrado com Google ID.', { userId: usuarioDb.id });
            const conta = Conta.deBancoDeDados(usuarioDb);
            return { user: conta.paraRespostaHttp(), isNewUser: false };
        }

        ServicoLog.info(contexto, 'Usuário com Google ID não encontrado. Criando um novo.');
        const novaConta = new Conta({ id: uuidv4(), nome, email, google_id });
        
        usuarioDb = await repositorioCriacaoConta.registerUser(novaConta.paraBancoDeDados());
        const contaSalva = Conta.deBancoDeDados(usuarioDb);
        ServicoLog.info(contexto, 'Novo usuário criado com sucesso através do Google Auth.', { userId: contaSalva.id });

        return { user: contaSalva.paraRespostaHttp(), isNewUser: true };
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao procurar ou criar usuário com Google ID', error);
        throw error;
    }
};

const servicoCriacaoConta = {
    registrarUsuario,
    loginUsuario,
    encontrarOuCriarUsuario,
};

export default servicoCriacaoConta;
