import pool from '../../pool.js';

const findProfileByUserId = async (userId) => {
    const query = 'SELECT * FROM user_profiles WHERE user_id = $1';
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
};

const updateProfileByUserId = async (userId, profileData) => {
    const { name, nickname, bio, photoUrl, website, isPrivate } = profileData;

    const query = `
        UPDATE user_profiles
        SET
            name = $1, nickname = $2, bio = $3, photo_url = $4,
            website = $5, is_private = $6,
            updated_at = NOW()
        WHERE user_id = $7
        RETURNING *;
    `;

    const values = [
        name, nickname, bio, photoUrl, website, isPrivate,
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

const deleteProfileByUserId = async (userId) => {
    const query = 'DELETE FROM user_profiles WHERE user_id = $1 RETURNING *';
    const { rows } = await pool.query(query, [userId]);
    return rows[0];
};

const findUserById = async (userId) => {
    const query = `
        SELECT u.id, u.email
        FROM users u
        WHERE u.id = $1;
    `;
    try {
        const { rows } = await pool.query(query, [userId]);
        if (rows.length === 0) {
            console.warn(`[Consulta SQL] Tentativa de buscar usuário com ID inexistente: ${userId}`);
            return null;
        }
        return rows[0];
    } catch (error) {
        console.error(`[Consulta SQL] Erro ao buscar usuário por ID: ${userId}`, error);
        throw new Error('Erro ao buscar usuário no banco de dados.');
    }
};

export default {
    findProfileByUserId,
    updateProfileByUserId,
    deleteProfileByUserId,
    findUserById
};