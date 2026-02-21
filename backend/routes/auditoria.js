
import express from 'express';
// REATORADO: A importação agora aponta para o arquivo 'index.js' da pasta, 
// o que melhora a manutenibilidade e a escalabilidade.
import { auditorDoPostgreSQL } from '../database/AuditoresDeBancos/index.js';

const router = express.Router();

/**
 * @swagger
 * /api/auditoria/databases:
 *   get:
 *     summary: Inspeciona o status dos bancos de dados PostgreSQL.
 *     tags: [Auditoria]
 *     responses:
 *       200:
 *         description: Lista e status dos bancos de dados retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCount:
 *                   type: integer
 *                 databases:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       status:
 *                         type: string
 *       500:
 *         description: Erro interno do servidor.
 */
router.get('/databases', async (req, res) => {
    try {
        const report = await auditorDoPostgreSQL.inspectDatabases();
        res.status(200).json(report);
    } catch (error) {
        console.error(`Falha ao auditar os bancos de dados: ${error.stack}`);
        res.status(500).json({ error: 'Falha ao auditar os bancos de dados.' });
    }
});

export default router;
