import pool from '../database/pool.js';
import queries from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Perfil.Flux.js';

const PossibilidadeAtualizarPerfil = async (userId, profileData) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        const { name, nickname, bio, photoUrl, website, isPrivate, profile_completed } = profileData;

        // Tenta ATUALIZAR o perfil existente
        const updateQuery = `
            UPDATE user_profiles
            SET
                name = $1, nickname = $2, bio = $3, photo_url = $4, website = $5, 
                is_private = $6, profile_completed = $7, updated_at = NOW()
            WHERE user_id = $8
            RETURNING *;
        `;
        const updateValues = [name, nickname, bio, photoUrl, website, isPrivate, profile_completed, userId];
        const res = await client.query(updateQuery, updateValues);

        let userProfile;
        // Se a atualização funcionou (afetou 1 linha), use esse resultado
        if (res.rows.length > 0) {
            userProfile = res.rows[0];
            console.log(`[Repositório] Perfil para o usuário ${userId} foi ATUALIZADO.`);
        } else {
            // Se a atualização não afetou nenhuma linha (perfil não existe), CRIE um novo
            const insertQuery = `
                INSERT INTO user_profiles (user_id, name, nickname, bio, photo_url, website, is_private, profile_completed)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING *;
            `;
            const insertValues = [userId, name, nickname, bio, photoUrl, website, isPrivate, profile_completed];
            const insertRes = await client.query(insertQuery, insertValues);
            userProfile = insertRes.rows[0];
            console.log(`[Repositório] Perfil para o usuário ${userId} foi CRIADO.`);
        }

        await client.query('COMMIT');
        return userProfile;

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(`[Repositório] Erro na operação de upsert do perfil para o usuário ${userId}:`, error);
        if (error.code === '23505' && error.constraint === 'user_profiles_nickname_key') {
            throw new Error(`O nickname '${profileData.nickname}' já está em uso.`);
        }
        throw new Error('Erro no repositório ao tentar criar ou atualizar o perfil.');
    } finally {
        client.release();
    }
};


const PossibilidadeBuscarUsuarioPorId = async (userId) => {
    return await queries.ConsultarPerfilPorIdUsuario(userId);
};

export default {
    PossibilidadeAtualizarPerfil,
    PossibilidadeBuscarUsuarioPorId,
};