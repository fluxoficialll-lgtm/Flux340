
import { pool } from '../database/pool.js';
import { gerarId, ID_PREFIX } from '../ServiçosBackEnd/idService.js'; // Corrigido

const toGroupObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        creatorId: row.creator_id,
        name: row.name,
        description: row.description,
        groupType: row.group_type,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
};

export const groupRepositorio = {
    async list(limit = 100) {
        const res = await pool.query('SELECT * FROM groups ORDER BY created_at DESC LIMIT $1', [limit]);
        return res.rows.map(toGroupObject);
    },

    async findById(id) {
        const res = await pool.query('SELECT * FROM groups WHERE id = $1', [id]);
        return toGroupObject(res.rows[0]);
    },

    async create(groupData) {
        const { creatorId, name, description, groupType } = groupData;
        const id = gerarId(ID_PREFIX.GRUPO);
        const query = 'INSERT INTO groups (id, creator_id, name, description, group_type) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const res = await pool.query(query, [id, creatorId, name, description, groupType]);
        return toGroupObject(res.rows[0]);
    },

    async update(id, updates) {
        const fields = Object.keys(updates);
        const values = Object.values(updates);
        const setClause = fields.map((field, index) => `"${field}" = $${index + 1}`).join(', ');
        const query = `UPDATE groups SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $${fields.length + 1} RETURNING *`;
        const res = await pool.query(query, [...values, id]);
        return toGroupObject(res.rows[0]);
    },

    async delete(id) {
        await pool.query('DELETE FROM groups WHERE id = $1', [id]);
    },

    async addMember(groupId, userId, role = 'member') {
        const query = 'INSERT INTO group_members (group_id, user_id, role) VALUES ($1, $2, $3) RETURNING *'
        const res = await pool.query(query, [groupId, userId, role]);
        return res.rows[0];
    },

    async removeMember(groupId, userId) {
        const res = await pool.query('DELETE FROM group_members WHERE group_id = $1 AND user_id = $2', [groupId, userId]);
        return res.rowCount > 0;
    },

    async getGroupsByMemberVolume(groupType = 'public', limit = 100) {
        const query = `
            SELECT g.*, COUNT(gm.user_id) as member_count
            FROM groups g
            JOIN group_members gm ON g.id = gm.group_id
            WHERE g.group_type = $1
            GROUP BY g.id
            ORDER BY member_count DESC
            LIMIT $2;
        `;
        const res = await pool.query(query, [groupType, limit]);
        return res.rows.map(row => ({ ...toGroupObject(row), memberCount: parseInt(row.member_count, 10) }));
    }
};
