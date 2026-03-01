
// backend/Repositorios/Repositorio.Publicacao.Feed.js
import pool from '../database/pool.js';

const create = async (postData) => {
    const { content, userId, mediaUrl, parentPostId, type, pollOptions, ctaLink, ctaText } = postData;
    const query = `
        INSERT INTO posts (author_id, content, media_url, parent_post_id, type, poll_options, cta_link, cta_text)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const values = [userId, content, mediaUrl, parentPostId, type || 'text', JSON.stringify(pollOptions || null), ctaLink, ctaText];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const findAll = async ({ limit = 10, cursor }) => {
    // Lógica de cursor a ser implementada posteriormente
    const query = `
        SELECT p.*, u.username, u.avatar_url 
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.parent_post_id IS NULL
        ORDER BY p.created_at DESC
        LIMIT $1;
    `;
    const { rows } = await pool.query(query, [limit]);
    return rows;
};

const findById = async (postId) => {
    const query = `
        SELECT p.*, u.username, u.avatar_url 
        FROM posts p
        JOIN users u ON p.author_id = u.id
        WHERE p.id = $1;
    `;
    const { rows } = await pool.query(query, [postId]);
    return rows[0];
};

const update = async (postId, postData) => {
    const { content } = postData;
    const query = `
        UPDATE posts
        SET content = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *;
    `;
    const { rows } = await pool.query(query, [content, postId]);
    return rows[0];
};

const remove = async (postId) => {
    const { rowCount } = await pool.query('DELETE FROM posts WHERE id = $1', [postId]);
    return rowCount > 0;
};

export default {
    create,
    findAll,
    findById,
    update,
    remove,
};
