
import { pool } from '../../pool.js';

const create = async (commentData) => {
    const { reel_id, user_id, content } = commentData;
    const query = `
        INSERT INTO comments (post_id, author_id, content, created_at)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [reel_id, user_id, content]);
    return rows[0];
};

const findByReelId = async (reelId, { limit = 10, offset = 0 }) => {
    const query = `
        SELECT c.*, u.username, u.avatar_url
        FROM comments c
        JOIN users u ON c.author_id = u.id
        WHERE c.post_id = $1
        ORDER BY c.created_at DESC
        LIMIT $2 OFFSET $3;
    `;
    const { rows } = await pool.query(query, [reelId, limit, offset]);
    return rows;
};

const findById = async (commentId) => {
    const query = `
        SELECT * FROM comments WHERE id = $1;
    `;
    const { rows } = await pool.query(query, [commentId]);
    return rows[0];
};

const update = async (commentId, updates) => {
    const { content } = updates;
    const query = `
        UPDATE comments
        SET content = $1
        WHERE id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [content, commentId]);
    return rows[0];
};

const remove = async (commentId) => {
    const { rowCount } = await pool.query('DELETE FROM comments WHERE id = $1', [commentId]);
    return rowCount > 0;
};

export default {
    create,
    findByReelId,
    findById,
    update,
    remove
};
