
import consultasCriacaoConta from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Conta.Flux.js';
import ServicoLog from '../ServicosBackend/Servico.Logs.Backend.js';

const registerUser = async (userData) => {
    const contexto = "Repositorio.CriacaoConta.registerUser";
    ServicoLog.info(contexto, 'Chamando camada de gestão de dados para registrar usuário.', { email: userData.email });
    try {
        const result = await consultasCriacaoConta.registerUser(userData);
        ServicoLog.info(contexto, 'Usuário registrado com sucesso na gestão de dados.', { userId: result.id });
        return result;
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao registrar usuário na gestão de dados', error);
        throw error;
    }
};

const findUserByEmail = async (email) => {
    const contexto = "Repositorio.CriacaoConta.findUserByEmail";
    ServicoLog.info(contexto, 'Chamando camada de gestão de dados para buscar usuário por email.', { email });
    try {
        const result = await consultasCriacaoConta.findUserByEmail(email);
        ServicoLog.info(contexto, result ? 'Usuário encontrado.' : 'Usuário não encontrado.', { email });
        return result;
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao buscar usuário por email na gestão de dados', error);
        throw error;
    }
};

const findUserByGoogleId = async (googleId) => {
    const contexto = "Repositorio.CriacaoConta.findUserByGoogleId";
    ServicoLog.info(contexto, 'Chamando camada de gestão de dados para buscar usuário por Google ID.', { googleId });
    try {
        const result = await consultasCriacaoConta.findUserByGoogleId(googleId);
        ServicoLog.info(contexto, result ? 'Usuário encontrado.' : 'Usuário não encontrado.', { googleId });
        return result;
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao buscar usuário por Google ID na gestão de dados', error);
        throw error;
    }
};

const repositorioCriacaoConta = {
    registerUser,
    findUserByEmail,
    findUserByGoogleId,
};

export default repositorioCriacaoConta;
