
// ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoGrupos.js

/**
 * Este serviço é dedicado à criação e gerenciamento de Grupos.
 */

const API_BASE_URL = '/api/groups'; // Endpoint da API para Grupos

export const ServiçoPublicaçãoGrupos = {

    /**
     * Cria um novo grupo.
     * @param {object} groupData - Os dados do grupo (ex: { name, description, privacy, coverImageUrl }).
     * @returns {Promise<object>} - O objeto do grupo criado.
     */
    async create(groupData) {
        const authToken = localStorage.getItem('authToken');
        if (!authToken) {
            throw new Error('Autenticação necessária para criar um grupo.');
        }

        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(groupData),
        });

        if (!response.ok) {
            const errorResult = await response.json();
            throw new Error(errorResult.message || 'Falha ao criar o grupo.');
        }

        return response.json();
    },

    // Futuramente, podemos adicionar métodos para gerenciar o grupo:
    // async update(groupId, updates) { ... }
    // async delete(groupId) { ... }
    // async inviteMember(groupId, userId) { ... }
};
