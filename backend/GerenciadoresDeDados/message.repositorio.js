
import { pool } from '../database/pool.js';
import { gerarId, ID_PREFIX } from '../ServiçosBackEnd/FabricaDeIDS.js';
import { conversationRepositorio } from './conversation.repositorio.js';

const toMessageObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        conversationId: row.conversation_id,
        senderId: row.sender_id,
        content: row.content,
        isEdited: row.is_edited,
        createdAt: row.created_at,
        deletedBy: row.deleted_by,
        // Campos do join com a tabela users
        sender: {
            name: row.sender_name,
            profilePictureUrl: row.sender_profile_picture_url
        }
    };
};

export const messageRepositorio = {

    /**
     * Cria uma nova mensagem em uma conversa.
     */
    async create(senderId, conversationId, content) {
        await pool.query('BEGIN');
        try {
            const messageId = gerarId(ID_PREFIX.MENSAGEM);
            const query = 'INSERT INTO messages (id, conversation_id, sender_id, content) VALUES ($1, $2, $3, $4) RETURNING *';
            const res = await pool.query(query, [messageId, conversationId, senderId, content]);
            
            // Atualiza o timestamp da conversa para refletir a nova atividade
            await conversationRepositorio.updateLastMessageAt(conversationId);

            await pool.query('COMMIT');
            const newMessage = await this.findById(messageId); // Busca para incluir dados do sender
            return newMessage;

        } catch (e) {
            await pool.query('ROLLBACK');
            throw e;
        }
    },

    /**
     * Busca uma mensagem pelo seu ID, incluindo informações do remetente.
     */
    async findById(id) {
        const query = `
            SELECT m.*, u.name as sender_name, u.profile_picture_url as sender_profile_picture_url
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.id = $1
        `;
        const res = await pool.query(query, [id]);
        return toMessageObject(res.rows[0]);
    },

    /**
     * Busca todas as mensagens de uma conversa com paginação.
     */
    async findByConversationId(conversationId, userId, limit = 50, offset = 0) {
        const query = `
            SELECT m.*, u.name as sender_name, u.profile_picture_url as sender_profile_picture_url
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.conversation_id = $1 
              -- Filtra mensagens que o usuário não tenha deletado para si
              AND NOT(m.deleted_by @> jsonb_build_array($2::text))
            ORDER BY m.created_at DESC
            LIMIT $3 OFFSET $4
        `;
        const res = await pool.query(query, [conversationId, userId, limit, offset]);
        // Retorna em ordem cronológica (mais antigas primeiro)
        return res.rows.map(toMessageObject).reverse();
    },
    
    /**
     * Marca mensagens como deletadas para um usuário ou para todos.
     */
    async deleteMessages(messageIds, userId, targetAll) {
        if (targetAll) {
            // Exclusão física para todos
            const query = 'DELETE FROM messages WHERE id = ANY($1::varchar[])';
            await pool.query(query, [messageIds]);
        } else {
            // Exclusão lógica (soft delete) para o usuário que solicitou
            const query = `
                UPDATE messages
                SET deleted_by = deleted_by || jsonb_build_array($1::text)
                WHERE id = ANY($2::varchar[])
                  -- Garante que o ID não seja adicionado duas vezes
                  AND NOT(deleted_by @> jsonb_build_array($1::text));
            `;
            await pool.query(query, [userId, messageIds]);
        }
    }
};