
import express from 'express';
import { financialRepositorio } from '../GerenciadoresDeDados/financial.repositorio.js';
import { validateAdmin } from '../middleware.js';

const router = express.Router();

// Aplica o middleware de administrador a todas as rotas neste arquivo
router.use(validateAdmin);

/**
 * GET /api/analytics/payment-ranking
 * Retorna um ranking de pagamentos, opcionalmente filtrado por país.
 */
router.get('/payment-ranking', async (req, res) => {
    req.logger.log('ANALYTICS_PAYMENT_RANKING_START', { query: req.query });
    try {
        const { country } = req.query;
        const ranking = await financialRepositorio.getPaymentRanking(country);
        
        req.logger.log('ANALYTICS_PAYMENT_RANKING_SUCCESS', { 
            filters: { country: country || 'ALL' },
            rankingSize: ranking.length 
        });

        res.json({
            success: true,
            filters: { country: country || 'ALL' },
            ranking
        });
    } catch (e) {
        req.logger.error('ANALYTICS_PAYMENT_RANKING_ERROR', { 
            error: e.message, 
            stack: e.stack, 
            query: req.query 
        });
        res.status(500).json({ error: e.message });
    }
});

/**
 * GET /api/analytics/user/:userId/payment-ranking
 * Retorna o ranking de pagamentos para um vendedor específico.
 */
router.get('/user/:userId/payment-ranking', async (req, res) => {
    const { userId } = req.params;
    req.logger.log('ANALYTICS_SELLER_RANKING_START', { userId });
    try {
        const ranking = await financialRepositorio.getSellerPaymentRanking(userId);
        
        req.logger.log('ANALYTICS_SELLER_RANKING_SUCCESS', { userId, rankingSize: ranking.length });

        res.json({
            success: true,
            userId,
            ranking
        });
    } catch (e) {
        req.logger.error('ANALYTICS_SELLER_RANKING_ERROR', { 
            error: e.message, 
            stack: e.stack, 
            userId 
        });
        res.status(500).json({ error: e.message });
    }
});

/**
 * POST /api/analytics/log-payment-method
 * Endpoint manual para registrar o uso de um método de pagamento.
 */
router.post('/log-payment-method', async (req, res) => {
    req.logger.log('ANALYTICS_LOG_PAYMENT_START', { body: req.body });
    try {
        const data = req.body;
        if (!data.methodName || !data.provider) {
            req.logger.warn('ANALYTICS_LOG_PAYMENT_INVALID_INPUT', { body: data });
            return res.status(400).json({ error: "methodName and provider are required." });
        }

        await financialRepositorio.recordPaymentMethodUsage(data);
        
        req.logger.log('ANALYTICS_LOG_PAYMENT_SUCCESS', { paymentData: data });

        res.json({ success: true });
    } catch (e) {
        req.logger.error('ANALYTICS_LOG_PAYMENT_ERROR', { 
            error: e.message, 
            stack: e.stack, 
            body: req.body 
        });
        res.status(500).json({ error: e.message });
    }
});

export default router;
