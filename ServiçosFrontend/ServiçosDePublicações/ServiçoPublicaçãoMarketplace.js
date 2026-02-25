
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoMarketplace.js

/**
 * Este serviço é dedicado a gerenciar a publicação de itens no marketplace,
 * comunicando-se com o endpoint específico da API.
 */

const API_BASE_URL = '/api/marketplace/publications'; // Endpoint dedicado para o marketplace

export const ServiçoPublicaçãoMarketplace = {

    /**
     * Cria um novo item no marketplace.
     * @param {object} itemData - Os dados do item a ser criado (ex: { title, price, description, images, category }).
     * @returns {Promise<object>} - O item do marketplace que foi criado.
     */
    async create(itemData) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Usuário não autenticado. Não é possível publicar no marketplace.');
        }

        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(itemData),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            // A mensagem de erro do backend será usada, se disponível.
            throw new Error(errorResult.message || 'Falha ao publicar o item no marketplace.');
        }

        return response.json();
    },

    // No futuro, podemos expandir este serviço com outros métodos como:
    // async update(itemId, updates) { ... },
    // async delete(itemId) { ... },
    // async getMyItems() { ... },
};
