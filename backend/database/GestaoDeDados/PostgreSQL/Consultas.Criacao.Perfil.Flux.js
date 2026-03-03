
import pool from '../../pool.js';

const ConsultarPerfilPorIdUsuario = async (userId) => {
    console.log(`[Consulta SQL] Buscando perfil com base no ID do usuário: ${userId}`);
    const query = 'SELECT * FROM user_profiles WHERE user_id = $1';
    try {
        const { rows } = await pool.query(query, [userId]);
        if (rows.length === 0) {
            console.log(`[Consulta SQL] Nenhum perfil encontrado para o usuário: ${userId}`);
        } else {
            console.log(`[Consulta SQL] Perfil encontrado para o usuário: ${userId}`);
        }
        return rows[0];
    } catch (error) {
        console.error(`[Consulta SQL] Erro ao buscar perfil para o usuário: ${userId}`, error);
        throw new Error('Erro no banco de dados ao buscar o perfil.');
    }
};

const AtualizarPerfilPorIdUsuario = async (userId, profileData) => {
    const { name, nickname, bio, photoUrl, website, isPrivate, profile_completed } = profileData;

    const query = `
        UPDATE user_profiles
        SET
            name = $1, 
            nickname = $2, 
            bio = $3, 
            photo_url = $4,
            website = $5, 
            is_private = $6,
            profile_completed = $7,
            updated_at = NOW()
        WHERE user_id = $8
        RETURNING *;
    `;

    const values = [
        name, 
        nickname, 
        bio, 
        photoUrl, 
        website, 
        isPrivate, 
        profile_completed,
        userId
    ];

    try {
        const { rows } = await pool.query(query, values);
        console.log("[Consulta SQL] Perfil atualizado com sucesso para o usuário:", userId);
        return rows[0];
    } catch (error) {
        console.error("[Consulta SQL] Erro ao atualizar perfil para o usuário:", userId, error);
        if (error.code === '23505' && error.constraint === 'user_profiles_nickname_key') {
            throw new Error(`O nickname '${nickname}' já está em uso.`);
        }
        throw new Error('Erro no banco de dados ao atualizar o perfil.');
    }
};

const DeletarPerfilPorIdUsuario = async (userId) => {
    console.log(`[Consulta SQL] Deletando perfil com base no ID do usuário: ${userId}`);
    const query = 'DELETE FROM user_profiles WHERE user_id = $1 RETURNING *;';
    try {
        const { rows } = await pool.query(query, [userId]);
        console.log(`[Consulta SQL] Perfil deletado com sucesso para o usuário: ${userId}`);
        return rows[0];
    } catch (error) {
        console.error(`[Consulta SQL] Erro ao deletar perfil para o usuário: ${userId}`, error);
        throw new Error('Erro no banco de dados ao deletar o perfil.');
    }
};

const ConsultarUsuarioPorId = async (userId) => {
    console.log(`[Consulta SQL] Buscando usuário com ID: ${userId}`);
    const query = 'SELECT * FROM user_profiles WHERE user_id = $1';
    try {
        const { rows } = await pool.query(query, [userId]);
        return rows[0];
    } catch (error) {
        console.error(`[Consulta SQL] Erro ao buscar usuário com ID: ${userId}`, error);
        throw new Error('Erro no banco de dados ao buscar o usuário.');
    }
};


export default {
    ConsultarPerfilPorIdUsuario,
    AtualizarPerfilPorIdUsuario,
    DeletarPerfilPorIdUsuario,
    ConsultarUsuarioPorId
};
