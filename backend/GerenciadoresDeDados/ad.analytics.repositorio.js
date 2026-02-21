
import { pool } from '../database/pool.js';

export const adAnalyticsRepositorio = {

    /**
     * Registra um evento de anúncio (impressão, clique, etc.).
     */
    async recordEvent(campaignId, userId, eventType, costInCents = 0, metadata = {}) {
        const query = `
            INSERT INTO ad_events (campaign_id, user_id, event_type, cost_in_cents, metadata)
            VALUES ($1, $2, $3, $4, $5)
        `;
        await pool.query(query, [campaignId, userId, eventType, costInCents, metadata]);

        // Deduz o custo do orçamento da campanha
        if (costInCents > 0) {
            const budgetQuery = `
                UPDATE ad_campaigns 
                SET remaining_budget = remaining_budget - $1 
                WHERE id = $2
            `;
            await pool.query(budgetQuery, [costInCents, campaignId]);
        }
    },

    /**
     * Agrega os dados de eventos para fornecer métricas de desempenho de uma campanha.
     */
    async getPerformanceMetrics(campaignId) {
        const query = `
            SELECT 
                event_type, 
                COUNT(*) as count, 
                SUM(cost_in_cents) as total_cost
            FROM ad_events
            WHERE campaign_id = $1
            GROUP BY event_type;
        `;
        const res = await pool.query(query, [campaignId]);

        const metrics = {
            impressions: 0,
            clicks: 0,
            conversions: 0,
            totalCost: 0,
            cpc: 0, // Custo por Clique
            ctr: 0  // Taxa de Clique
        };

        let totalCost = 0;

        res.rows.forEach(row => {
            const count = parseInt(row.count, 10);
            const cost = parseInt(row.total_cost, 10);
            totalCost += cost;

            if (row.event_type === 'impression') metrics.impressions = count;
            if (row.event_type === 'click') metrics.clicks = count;
            if (row.event_type === 'conversion') metrics.conversions = count;
        });

        metrics.totalCost = totalCost / 100; // Converter de centavos para a unidade principal
        if (metrics.clicks > 0) {
            metrics.cpc = (totalCost / metrics.clicks) / 100;
        }
        if (metrics.impressions > 0) {
            metrics.ctr = (metrics.clicks / metrics.impressions) * 100;
        }

        return metrics;
    }
};
