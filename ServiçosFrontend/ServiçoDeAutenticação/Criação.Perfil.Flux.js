
/**
 * @file Serviço para gestão de perfis de usuário no Flux.
 * Unifica a lógica de criação, busca e atualização de perfis, usando endpoints seguros (/me).
 */

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
            const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'A resposta da API não pôde ser lida.' }));
                throw new Error(errorData.message || `Erro ${response.status} na API de perfis.`);
            }

            if (response.status === 204) { // No Content
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
    /**
     * Busca o perfil público de qualquer usuário pelo ID.
     */
    async getUserProfile(userId) {
        if (!userId) throw new Error('O ID do usuário é obrigatório para buscar o perfil.');
        return GestorRequisicoesPerfil.get(`/${userId}`);
    },

    /**
     * Busca o perfil do usuário autenticado usando o endpoint /me.
     */
    async getMyProfile() {
        return GestorRequisicoesPerfil.get('/me');
    },

    /**
     * Atualiza o perfil do usuário autenticado. O backend identifica o usuário pelo token.
     * @param {object} profileData - Os dados do perfil a serem atualizados.
     */
    async atualizarPerfil(profileData) {
        // A chamada para /me garante que o usuário só pode atualizar seu próprio perfil.
        return GestorRequisicoesPerfil.put('/me', profileData);
    },

    /**
     * Deleta o perfil do usuário autenticado. O backend identifica o usuário pelo token.
     */
    async deletarPerfil() {
        console.warn(`[profileService] Iniciando exclusão do perfil do usuário logado.`);
        // A chamada para /me garante que o usuário só pode deletar seu próprio perfil.
        return GestorRequisicoesPerfil.delete('/me');
    },
};

export default profileService;
