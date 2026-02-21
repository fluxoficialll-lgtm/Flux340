
import { pool } from '../database/pool.js';
import { gerarId, ID_PREFIX } from '../ServiçosBackEnd/idService.js';

const toConversationObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        conversationType: row.conversation_type,
        groupId: row.group_id,
        createdAt: row.created_at,
        lastMessageAt: row.last_message_at,
        // Campos adicionais de joins
        name: row.name, // ex: nome do grupo ou do outro usuário
        memberCount: row.member_count ? parseInt(row.member_count, 10) : null
    };
};

export const conversationRepositorio = {

    /**
     * Encontra ou cria uma conversa privada entre dois usuários.
     */
    async findOrCreatePrivateConversation(userId1, userId2) {
        // 1. Verificar se já existe uma conversa privada entre eles
        let query = `
            SELECT cm1.conversation_id
            FROM conversation_members cm1
            JOIN conversation_members cm2 ON cm1.conversation_id = cm2.conversation_id
            JOIN conversations c ON cm1.conversation_id = c.id
            WHERE c.conversation_type = 'private'
              AND cm1.user_id = $1
              AND cm2.user_id = $2;
        `;
        let res = await pool.query(query, [userId1, userId2]);

        if (res.rows.length > 0) {
            return this.findById(res.rows[0].conversation_id);
        }

        // 2. Se não existir, criar uma nova
        const conversationId = gerarId(ID_PREFIX.CONVERSA);
        await pool.query('BEGIN');
        try {
            query = 'INSERT INTO conversations (id, conversation_type) VALUES ($1, \'private\') RETURNING *';
            const convRes = await pool.query(query, [conversationId]);
            
            query = 'INSERT INTO conversation_members (conversation_id, user_id) VALUES ($1, $2), ($1, $3)';
            await pool.query(query, [conversationId, userId1, userId2]);

            await pool.query('COMMIT');
            return toConversationObject(convRes.rows[0]);
        } catch (e) {
            await pool.query('ROLLBACK');
            throw e;
        }
    },

    async findById(id) {
        const res = await pool.query('SELECT * FROM conversations WHERE id = $1', [id]);
        return toConversationObject(res.rows[0]);
    },
    
    async findByGroupId(groupId) {
        const res = await pool.query('SELECT * FROM conversations WHERE group_id = $1', [groupId]);
        return toConversationObject(res.rows[0]);
    },

    /**
     * Lista todas as conversas de um usuário.
     */
    async listForUser(userId) {
        const query = `
            SELECT 
                c.*, 
                -- Para chats de grupo, pega o nome do grupo
                CASE 
                    WHEN c.conversation_type = 'group' THEN g.name
                    -- Para chats privados, pega o nome do *outro* usuário
                    WHEN c.conversation_type = 'private' THEN u.name
                END as name,
                (SELECT COUNT(*) FROM conversation_members WHERE conversation_id = c.id) as member_count
            FROM conversation_members cm
            JOIN conversations c ON cm.conversation_id = c.id
            LEFT JOIN groups g ON c.group_id = g.id
            -- Join com a tabela de membros duas vezes para encontrar o outro usuário no chat privado
            LEFT JOIN conversation_members cm_other ON c.id = cm_other.conversation_id AND cm_other.user_id != $1
            LEFT JOIN users u ON cm_other.user_id = u.id AND c.conversation_type = 'private'
            WHERE cm.user_id = $1
            ORDER BY c.last_message_at DESC NULLS LAST;
        `;
        const res = await pool.query(query, [userId]);
        return res.rows.map(toConversationObject);
    },

    /**
     * Atualiza o timestamp da última mensagem de uma conversa.
     */
    async updateLastMessageAt(conversationId) {
        const query = 'UPDATE conversations SET last_message_at = CURRENT_TIMESTAMP WHERE id = $1';
        await pool.query(query, [conversationId]);
    }
};