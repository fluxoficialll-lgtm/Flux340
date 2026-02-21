
import { pool } from '../database/pool.js';

export const reportRepositorio = {

    async create({ reporterId, targetId, targetType, reason }) {
        const query = `
            INSERT INTO reports (reporter_id, target_id, target_type, reason)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;
        const values = [reporterId, targetId, targetType, reason];
        const res = await pool.query(query, values);
        return res.rows[0];
    },

    async findPending(limit = 50, offset = 0) {
        const query = `
            SELECT * FROM reports 
            WHERE status = 'pending' 
            ORDER BY created_at ASC
            LIMIT $1 OFFSET $2
        `;
        const res = await pool.query(query, [limit, offset]);
        return res.rows;
    },

    async updateStatus(id, status, reviewerNotes) {
        const query = `
            UPDATE reports 
            SET status = $1, reviewer_notes = $2, reviewed_at = CURRENT_TIMESTAMP
            WHERE id = $3
            RETURNING *
        `;
        const res = await pool.query(query, [status, reviewerNotes, id]);
        return res.rows[0];
    }
};