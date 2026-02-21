
import express from 'express';
import { userRepositorio } from '../GerenciadoresDeDados/user.repositorio.js';

const router = express.Router();

/**
 * GET /api/ranking/followers
 * Retorna um ranking dos usuários com mais seguidores.
 */
router.get('/followers', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10) || 10;

        // Lógica refatorada para usar o novo userRepositorio
        const ranking = await userRepositorio.getFollowerRanking({ limit });

        res.json(ranking);
    } catch (e) {
        console.error(`[Ranking Route Error]: ${e.message}`);
        res.status(500).json({ error: 'Failed to fetch ranking' });
    }
});

export default router;
