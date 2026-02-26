
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoReels.js

/**
 * Este serviço é focado na criação, publicação e busca de Reels.
 */

const API_BASE_URL = '/api/reels';

async function fetchWithAuth(url, options = {}) {
    const authToken = localStorage.getItem('authToken');
    const headers = {
        'Content-Type': 'application/json',
        ...(authToken && { 'Authorization': `Bearer ${authToken}` }),
        ...options.headers,
    };

    const response = await fetch(url, { ...options, headers });

    if (!response.ok) {
        const errorResult = await response.json().catch(() => ({}));
        throw new Error(errorResult.message || `Falha na requisição para ${url}`);
    }
    return response.json();
}

export const ServiçoPublicacaoReels = {
    async create(reelData) {
        return fetchWithAuth(API_BASE_URL, {
            method: 'POST',
            body: JSON.stringify(reelData),
        });
    },

    /**
     * Busca todos os reels.
     * @returns {Promise<Array<object>>} - Uma lista de reels.
     */
    async getReels() {
        const response = await fetchWithAuth(API_BASE_URL);
        return response.data; // A API de reels encapsula em { data: [...] }
    },

    /**
     * Busca um reel específico pelo seu ID.
     * @param {string} reelId - O ID do reel.
     * @returns {Promise<object>} - O objeto do reel.
     */
    async getReelById(reelId) {
        return fetchWithAuth(`${API_BASE_URL}/${reelId}`);
    }
};
