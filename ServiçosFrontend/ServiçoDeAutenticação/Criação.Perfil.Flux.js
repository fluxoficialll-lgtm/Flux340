
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
            
            const responseText = await response.text();

            if (!response.ok) {
                let errorMessage = `Erro ${response.status} na API de perfis.`;
                if (responseText) {
                    try {
                        const errorData = JSON.parse(responseText);
                        errorMessage = errorData.message || errorMessage;
                    } catch (e) {
                        // Se não for JSON, pode ser uma mensagem de erro em texto puro.
                        // Evita retornar HTML de páginas de erro.
                        errorMessage = responseText.trim().startsWith('<') ? 'Ocorreu um erro no servidor.' : responseText;
                    }
                }
                throw new Error(errorMessage);
            }

            if (response.status === 204 || !responseText) {
                // Retorna objeto vazio para 'No Content' ou respostas com corpo vazio.
                return {};
            }

            try {
                // Tenta parsear a resposta como JSON.
                return JSON.parse(responseText);
            } catch (error) {
                console.error('Falha ao parsear a resposta JSON do servidor:', responseText);
                throw new Error('A resposta do servidor não é um JSON válido.');
            }

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
