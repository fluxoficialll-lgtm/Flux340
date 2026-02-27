
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoMarketplace.js

/**
 * Este serviço é dedicado a gerenciar a publicação de itens no marketplace,
 * comunicando-se com o endpoint específico da API.
 */

const API_BASE_URL = '/api/marketplace/items'; // CORRIGIDO: Endpoint para os itens do marketplace

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

export const ServiçoPublicaçãoMarketplace = {

    /**
     * Cria um novo item no marketplace.
     * @param {object} itemData - Os dados do item a ser criado (ex: { title, price, description, images, category }).
     * @returns {Promise<object>} - O item do marketplace que foi criado.
     */
    async create(itemData) {
        return fetchWithAuth(API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(itemData),
        });
    },

    /**
     * Busca todos os itens do marketplace, com filtros e paginação opcionais.
     * @param {object} options - Opções de consulta, como { category: 'electronics', page: 1, limit: 20 }.
     * @returns {Promise<Array<object>>} - Uma lista de itens do marketplace.
     */
    async getAll(options = {}) {
        const queryParams = new URLSearchParams(options).toString();
        const url = `${API_BASE_URL}?${queryParams}`;
        return fetchWithAuth(url);
    },

    /**
     * Busca um item específico do marketplace pelo ID.
     * @param {string} itemId - O ID do item.
     * @returns {Promise<object>} - O objeto do item.
     */
    async getById(itemId) {
        return fetchWithAuth(`${API_BASE_URL}/${itemId}`);
    },

    /**
     * Atualiza um item existente no marketplace.
     * @param {string} itemId - O ID do item a ser atualizado.
     * @param {object} updates - Os campos a serem atualizados no item.
     * @returns {Promise<object>} - O item atualizado.
     */
    async update(itemId, updates) {
        return fetchWithAuth(`${API_BASE_URL}/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
        });
    },

    /**
     * Deleta um item do marketplace.
     * @param {string} itemId - O ID do item a ser deletado.
     * @returns {Promise<void>}
     */
    async delete(itemId) {
        return fetchWithAuth(`${API_BASE_URL}/${itemId}`, {
            method: 'DELETE',
        });
    }
};
