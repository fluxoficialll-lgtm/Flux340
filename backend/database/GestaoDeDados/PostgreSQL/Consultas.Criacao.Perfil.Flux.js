
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Criação.Perfil.Flux.js

import pool from '../../pool.js';

const findProfileByUserId = async (userId) => {
    console.log(`GestãoDeDados: Buscando perfil para o usuário ID: ${userId}`);
    const query = `
        SELECT 
            p.id, 
            p.username, 
            p.nickname,
            p.bio, 
            p.avatar, 
            p.website,
            p.posts_count,
            p.followers_count,
            p.following_count,
            p.user_id
        FROM user_profiles p
        WHERE p.user_id = $1
    `;
    try {
        const { rows } = await pool.query(query, [userId]);
        if (rows.length > 0) {
            console.log(`GestãoDeDados: Perfil encontrado para o usuário ${userId}.`);
            return rows[0];
        } else {
            console.log(`GestãoDeDados: Nenhum perfil encontrado para o usuário ${userId}.`);
            return null;
        }
    } catch (error) {
        console.error('GestãoDeDados: Erro ao buscar perfil por user_id:', error);
        throw new Error('Erro ao buscar perfil no banco de dados.');
    }
};

const updateProfileByUserId = async (userId, profileData) => {
    // CORREÇÃO: O frontend envia 'photoUrl', o backend esperava 'avatar'.
    const { name, nickname, bio, photoUrl, website } = profileData;
    console.log(`GestãoDeDados: Atualizando perfil para o usuário ID: ${userId}`);
    
    const fields = [];
    const values = [];
    let paramIndex = 1;

    // CORREÇÃO: A lógica de mapeamento de 'name' e 'nickname' estava invertida.
    if (nickname !== undefined) {
        // O nickname do formulário (que é o @usuario) atualiza o campo 'username'
        fields.push(`username = $${paramIndex++}`);
        values.push(nickname);
    }
    if (name !== undefined) {
        // O name do formulário (nome de exibição) atualiza o campo 'nickname'
        fields.push(`nickname = $${paramIndex++}`);
        values.push(name);
    }
    if (bio !== undefined) {
        fields.push(`bio = $${paramIndex++}`);
        values.push(bio);
    }
    // CORREÇÃO: Usar 'photoUrl' para atualizar o campo 'avatar'
    if (photoUrl !== undefined) {
        fields.push(`avatar = $${paramIndex++}`);
        values.push(photoUrl);
    }
    if (website !== undefined) {
        fields.push(`website = $${paramIndex++}`);
        values.push(website);
    }

    if (fields.length === 0) {
        console.log("GestãoDeDados: Nenhum campo fornecido para atualização.");
        // Se nenhum campo foi alterado, retorna o perfil existente para evitar erros.
        return findProfileByUserId(userId);
    }

    values.push(userId);
    const query = `
        UPDATE user_profiles
        SET ${fields.join(', ')}
        WHERE user_id = $${paramIndex}
        RETURNING *;
    `;

    try {
        const { rows } = await pool.query(query, values);
        console.log(`GestãoDeDados: Perfil do usuário ${userId} atualizado com sucesso.`);
        // Garante que o perfil atualizado seja retornado.
        return rows[0];
    } catch (error) {
        console.error('GestãoDeDados: Erro ao atualizar o perfil:', error);
        // Tratamento de erro para nome de usuário duplicado
        if (error.code === '23505' && error.constraint === 'user_profiles_username_key') {
            throw new Error('O nome de usuário já está em uso.');
        }
        throw new Error('Erro ao atualizar o perfil no banco de dados.');
    }
};

const deleteProfileByUserId = async (userId) => {
    console.log(`GestãoDeDados: Deletando perfil para o usuário ID: ${userId}`);
    const query = 'DELETE FROM user_profiles WHERE user_id = $1;';
    try {
        await pool.query(query, [userId]);
        console.log(`GestãoDeDados: Perfil do usuário ${userId} deletado com sucesso.`);
        return { message: 'Perfil deletado com sucesso.' };
    } catch (error) {
        console.error('GestãoDeDados: Erro ao deletar o perfil:', error);
        throw new Error('Erro ao deletar o perfil no banco de dados.');
    }
};

const consultasCriacaoPerfil = {
    findProfileByUserId,
    updateProfileByUserId,
    deleteProfileByUserId,
};

export default consultasCriacaoPerfil;
