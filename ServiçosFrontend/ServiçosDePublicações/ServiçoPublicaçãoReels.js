
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoReels.js

/**
 * Este serviço é focado na criação e publicação de Reels.
 */

const API_BASE_URL = '/api/reels'; // Endpoint da API para Reels

export const ServiçoPublicaçãoReels = {

    /**
     * Cria e publica um novo Reel.
     * @param {object} reelData - Os dados do Reel (ex: { videoUrl, description, songId }).
     * @returns {Promise<object>} - O objeto do Reel criado.
     */
    async create(reelData) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Autenticação necessária para criar um Reel.');
        }

        // Para uploads de vídeo, geralmente se usa FormData.
        // Este é um exemplo simplificado com JSON. Pode precisar de ajuste.
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Mudar para 'multipart/form-data' se estiver enviando arquivos
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(reelData), // Se usar FormData, o body será o objeto FormData
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao criar o Reel.');
        }

        return response.json();
    },

    // Métodos futuros podem incluir:
    // async update(reelId, updates) { ... }
    // async delete(reelId) { ... }
};
