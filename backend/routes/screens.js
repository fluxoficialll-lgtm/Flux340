
import express from 'express';
import { userRepositorio } from '../GerenciadoresDeDados/user.repositorio.js';
import { contentRepositorio } from '../GerenciadoresDeDados/content.repositorio.js';

const router = express.Router();

/**
 * BFF Endpoint: My Business Screen (Criador - Acesso Comum)
 * Agrega dados de várias fontes para construir a tela "Meu Negócio" do criador.
 * Refatorado para usar os novos repositórios e logging estruturado.
 */
router.get('/my-business', async (req, res) => {
    // Usando o logger injetado pelo middleware
    req.logger.log('BFF_MY_BUSINESS_START', { query: req.query });

    try {
        const { userId } = req.query;
        if (!userId) {
            req.logger.warn('BFF_MY_BUSINESS_WARN', { error: 'userId is required' });
            return res.status(400).json({ error: "userId is required" });
        }

        // 1. Buscar dados do usuário e estatísticas de conteúdo em paralelo
        const [user, contentStats] = await Promise.all([
            userRepositorio.findById(userId),
            contentRepositorio.getUserContentStats(userId)
        ]);

        if (!user) {
            req.logger.warn('BFF_MY_BUSINESS_WARN', { error: 'User not found', userId });
            return res.status(404).json({ error: "User not found" });
        }

        // 2. Construir o objeto de resposta do dashboard
        const dashboard = {
            user: {
                name: user.name,
                username: user.username,
                profilePictureUrl: user.profilePictureUrl
            },
            stats: {
                followerCount: user.followerCount || 0,
                totalPosts: contentStats.totalPosts,
                totalRemixesReceived: contentStats.totalRemixesReceived
            }
        };

        req.logger.log('BFF_MY_BUSINESS_SUCCESS', { userId });

        res.json({
            success: true,
            timestamp: Date.now(),
            dashboard
        });

    } catch (e) {
        // Logando o erro com o traceId da requisição
        req.logger.error('BFF_MY_BUSINESS_ERROR', { error: e.message, stack: e.stack });
        res.status(500).json({ error: 'Failed to build business dashboard' });
    }
});

export default router;
