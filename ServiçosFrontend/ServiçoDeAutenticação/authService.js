
// authService.js: Orquestrador de Autenticação (Pronto para Produção)

import { metodoGoogle } from './metodoGoogle.js';
import { metodoEmail } from './metodoEmail.js';
import profileService from './Criação.Perfil.Flux.js'; // Importa o serviço de perfil

const IS_BROWSER = typeof window !== 'undefined';

// --- GERENCIAMENTO DE SESSÃO ---

function dispatchAuthChange() {
    if (IS_BROWSER) {
        window.dispatchEvent(new CustomEvent('authChange'));
    }
}

function storeSession(token, user) {
    if (!IS_BROWSER) return;
    try {
        localStorage.setItem('authToken', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        dispatchAuthChange();
    } catch (error) {
        console.error("Falha ao armazenar a sessão no localStorage:", error);
    }
}

function clearSession() {
    if (!IS_BROWSER) return;
    try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        dispatchAuthChange();
    } catch (error) {
        console.error("Falha ao limpar a sessão do localStorage:", error);
    }
}

// --- SERVIÇO ORQUESTRADOR ---

export const authService = {
    /**
     * Orquestra o registro com email e senha.
     */
    async register(userData) {
        const { token, user } = await metodoEmail.register(userData);
        storeSession(token, user);
        return { token, user };
    },

    async loginWithGoogle(googleCredential, referredBy) {
        const { token, user } = await metodoGoogle.login(googleCredential, referredBy);
        storeSession(token, user);
        return { token, user };
    },

    async login(email, password) {
        const { token, user } = await metodoEmail.login(email, password);
        storeSession(token, user);
        return { token, user };
    },
    
    async completeProfile(profileData) {
        const token = this.getToken();
        if (!token) {
            throw new Error("Usuário não autenticado ou sessão inválida para completar o perfil.");
        }

        const updatedUserFromBackend = await profileService.atualizarPerfil(profileData);

        storeSession(token, updatedUserFromBackend);

        return updatedUserFromBackend;
    },

    logout() {
        clearSession();
    },

    isAuthenticated() {
        if (!IS_BROWSER) return false;
        return !!this.getToken();
    },

    getToken() {
        if (!IS_BROWSER) return null;
        try {
            return localStorage.getItem('authToken');
        } catch (error) {
            console.error("Falha ao obter o token do localStorage:", error);
            return null;
        }
    },

    getCurrentUser() {
        if (!IS_BROWSER) return null;
        try {
            const user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Erro ao parsear dados do usuário do localStorage:', error);
            clearSession();
            return null;
        }
    },

    getCurrentUserEmail() {
        const user = this.getCurrentUser();
        return user ? user.email : null;
    },
};
