
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Gestao.Perfil.js

import { pool } from '../../pool.js';

const updateUser = async (id, userData) => {
    const { name, bio, profile_image } = userData;

    // Verifica quais campos foram fornecidos e constrói a consulta dinamicamente
    const fields = [];
    const values = [];
    let queryIndex = 1;

    if (name) {
        fields.push(`name = $${queryIndex++}`);
        values.push(name);
    }
    if (bio) {
        fields.push(`bio = $${queryIndex++}`);
        values.push(bio);
    }
    if (profile_image) {
        fields.push(`profile_image = $${queryIndex++}`);
        values.push(profile_image);
    }

    // Se nenhum campo foi fornecido para atualização, retorna um erro
    if (fields.length === 0) {
        throw new Error('Nenhum campo para atualizar foi fornecido.');
    }

    values.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${queryIndex} RETURNING *`;

    try {
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            throw new Error('Usuário não encontrado.');
        }
        console.log('GestãoDeDados: Usuário atualizado com sucesso.');
        return rows[0];
    } catch (error) {
        console.error('GestãoDeDados: Erro ao atualizar usuário:', error);
        throw new Error('Erro ao atualizar usuário no banco de dados.');
    }
};

const consultasGestaoPerfil = {
    updateUser,
};

export default consultasGestaoPerfil;
