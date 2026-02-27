
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Criação.Conta.Flux.js

import { pool } from '../../pool.js';

const registerUser = async (userData) => {
    // Agora extrai também o google_id, que pode ser nulo
    const { id, name, email, password_hash, google_id } = userData;
    console.log(`GestãoDeDados: Inserindo usuário ${name} com email ${email} no banco de dados.`);

    // A consulta agora inclui o campo google_id.
    const query = `
        INSERT INTO users (id, name, email, password_hash, google_id)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, name, email
    `;

    // O valor de google_id ou password_hash será undefined se não estiver em userData,
    // e o driver do banco de dados o converterá para NULL.
    const values = [id, name, email, password_hash, google_id];

    try {
        const { rows } = await pool.query(query, values);
        const newUser = rows[0];
        console.log('GestãoDeDados: Usuário inserido com sucesso.', newUser);
        return newUser;
    } catch (error) {
        console.error('GestãoDeDados: Erro ao registrar usuário:', error);
        // Trata o caso de email duplicado ou outra violação de unicidade
        if (error.code === '23505') { // Código de violação de unicidade do PostgreSQL
            throw new Error('O email ou ID do Google fornecido já está em uso.');
        }
        throw new Error('Erro ao registrar usuário no banco de dados');
    }
};

const findUserByEmail = async (email) => {
    console.log(`GestãoDeDados: Buscando usuário com o email: ${email}`);

    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = rows[0];

        if (user) {
            console.log('GestãoDeDados: Usuário encontrado.', user.email);
            return user;
        } else {
            console.log('GestãoDeDados: Nenhum usuário encontrado com esse email.');
            return null;
        }
    } catch (error) {
        console.error('GestãoDeDados: Erro ao buscar usuário por email:', error);
        throw new Error('Erro ao buscar usuário no banco de dados');
    }
};

const consultasCriacaoConta = {
    registerUser,
    findUserByEmail,
};

export default consultasCriacaoConta;
