
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js

/**
 * Este serviço é responsável por ler, criar, e interagir com conteúdo dos feeds.
 */

const API_BASE_URL = '/api/feed';

async function fetchWithAuth(url, options = {}) {
    const authToken = localStorage.getItem('authToken');
    const headers = {
        ...options.headers,
    };

    if (options.body && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    
    if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
    }

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorResult = await response.json().catch(() => ({}));
        throw new Error(errorResult.message || `Falha na requisição para ${url}`);
    }

    if (response.status !== 204) {
        return response.json();
    }
}

export const ServiçoPublicaçãoFeed = {

    /**
     * Cria uma nova publicação.
     * @param {{ content: string, parentPostId?: string, mediaUrl?: string }} postData - Os dados do post a ser criado.
     * @returns {Promise<object>} - O objeto do post recém-criado.
     */
    async create(postData) {
        return fetchWithAuth(API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(postData)
        });
    },

    /**
     * Busca as publicações para um tipo de feed específico (home, profile, etc.).
     * @param {object} options - Opções adicionais, como filtros e paginação (ex: { feedType: 'home', page: 2 }).
     * @returns {Promise<Array<object>>} - Uma lista de publicações para o feed.
     */
    async getAll(options = {}) {
        const queryParams = new URLSearchParams(options).toString();
        const url = `${API_BASE_URL}?${queryParams}`;
        return fetchWithAuth(url);
    },

    /**
     * Busca um post específico pelo seu ID.
     * @param {string} postId - O ID do post a ser buscado.
     * @returns {Promise<object>} - O objeto do post.
     */
    async getById(postId) {
        return fetchWithAuth(`${API_BASE_URL}/${postId}`);
    },

    /**
     * Busca publicações com base em um termo de pesquisa.
     * @param {string} query - O termo para buscar.
     * @returns {Promise<Array<object>>} - Uma lista de posts que correspondem à busca.
     */
    async search(query) {
        return fetchWithAuth(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
    },

    /**
     * Atualiza um post.
     * @param {string} postId - O ID do post a ser atualizado.
     * @param {object} postData - O objeto do post com os dados atualizados.
     * @returns {Promise<object>} - O post atualizado.
     */
    async update(postId, postData) {
        return fetchWithAuth(`${API_BASE_URL}/${postId}`, {
            method: 'PUT',
            body: JSON.stringify(postData)
        });
    },

    /**
     * Deleta um post específico.
     * @param {string} postId - O ID do post a ser deletado.
     * @returns {Promise<void>}
     */
    async delete(postId) {
        return fetchWithAuth(`${API_BASE_URL}/${postId}`, { method: 'DELETE' });
    }
};
