
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Publicacao.Comentarios.Feed.js
import pool from '../../pool.js';

const criar = async (commentData) => {
    const { post_id, user_id, content } = commentData;
    const query = `
        INSERT INTO feed_comments (post_id, user_id, content, created_at, updated_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [post_id, user_id, content]);
    return rows[0];
};

const buscarPorPostId = async (postId, { limit = 10, offset = 0 }) => {
    const query = `
        SELECT c.*, u.username, u.avatar_url
        FROM feed_comments c
        JOIN users u ON c.user_id = u.id
        WHERE c.post_id = $1
        ORDER BY c.created_at DESC
        LIMIT $2 OFFSET $3;
    `;
    const { rows } = await pool.query(query, [postId, limit, offset]);
    return rows;
};

const buscarPorId = async (commentId) => {
    const query = `
        SELECT * FROM feed_comments WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [commentId]);
    return rows[0];
};

const atualizar = async (commentId, updates) => {
    const { content } = updates;
    const query = `
        UPDATE feed_comments
        SET content = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [content, commentId]);
    return rows[0];
};

const remover = async (commentId) => {
    const { rowCount } = await pool.query('DELETE FROM feed_comments WHERE id = $1', [commentId]);
    return rowCount > 0;
};

export default {
    criar,
    buscarPorPostId,
    buscarPorId,
    atualizar,
    remover
};
