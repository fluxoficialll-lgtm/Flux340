
// ServiçosFrontend/ServiçoDePerfil/Serviço.Gestão.Perfil.js

const API_BASE_URL = '/api'; // A URL base da nossa API

/**
 * Busca os dados de perfil de um usuário no backend.
 * @param {string} userId - O ID do usuário a ser buscado.
 * @returns {Promise<object>} - Os dados do perfil do usuário.
 */
const getUserProfile = async (userId) => {
    if (!userId) {
        throw new Error('O ID do usuário é obrigatório.');
    }

    const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // Se a autenticação for necessária para ver perfis, o token JWT seria adicionado aqui.
            // Ex: 'Authorization': `Bearer ${token}`
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Falha ao buscar o perfil do usuário.');
    }

    return data; // Retorna os dados do perfil formatados pelo backend
};

export const profileService = {
    getUserProfile,
};
