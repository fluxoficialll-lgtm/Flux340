
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoComentáriosFeed.js

/**
 * Serviço para gerenciar a publicação de comentários em posts do feed.
 */

const API_BASE_URL = '/api/posts'; // A base da API para posts

export const ServiçoPublicaçãoComentáriosFeed = {

    /**
     * Adiciona um novo comentário a um post específico.
     * @param {string} postId - O ID do post que está sendo comentado.
     * @param {object} commentData - O conteúdo do comentário (ex: { content: 'Ótimo post!' }).
     * @returns {Promise<object>} - O objeto do comentário criado.
     */
    async create(postId, commentData) {
        if (!postId) {
            throw new Error('O ID do post é necessário para adicionar um comentário.');
        }

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Autenticação necessária para comentar.');
        }

        // O endpoint é construído dinamicamente para um post específico
        const response = await fetch(`${API_BASE_URL}/${postId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao publicar o comentário.');
        }

        return response.json();
    },

    // Funções futuras poderiam incluir:
    // async delete(commentId) { ... }
    // async update(commentId, updates) { ... }
};
