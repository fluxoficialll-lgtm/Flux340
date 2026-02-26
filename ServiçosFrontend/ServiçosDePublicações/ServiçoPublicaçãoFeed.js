
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js

/**
 * Este serviço é responsável por ler, criar, e interagir com conteúdo dos feeds.
 */

const FEED_API_URL = '/api/feed';

export const ServiçoPublicaçãoFeed = {

    /**
     * Cria uma nova publicação.
     * @param {{ content: string, parentPostId?: string, mediaUrl?: string }} postData - Os dados do post a ser criado.
     * @returns {Promise<object>} - O objeto do post recém-criado pelo backend.
     */
    async createPost(postData) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            return Promise.reject(new Error('Usuário não autenticado. Não é possível postar.'));
        }

        // A rota de criação é POST /api/feed/ de acordo com o backend
        const response = await fetch(FEED_API_URL, { 
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(postData)
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
        // A rota GET /api/feed/ busca todos os posts, vamos assumir que o backend filtra com base em query params
        const queryParams = new URLSearchParams({ feedType, ...options }).toString();
        const url = `${FEED_API_URL}?${queryParams}`;

        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        };

        const response = await fetch(url, { method: 'GET', headers });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || `Falha ao buscar o feed do tipo '${feedType}'.`);
        }

        return response.json();
    },

    /**
     * Busca publicações com base em um termo de pesquisa.
     * @param {string} query - O termo para buscar.
     * @returns {Promise<Array<object>>} - Uma lista de posts que correspondem à busca.
     * @note Esta função pode precisar de um endpoint de busca dedicado, como /api/feed/search.
     */
    async searchPosts(query) {
        const authToken = localStorage.getItem('authToken');
        const headers = {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        };
        
        // Assumindo que a busca é um filtro no endpoint principal do feed
        const response = await fetch(`${FEED_API_URL}/search?q=${encodeURIComponent(query)}`, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao buscar as publicações.');
        }

        return response.json();
    },

    /**
     * Busca um post específico pelo seu ID.
     * @param {string} postId - O ID do post a ser buscado.
     * @returns {Promise<object>} - O objeto do post.
     */
    async getPostById(postId) {
        const response = await fetch(`${FEED_API_URL}/${postId}`);
        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao buscar o post.');
        }
        return response.json();
    },

    /**
     * Atualiza um post. Usado para ações como like/unlike.
     * @param {string} postId - O ID do post a ser atualizado.
     * @param {object} postData - O objeto do post com os dados atualizados.
     * @returns {Promise<object>} - O post atualizado.
     */
    async updatePost(postId, postData) {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${FEED_API_URL}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(postData)
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao atualizar o post.');
        }
        return response.json();
    },

    /**
     * Deleta um post específico.
     * @param {string} postId - O ID do post a ser deletado.
     * @returns {Promise<void>}
     */
    async deletePost(postId) {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch(`${FEED_API_URL}/${postId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao deletar o post.');
        }
    }
};
