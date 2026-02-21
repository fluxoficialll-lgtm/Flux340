
import { pool } from '../database/pool.js';

const toEventObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        source: row.source,
        type: row.type,
        payload: row.payload,
        status: row.status,
        processingNotes: row.processing_notes,
        clientTimestamp: row.client_timestamp,
        createdAt: row.created_at,
    };
};

export const eventRepositorio = {
    async storeEvent(event) {
        const {
            event_id: id,
            source,
            type,
            payload,
            timestamp
        } = event;

        // O timestamp do cliente geralmente vem em milissegundos
        const clientTimestamp = new Date(timestamp);

        const query = `
            INSERT INTO events (id, source, type, payload, client_timestamp, status)
            VALUES ($1, $2, $3, $4, $5, 'received')
            ON CONFLICT (id) DO NOTHING -- Garante a idempotência no nível do banco de dados
            RETURNING *;
        `;

        const values = [id, source, type, payload, clientTimestamp];
        
        const res = await pool.query(query, values);
        return toEventObject(res.rows[0]);
    },

    async updateEventStatus(id, status, notes = null) {
        const query = `
            UPDATE events
            SET status = $1, processing_notes = $2
            WHERE id = $3
            RETURNING *;
        `;

        const res = await pool.query(query, [status, notes, id]);
        return toEventObject(res.rows[0]);
    },

    async findPending(limit = 100) {
        const query = `
            SELECT * FROM events 
            WHERE status = 'received' OR status = 'processing'
            ORDER BY client_timestamp ASC
            LIMIT $1;
        `;
        const res = await pool.query(query, [limit]);
        return res.rows.map(toEventObject);
    },

    async findById(id) {
        const res = await pool.query('SELECT * FROM events WHERE id = $1', [id]);
        return toEventObject(res.rows[0]);
    }
};