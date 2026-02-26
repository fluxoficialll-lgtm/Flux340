
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

    /**
     * Formata um timestamp para uma string de tempo relativo (ex: "há 5 minutos").
     * @param {string | number | Date} timestamp - O timestamp a ser formatado.
     * @returns {string}
     */
    formatRelativeTime(timestamp) {
        const now = new Date();
        const date = new Date(timestamp);
        const diffInSeconds = Math.floor((now - date) / 1000);

        const units = {
            ano: 31536000,
            mês: 2592000,
            semana: 604800,
            dia: 86400,
            hora: 3600,
            minuto: 60,
        };

        if (diffInSeconds < 60) {
            return 'agora';
        }

        for (const [unit, seconds] of Object.entries(units)) {
            const interval = Math.floor(diffInSeconds / seconds);
            if (interval >= 1) {
                if (unit === 'semana' && interval * 7 > 7) {
                     return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
                }
                const plural = interval > 1 ? 's' : '';
                return `há ${interval} ${unit}${plural}`;
            }
        }
        return date.toLocaleDateString('pt-BR');
    },
};
