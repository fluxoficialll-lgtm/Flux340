
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Publicacao.Comentarios.Marketplace.js

export const queries = {
    createComment: `
        INSERT INTO marketplace_comments (item_id, user_id, content)
        VALUES ($1, $2, $3)
        RETURNING *;
    `,
    getCommentsByItemId: `
        SELECT mc.*, u.username, u.profile_pic
        FROM marketplace_comments mc
        JOIN users u ON mc.user_id = u.id
        WHERE mc.item_id = $1
        ORDER BY mc.created_at DESC;
    `,
    updateComment: `
        UPDATE marketplace_comments
        SET content = $1, updated_at = CURRENT_TIMESTAMP
        WHERE id = $2 AND user_id = $3
        RETURNING *;
    `,
    deleteComment: `
        DELETE FROM marketplace_comments
        WHERE id = $1 AND user_id = $2
        RETURNING id;
    `,
    findCommentById: `
        SELECT * FROM marketplace_comments WHERE id = $1;
    `,
};
