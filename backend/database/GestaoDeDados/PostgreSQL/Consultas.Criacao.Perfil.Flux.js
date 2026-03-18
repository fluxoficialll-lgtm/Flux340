
import pool from '../../pool.js';

const garantirPerfil = async (userId, profileData) => {
    const client = await pool.connect();
    const contexto = "[Consulta SQL] garantirPerfil";
    console.log(`${contexto} para o usuário: ${userId}`);

    try {
        await client.query('BEGIN');

        const { name, nickname, bio, photo_url, website, is_private, profile_completed } = profileData;

        // Tenta ATUALIZAR o perfil existente
        const updateQuery = `
            UPDATE user_profiles
            SET name = $1, nickname = $2, bio = $3, photo_url = $4, website = $5, is_private = $6, profile_completed = $7, updated_at = NOW()
            WHERE user_id = $8
            RETURNING *;
        `;
        const updateValues = [name, nickname, bio, photo_url, website, is_private, profile_completed, userId];
        const res = await client.query(updateQuery, updateValues);

        let userProfile;
        if (res.rows.length > 0) {
            userProfile = res.rows[0];
            console.log(`${contexto}: Perfil ATUALIZADO para o usuário ${userId}.`);
        } else {
            // Se não atualizou, CRIE um novo
            const insertQuery = `
                INSERT INTO user_profiles (user_id, name, nickname, bio, photo_url, website, is_private, profile_completed)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `;
            const insertValues = [userId, name, nickname, bio, photo_url, website, is_private, profile_completed];
            const insertRes = await client.query(insertQuery, insertValues);
            userProfile = insertRes.rows[0];
            console.log(`${contexto}: Perfil CRIADO para o usuário ${userId}.`);
        }

        await client.query('COMMIT');
        return userProfile;

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`${contexto}: Erro na operação de upsert para o usuário ${userId}:`, error);
        if (error.code === '23505' && error.constraint === 'user_profiles_nickname_key') {
            throw new Error(`O apelido '${profileData.nickname}' já está em uso.`);
        }
        throw new Error('Erro no banco de dados ao tentar criar ou atualizar o perfil.');
    } finally {
        client.release();
    }
};


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


export default {
    garantirPerfil,
    ConsultarPerfilPorIdUsuario,
    DeletarPerfilPorIdUsuario,
};
