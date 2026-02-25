
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js

/**
 * Este serviço é responsável por ler e criar conteúdo dos feeds.
 */

// ATENÇÃO: O endpoint para posts é /api/posts, não /api/feed.
const POSTS_API_URL = '/api/posts';

export const ServiçoPublicaçãoFeed = {

    /**
     * Cria uma nova publicação.
     * @param {{ content: string, parentPostId?: string, mediaUrl?: string }} postData - Os dados do post a ser criado.
     * @returns {Promise<object>} - O objeto do post recém-criado pelo backend.
     */
    async createPost(postData) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            // Idealmente, o próprio backend recusa, mas é bom verificar aqui também.
            return Promise.reject(new Error('Usuário não autenticado. Não é possível postar.'));
        }

        const response = await fetch(`${POSTS_API_URL}/create`, { // CORRIGIDO: Endpoint para criação
            method: 'POST', // CORRIGIDO: Método para criação
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}` // Essencial para o backend saber quem está postando
            },
            body: JSON.stringify(postData) // Envia os dados do post no corpo da requisição
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Falha ao criar a publicação.');
        }

        return result;
    },

    /**
     * Busca as publicações para um tipo de feed específico.
     * @param {'home' | 'profile' | 'group' | 'explore'} feedType - O tipo de feed a ser buscado.
     * @param {object} options - Opções adicionais, como filtros, paginação ou IDs.
     * @returns {Promise<Array<object>>} - Uma lista de publicações para o feed.
     */
    async getFeed(feedType, options = {}) {
        // O endpoint para buscar feeds pode ser diferente do de criar posts.
        // Mantendo a lógica original, mas usando um endpoint mais genérico.
        const FEED_API_URL = '/api/feed';
        const queryParams = new URLSearchParams(options).toString();
        const url = `${FEED_API_URL}/${feedType}?${queryParams}`;

        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            console.warn('Atenção: A busca de feed está sendo feita sem um token de autenticação.');
        }

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
            },
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || `Falha ao buscar o feed do tipo '${feedType}'.`);
        }

        return response.json();
    },
};
