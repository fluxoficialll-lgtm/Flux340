
// backend/Repositorios/Repositorio.Publicacao.Feed.js
import pool from '../database/pool.js';

const create = async (postData) => {
    const { content, author_id, mediaUrl, parentPostId, type, pollOptions, ctaLink, ctaText } = postData;
    const query = `
        INSERT INTO posts (author_id, content, media_url, parent_post_id, type, poll_options, cta_link, cta_text)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    `;
    const values = [author_id, content, mediaUrl, parentPostId, type || 'text', JSON.stringify(pollOptions || null), ctaLink, ctaText];
    const { rows } = await pool.query(query, values);
    return rows[0];
};

const findAll = async ({ limit = 10, cursor }) => {
    const params = [parseInt(limit, 10) || 10];
    let cursorClause = '';

    if (cursor) {
        cursorClause = 'AND p.id < $2';
        params.push(parseInt(cursor, 10));
    }

    const query = `
        SELECT p.*, u.username, u.avatar_url 
        FROM posts p
        LEFT JOIN users u ON p.author_id = u.id
        WHERE p.parent_post_id IS NULL ${cursorClause}
        ORDER BY p.id DESC
        LIMIT $1;
    `;
    
    const { rows } = await pool.query(query, params);

    let nextCursor = null;
    if (rows.length === (parseInt(limit, 10) || 10)) {
        nextCursor = rows[rows.length - 1].id;
    }

    return { data: rows, nextCursor };
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
