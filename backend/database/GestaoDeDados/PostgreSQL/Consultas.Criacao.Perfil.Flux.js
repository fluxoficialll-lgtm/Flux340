
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Criação.Perfil.Flux.js

import pool from '../../pool.js';

const findProfileByUserId = async (userId) => {
    // ... (código existente)
};

const updateProfileByUserId = async (userId, profileData) => {
    const { name, nickname, bio, photoUrl, website } = profileData;
    console.log(`GestãoDeDados: Atualizando perfil para o usuário ID: ${userId}`);
    
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (nickname !== undefined) {
        fields.push(`username = $${paramIndex++}`);
        values.push(nickname);
    }
    if (name !== undefined) {
        fields.push(`nickname = $${paramIndex++}`);
        values.push(name);
    }
    if (bio !== undefined) {
        fields.push(`bio = $${paramIndex++}`);
        values.push(bio);
    }
    if (photoUrl !== undefined) {
        fields.push(`avatar = $${paramIndex++}`);
        values.push(photoUrl);
    }
    if (website !== undefined) {
        fields.push(`website = $${paramIndex++}`);
        values.push(website);
    }

    if (fields.length === 0) {
        console.log("GestãoDeDados: Nenhum campo fornecido para atualização, mas marcando perfil como completo.");
        // Mesmo que nenhum campo de dados seja alterado, o ato de submeter o formulário deve completar o perfil.
    }

    // A CORREÇÃO CRÍTICA, como você apontou.
    // Garante que o perfil seja marcado como completo na atualização.
    fields.push('perfil_completo = true');

    values.push(userId);
    const query = `
        UPDATE user_profiles
        SET ${fields.join(', ')}
        WHERE user_id = $${paramIndex}
        RETURNING *;
    `;

    try {
        const { rows } = await pool.query(query, values);
        console.log(`GestãoDeDados: Perfil do usuário ${userId} atualizado e marcado como completo.`);
        return rows[0];
    } catch (error) {
        console.error('GestãoDeDados: Erro ao atualizar o perfil:', error);
        if (error.code === '23505' && error.constraint === 'user_profiles_username_key') {
            throw new Error('O nome de usuário já está em uso.');
        }
        throw new Error('Erro ao atualizar o perfil no banco de dados.');
    }
};

const findUserById = async (userId) => {
    // Esta função foi adicionada para dar suporte à auditoria de estado no controlador.
    const query = 'SELECT id, perfil_completo FROM users WHERE id = $1';
    try {
        const { rows } = await pool.query(query, [userId]);
        return rows[0];
    } catch (error) {
        console.error('GestãoDeDados: Erro ao buscar usuário por ID:', error);
        throw new Error('Erro ao buscar usuário no banco de dados.');
    }
};

const deleteProfileByUserId = async (userId) => {
    // ... (código existente)
};

const consultasCriacaoPerfil = {
    findProfileByUserId,
    updateProfileByUserId,
    deleteProfileByUserId,
    findUserById // Exportando a nova função
};

export default consultasCriacaoPerfil;

