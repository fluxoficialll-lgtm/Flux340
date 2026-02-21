
import { pool } from '../database/pool.js';

// Mapeia uma linha do DB para um objeto de conteúdo limpo
const toContentObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        userId: row.user_id,
        parentId: row.parent_id,
        body: row.body,
        status: row.status,
        visibility: row.visibility,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
};

export const contentRepositorio = {
    /**
     * Cria uma nova publicação.
     * @param {object} data - Dados da publicação.
     * @param {string} data.userId - ID do autor.
     * @param {string} data.body - Corpo da publicação.
     * @param {string} [data.parentId] - ID da publicação pai (se for uma resposta).
     * @returns {Promise<object>} A publicação criada.
     */
    async create({ userId, body, parentId = null }) {
        const query = `
            INSERT INTO content (user_id, body, parent_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const res = await pool.query(query, [userId, body, parentId]);
        return toContentObject(res.rows[0]);
    },

    /**
     * Busca uma publicação pelo ID.
     * @param {string} id - ID da publicação.
     * @returns {Promise<object|null>} A publicação ou null.
     */
    async findById(id) {
        const res = await pool.query('SELECT * FROM content WHERE id = $1', [id]);
        return toContentObject(res.rows[0]);
    },

    /**
     * Busca todas as publicações de um usuário.
     * @param {string} userId - ID do usuário.
     * @returns {Promise<object[]>} Uma lista de publicações.
     */
    async findByUserId(userId) {
        const res = await pool.query('SELECT * FROM content WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
        return res.rows.map(toContentObject);
    },

    /**
     * Calcula estatísticas de conteúdo para um usuário.
     * @param {string} userId - ID do usuário.
     * @returns {Promise<object>} Um objeto com as estatísticas.
     */
    async getUserContentStats(userId) {
        const query = `
            SELECT
                -- Total de publicações originais (não são respostas)
                COUNT(*) FILTER (WHERE user_id = $1 AND parent_id IS NULL) AS total_posts,
                
                -- Total de remixes recebidos em suas publicações
                (SELECT COUNT(*) FROM content WHERE parent_id IN (SELECT id FROM content WHERE user_id = $1)) AS total_remixes_received
            FROM content;
        `;
        
        const res = await pool.query(query, [userId]);
        const stats = res.rows[0];

        return {
            totalPosts: parseInt(stats.total_posts, 10) || 0,
            totalRemixesReceived: parseInt(stats.total_remixes_received, 10) || 0,
        };
    }
};