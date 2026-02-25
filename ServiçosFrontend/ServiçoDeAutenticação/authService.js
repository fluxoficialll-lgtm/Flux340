
// Ponte Frontend: Serviço de Autenticação
// Este serviço faz a comunicação entre a UI (hooks) e a API do backend.

const API_URL = '/api/auth';
const IS_BROWSER = typeof window !== 'undefined';

/**
 * Dispara um evento customizado para notificar a aplicação sobre mudanças na autenticação.
 */
function dispatchAuthChange() {
    if (IS_BROWSER) {
        window.dispatchEvent(new CustomEvent('authChange'));
    }
}

/**
 * Armazena o token e os dados do usuário no localStorage.
 * @param {string} token - O token JWT.
 * @param {object} user - Os dados do usuário.
 */
function storeSession(token, user) {
    if (!IS_BROWSER) return;
    try {
        if (token) localStorage.setItem('authToken', token);
        if (user) localStorage.setItem('currentUser', JSON.stringify(user));
        dispatchAuthChange(); // Notifica a aplicação sobre a mudança
    } catch (error) {
        console.error("Falha ao armazenar a sessão no localStorage:", error);
    }
}

/**
 * Remove a sessão do localStorage.
 */
function clearSession() {
    if (!IS_BROWSER) return;
    try {
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        dispatchAuthChange(); // Notifica a aplicação sobre a mudança
    } catch (error) {
        console.error("Falha ao limpar a sessão do localStorage:", error);
    }
}

export const authService = {
    async loginWithGoogle(googleCredential, referredBy) {
        const response = await fetch(`${API_URL}/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: googleCredential, referredBy }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha no login com Google');
        }

        const data = await response.json();
        storeSession(data.token, data.user);
        return data;
    },

    async login(email, password) {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Credenciais inválidas');
        }

        const data = await response.json();
        storeSession(data.token, data.user);
        return data;
    },

    logout() {
        clearSession();
    },

    isAuthenticated() {
        if (!IS_BROWSER) return false;
        try {
            return !!localStorage.getItem('authToken');
        } catch (error) {
            console.error("Falha ao verificar autenticação no localStorage:", error);
            return false;
        }
    },

    getCurrentUser() {
        if (!IS_BROWSER) return null;
        try {
            const user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Erro ao parsear dados do usuário:', error);
            clearSession(); // Limpa a sessão corrompida
            return null;
        }
    },
    
    getCurrentUserEmail() {
        const user = this.getCurrentUser();
        return user ? user.email : null;
    },

    async getUnreadCount() {
        console.log("[Auth Mock] Contando notificações não lidas...");
        return Promise.resolve(0);
    }
};
