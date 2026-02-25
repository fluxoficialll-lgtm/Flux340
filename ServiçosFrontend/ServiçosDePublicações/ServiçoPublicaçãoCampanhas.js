
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoCampanhas.js

/**
 * Este serviço gerencia a criação e o ciclo de vida de Campanhas de marketing ou anúncios.
 */

const API_BASE_URL = '/api/campaigns'; // Endpoint da API para Campanhas

export const ServiçoPublicaçãoCampanhas = {

    /**
     * Cria uma nova campanha.
     * @param {object} campaignData - Dados da campanha (ex: { name, description, goal, budget, startDate, endDate, utm_campaign }).
     * @returns {Promise<object>} - O objeto da campanha criada.
     */
    async create(campaignData) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Autenticação necessária para criar uma campanha.');
        }

        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(campaignData),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao criar a campanha.');
        }

        return response.json();
    },

    /**
     * Busca os dados de performance de uma campanha específica.
     * @param {string} campaignId - O ID da campanha.
     * @returns {Promise<object>} - Os dados de métricas da campanha.
     */
    async getPerformance(campaignId) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Autenticação necessária para ver a performance.');
        }

        const response = await fetch(`${API_BASE_URL}/${campaignId}/performance`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar a performance da campanha.');
        }

        return response.json();
    },

    // Métodos futuros:
    // async pause(campaignId) { ... }
    // async resume(campaignId) { ... }
    // async update(campaignId, updates) { ... }
};
