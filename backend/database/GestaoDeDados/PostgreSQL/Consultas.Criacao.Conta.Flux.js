
import pool from '../../pool.js';
import ServicoLog from '../../../ServicosBackend/Servico.Logs.Backend.js';

const registerUser = async (userData) => {
    const contexto = "Consultas.CriacaoConta.registerUser";
    const { id, name, email, password_hash, google_id } = userData;
    ServicoLog.info(contexto, `Inserindo usuário ${name} com email ${email} no banco de dados.`);

    const query = `
        INSERT INTO users (id, name, email, password_hash, google_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email, google_id
    `;
    const values = [id, name, email, password_hash, google_id];
    ServicoLog.debug(contexto, "Executando query", { query, values: [id, name, email, '[redacted]', google_id] });

    try {
        const { rows } = await pool.query(query, values);
        const newUser = rows[0];
        ServicoLog.info(contexto, 'Usuário inserido com sucesso.', { userId: newUser.id });
        return newUser;
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao registrar usuário', { code: error.code, detail: error.detail });
        if (error.code === '23505') {
            throw new Error('O email ou ID do Google fornecido já está em uso.');
        }
        throw new Error('Erro ao registrar usuário no banco de dados');
    }
};

const findUserByEmail = async (email) => {
    const contexto = "Consultas.CriacaoConta.findUserByEmail";
    ServicoLog.info(contexto, `Buscando usuário com o email: ${email}`);
    const query = 'SELECT * FROM users WHERE email = $1';
    ServicoLog.debug(contexto, "Executando query", { query, email });

    try {
        const { rows } = await pool.query(query, [email]);
        const user = rows[0];
        if (user) {
            ServicoLog.info(contexto, 'Usuário encontrado.', { userId: user.id });
        } else {
            ServicoLog.info(contexto, 'Nenhum usuário encontrado com esse email.');
        }
        return user;
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao buscar usuário por email', error);
        throw new Error('Erro ao buscar usuário no banco de dados');
    }
};

const findUserByGoogleId = async (googleId) => {
    const contexto = "Consultas.CriacaoConta.findUserByGoogleId";
    ServicoLog.info(contexto, `Buscando usuário com o Google ID: ${googleId}`);
    const query = 'SELECT * FROM users WHERE google_id = $1';
    ServicoLog.debug(contexto, "Executando query", { query });

    try {
        const { rows } = await pool.query(query, [googleId]);
        const user = rows[0];
        if (user) {
            ServicoLog.info(contexto, 'Usuário encontrado pelo Google ID.', { userId: user.id });
        } else {
            ServicoLog.info(contexto, 'Nenhum usuário encontrado com esse Google ID.');
        }
        return user;
    } catch (error) {
        ServicoLog.erro(contexto, 'Erro ao buscar usuário por Google ID', error);
        throw new Error('Erro ao buscar usuário no banco de dados');
    }
};

const consultasCriacaoConta = {
    registerUser,
    findUserByEmail,
    findUserByGoogleId,
};

export default consultasCriacaoConta;
