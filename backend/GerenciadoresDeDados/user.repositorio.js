
import { pool } from '../database/pool.js';

// Mapeia uma linha do banco de dados para um objeto de usuário mais limpo
const toUserObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name,
        username: row.handle,
        email: row.email,
        googleId: row.google_id,
        profilePictureUrl: row.profile_picture_url,
        coverPhotoUrl: row.cover_photo_url,
        bio: row.bio,
        location: row.location,
        website: row.website,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
};

// Mapeia uma linha para um objeto de usuário simplificado para rankings
const toRankingUserObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name,
        username: row.handle,
        profilePictureUrl: row.profile_picture_url,
        followerCount: parseInt(row.follower_count, 10) || 0
    };
};

export const userRepositorio = {
    /**
     * Busca todos os usuários no banco de dados.
     * @returns {Promise<object[]>} Uma lista de todos os usuários.
     */
    async getAll() {
        const res = await pool.query('SELECT * FROM users ORDER BY created_at DESC');
        return res.rows.map(toUserObject);
    },

    /**
     * Busca usuários cujo nome ou handle correspondem a uma consulta (case-insensitive).
     * @param {string} query - O termo de busca.
     * @returns {Promise<object[]>} Uma lista de usuários correspondentes.
     */
    async search(query) {
        const res = await pool.query(
            'SELECT * FROM users WHERE name ILIKE $1 OR handle ILIKE $1 ORDER BY name',
            [`%${query}%`]
        );
        return res.rows.map(toUserObject);
    },

    /**
     * Encontra um usuário pelo seu ID.
     * @param {string} id - O ID do usuário.
     * @returns {Promise<object|null>} O objeto do usuário ou null se não for encontrado.
     */
    async findById(id) {
        const res = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        return toUserObject(res.rows[0]);
    },

    /**
     * Encontra um usuário pelo seu e-mail.
     * @param {string} email - O e-mail do usuário.
     * @returns {Promise<object|null>} O objeto do usuário ou null se não for encontrado.
     */
    async findByEmail(email) {
        const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return toUserObject(res.rows[0]);
    },

    /**
     * Encontra um usuário pelo seu handle/username.
     * @param {string} handle - O handle do usuário.
     * @returns {Promise<object|null>} O objeto do usuário ou null se não for encontrado.
     */
    async findByHandle(handle) {
        const res = await pool.query('SELECT * FROM users WHERE handle = $1', [handle]);
        return toUserObject(res.rows[0]);
    },

    /**
     * Atualiza os dados do perfil de um usuário.
     * @param {string} email - O e-mail do usuário a ser atualizado.
     * @param {object} updates - Um objeto com os campos a serem atualizados.
     * @returns {Promise<object|null>} O usuário atualizado.
     */
    async update(email, updates) {
        const user = await this.findByEmail(email);
        if (!user) return null;

        const fields = Object.keys(updates);
        const values = Object.values(updates);
        const setClause = fields.map((field, index) => `"${field}" = $${index + 1}`).join(', ');

        const query = `UPDATE users SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE email = $${fields.length + 1} RETURNING *`;
        const queryValues = [...values, email];

        const res = await pool.query(query, queryValues);
        return toUserObject(res.rows[0]);
    },

    /**
     * Retorna o ranking de usuários por número de seguidores.
     * @param {object} options - Opções de consulta.
     * @param {number} [options.limit=10] - O número de usuários a serem retornados.
     * @returns {Promise<object[]>} Uma lista de usuários para o ranking.
     */
    async getFollowerRanking({ limit = 10 } = {}) {
        const query = `
            SELECT id, name, handle, profile_picture_url, follower_count
            FROM users
            WHERE follower_count > 0
            ORDER BY follower_count DESC, name ASC
            LIMIT $1;
        `;
        const res = await pool.query(query, [limit]);
        return res.rows.map(toRankingUserObject);
    }
};