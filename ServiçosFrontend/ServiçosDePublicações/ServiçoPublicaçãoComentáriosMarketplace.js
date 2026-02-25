
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoComentáriosMarketplace.js

/**
 * Serviço para gerenciar a publicação de comentários em itens do Marketplace.
 */

const API_BASE_URL = '/api/marketplace/publications'; // A base da API para publicações do marketplace

export const ServiçoPublicaçãoComentáriosMarketplace = {

    /**
     * Adiciona um novo comentário a um item do marketplace.
     * @param {string} itemId - O ID do item que está sendo comentado.
     * @param {object} commentData - O conteúdo do comentário (ex: { content: 'Ainda está disponível?' }).
     * @returns {Promise<object>} - O objeto do comentário criado.
     */
    async create(itemId, commentData) {
        if (!itemId) {
            throw new Error('O ID do item é necessário para adicionar um comentário.');
        }

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Autenticação necessária para comentar em um item.');
        }

        // O endpoint é construído dinamicamente para um item específico
        const response = await fetch(`${API_BASE_URL}/${itemId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao publicar o comentário no item.');
        }

        return response.json();
    },

    // Funções futuras poderiam incluir:
    // async getCommentsForItem(itemId) { ... }
    // async delete(commentId) { ... }
};
