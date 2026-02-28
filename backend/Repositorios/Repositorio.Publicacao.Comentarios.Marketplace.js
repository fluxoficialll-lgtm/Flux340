
// backend/Repositorios/Repositorio.Publicacao.Comentarios.Marketplace.js

import pool from '../database/pool.js';
import { queries } from '../database/GestãoDeDados/PostgreSQL/Consultas.Publicacao.Comentarios.Marketplace.js';

async function createComment(itemId, userId, content) {
    const { rows } = await pool.query(queries.createComment, [itemId, userId, content]);
    return rows[0];
}

async function getCommentsByItemId(itemId) {
    const { rows } = await pool.query(queries.getCommentsByItemId, [itemId]);
    return rows;
}

async function updateComment(commentId, userId, content) {
    const { rows } = await pool.query(queries.updateComment, [content, commentId, userId]);
    return rows[0];
}

async function deleteComment(commentId, userId) {
    const { rows } = await pool.query(queries.deleteComment, [commentId, userId]);
    return rows[0];
}

async function findCommentById(commentId) {
    const { rows } = await pool.query(queries.findCommentById, [commentId]);
    return rows[0];
}

export const RepositorioComentariosMarketplace = {
    createComment,
    getCommentsByItemId,
    updateComment,
    deleteComment,
    findCommentById,
};
