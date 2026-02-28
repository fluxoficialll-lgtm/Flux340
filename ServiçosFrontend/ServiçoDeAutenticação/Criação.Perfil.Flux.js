
/**
 * @file Serviço para gestão de perfis de usuário no Flux.
 * Unifica a lógica de criação e busca de perfis, exportando um `profileService`.
 */

// A importação do Auditor foi removida, pois ele opera globalmente no `fetch`.
import { authService } from './authService.js';

const API_BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/profiles`;

const GestorRequisicoesPerfil = {
    async request(method, endpoint = '', data = null) {
        const token = authService.getToken();
        if (!token) {
            return Promise.reject(new Error('Token de autenticação não encontrado.'));
        }

        const config = {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        if (data) {
            config.body = JSON.stringify(data);
        }

        try {
            // Correção: A chamada agora é um `fetch` padrão. O auditor, se inicializado,
            // irá interceptá-la automaticamente.
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'A resposta da API não pôde ser lida.' }));
                throw new Error(errorData.message || `Erro ${response.status} na API de perfis.`);
            }

            if (response.status === 204) {
                return {};
            }

            return await response.json();
        } catch (error) {
            console.error(`[GestorRequisicoesPerfil] Falha na requisição ${method} para ${API_BASE_URL}${endpoint}:`, error);
            throw error;
        }
    },
    get(endpoint) { return this.request('GET', endpoint); },
    post(endpoint, data) { return this.request('POST', endpoint, data); },
    put(endpoint, data) { return this.request('PUT', endpoint, data); },
    delete(endpoint) { return this.request('DELETE', endpoint); },
};

const profileService = {
    async getUserProfile(userId) {
        if (!userId) throw new Error('O ID do usuário é obrigatório para buscar o perfil.');
        return GestorRequisicoesPerfil.get(`/${userId}`);
    },
    async atualizarPerfil(profileData) {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !currentUser.id) {
            throw new Error('Nenhum usuário logado para atualizar o perfil.');
        }
        return GestorRequisicoesPerfil.put(`/${currentUser.id}`, profileData);
    },
    async deletarPerfil() {
        const currentUser = authService.getCurrentUser();
        if (!currentUser || !currentUser.id) {
            throw new Error('Nenhum usuário logado para deletar o perfil.');
        }
        console.warn(`[profileService] Deletando perfil do usuário ${currentUser.id}.`);
        return GestorRequisicoesPerfil.delete(`/${currentUser.id}`);
    },
};

export default profileService;
