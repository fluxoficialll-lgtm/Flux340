
import { pool } from '../database/pool.js';

export const interactionRepositorio = {
    /**
     * Registra uma nova interação única (ex: like) em um post.
     * Se a interação já existir, ela não faz nada.
     * @param {string} postId - O ID do post.
     * @param {string} userId - O ID do usuário que está interagindo.
     * @param {string} type - O tipo de interação (ex: 'like').
     * @returns {Promise<boolean>} Retorna true se a interação foi registrada, false caso contrário.
     */
    async recordUniqueInteraction(postId, userId, type) {
        try {
            const query = 'INSERT INTO post_interactions (post_id, user_id, interaction_type) VALUES ($1, $2, $3)';
            await pool.query(query, [postId, userId, type]);
            return true; // Inserção bem-sucedida
        } catch (error) {
            // Se o erro for de violação de chave primária (código 23505 em PostgreSQL), 
            // significa que a interação já existe. Ignoramos o erro e retornamos false.
            if (error.code === '23505') {
                return false; // Interação duplicada
            }
            throw error; // Lança outros erros
        }
    },

    /**
     * Remove uma interação de um post.
     * @param {string} postId - O ID do post.
     * @param {string} userId - O ID do usuário.
     * @param {string} type - O tipo de interação a ser removida.
     * @returns {Promise<boolean>} Retorna true se a interação foi removida, false se não existia.
     */
    async removeInteraction(postId, userId, type) {
        const query = 'DELETE FROM post_interactions WHERE post_id = $1 AND user_id = $2 AND interaction_type = $3';
        const res = await pool.query(query, [postId, userId, type]);
        // rowCount será > 0 se uma linha foi deletada.
        return res.rowCount > 0;
    }
};
