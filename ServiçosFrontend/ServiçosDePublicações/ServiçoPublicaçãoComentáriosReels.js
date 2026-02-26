
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoComentáriosReels.js

/**
 * Serviço para gerenciar a publicação de comentários em Reels.
 */

const API_BASE_URL = '/api/reels'; // A base da API para Reels

export const ServicoPublicacaoComentariosReels = {

    /**
     * Adiciona um novo comentário a um Reel específico.
     * @param {string} reelId - O ID do Reel que está sendo comentado.
     * @param {object} commentData - O conteúdo do comentário (ex: { content: 'Que incrível!' }).
     * @returns {Promise<object>} - O objeto do comentário criado.
     */
    async create(reelId, commentData) {
        if (!reelId) {
            throw new Error('O ID do Reel é necessário para adicionar um comentário.');
        }

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Autenticação necessária para comentar em um Reel.');
        }

        const response = await fetch(`${API_BASE_URL}/${reelId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(commentData),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao publicar o comentário no Reel.');
        }

        return response.json();
    },

    // Funções futuras poderiam incluir:
    // async getCommentsForReel(reelId) { ... }
    // async delete(commentId) { ... }
};
