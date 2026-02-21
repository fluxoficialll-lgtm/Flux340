
import express from 'express';
import { auditLogRepositorio } from '../GerenciadoresDeDados/auditLog.repositorio.js';

const router = express.Router();

/**
 * GET /api/audit-logs/:traceId
 * Retorna todos os logs de auditoria para um determinado traceId.
 */
router.get('/:traceId', async (req, res) => {
    req.logger.log('AUDIT_LOGS_GET_BY_TRACE_ID', { traceId: req.params.traceId });

    try {
        const { traceId } = req.params;
        if (!traceId) {
            return res.status(400).json({ error: 'traceId is required' });
        }

        const logs = await auditLogRepositorio.findByTraceId(traceId);

        if (!logs || logs.length === 0) {
            return res.status(404).json({ message: 'No logs found for this traceId' });
        }

        res.json({ 
            traceId,
            count: logs.length,
            logs 
        });

    } catch (e) {
        req.logger.error('AUDIT_LOGS_ERROR', { error: e.message, stack: e.stack });
        res.status(500).json({ error: 'Failed to fetch audit logs' });
    }
});

export default router;
