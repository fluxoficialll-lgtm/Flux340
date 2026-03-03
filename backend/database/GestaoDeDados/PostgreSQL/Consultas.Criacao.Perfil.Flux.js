import pool from '../../pool.js';

const ConsultarPerfilPorIdUsuario = async (userId) => {
    // ... (código existente sem alterações)
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
            profile_completed = $7, // Campo adicionado
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
        profile_completed, // Valor adicionado
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
    // ... (código existente sem alterações)
};

const ConsultarUsuarioPorId = async (userId) => {
    // ... (código existente sem alterações)
};

export default {
    ConsultarPerfilPorIdUsuario,
    AtualizarPerfilPorIdUsuario,
    DeletarPerfilPorIdUsuario,
    ConsultarUsuarioPorId
};