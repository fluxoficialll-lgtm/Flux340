
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Criação.Perfil.Flux.js

import pool from '../../pool.js';

// NOTA: Este arquivo assume que um perfil é criado automaticamente quando um usuário é criado.
// Portanto, não há uma função 'createProfile' separada aqui.
// A criação pode ser gerenciada por um gatilho no banco de dados ou no serviço de criação de usuário.

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
    const { username, nickname, bio, avatar, website } = profileData;
    console.log(`GestãoDeDados: Atualizando perfil para o usuário ID: ${userId}`);
    
    // Constrói a query dinamicamente para atualizar apenas os campos fornecidos
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (username !== undefined) {
        fields.push(`username = $${paramIndex++}`);
        values.push(username);
    }
    if (nickname !== undefined) {
        fields.push(`nickname = $${paramIndex++}`);
        values.push(nickname);
    }
    if (bio !== undefined) {
        fields.push(`bio = $${paramIndex++}`);
        values.push(bio);
    }
    if (avatar !== undefined) {
        fields.push(`avatar = $${paramIndex++}`);
        values.push(avatar);
    }
    if (website !== undefined) {
        fields.push(`website = $${paramIndex++}`);
        values.push(website);
    }

    if (fields.length === 0) {
        console.log("GestãoDeDados: Nenhum campo fornecido para atualização.");
        return findProfileByUserId(userId); // Retorna o perfil atual sem alterações
    }

    values.push(userId); // Adiciona o userId como último parâmetro para a cláusula WHERE
    const query = `
        UPDATE user_profiles
        SET ${fields.join(', ')}
        WHERE user_id = $${paramIndex}
        RETURNING *;
    `;

    try {
        const { rows } = await pool.query(query, values);
        console.log(`GestãoDeDados: Perfil do usuário ${userId} atualizado com sucesso.`);
        return rows[0];
    } catch (error) {
        console.error('GestãoDeDados: Erro ao atualizar o perfil:', error);
        if (error.code === '23505') { // Conflito de unicidade (ex: username já em uso)
            throw new Error('O nome de usuário já está em uso.');
        }
        throw new Error('Erro ao atualizar o perfil no banco de dados.');
    }
};

const deleteProfileByUserId = async (userId) => {
    console.log(`GestãoDeDados: Deletando perfil para o usuário ID: ${userId}`);
    // CUIDADO: Isso deleta o perfil, mas não o usuário. A política de negócio
    // deve garantir que isso seja o comportamento desejado.
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
