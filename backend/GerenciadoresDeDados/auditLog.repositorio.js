
import { pool } from '../database/pool.js';

const toAuditLogObject = (row) => {
    if (!row) return null;
    return {
        id: row.id,
        traceId: row.trace_id,
        timestamp: row.timestamp,
        level: row.level,
        service: row.service,
        context: row.contexto,
        data: row.data,
        createdAt: row.created_at
    };
};

export const auditLogRepositorio = {
    /**
     * Insere um novo registro de log no banco de dados.
     * @param {object} logEntry - O objeto de log a ser inserido.
     */
    async insert(logEntry) {
        const { traceId, level, service, contexto, data, timestamp } = logEntry;
        const query = `
            INSERT INTO audit_logs (trace_id, level, service, contexto, data, timestamp)
            VALUES ($1, $2, $3, $4, $5, $6);
        `;
        pool.query(query, [traceId, level, service, contexto, data, timestamp]).catch(console.error);
    },

    /**
     * Busca todos os logs associados a um traceId.
     * @param {string} traceId - O ID de rastreamento.
     * @returns {Promise<object[]>} Uma lista de logs ordenados por tempo.
     */
    async findByTraceId(traceId) {
        const query = `
            SELECT * FROM audit_logs 
            WHERE trace_id = $1 
            ORDER BY timestamp ASC;
        `;
        const res = await pool.query(query, [traceId]);
        return res.rows.map(toAuditLogObject);
    }
};