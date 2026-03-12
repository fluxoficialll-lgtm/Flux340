import VariaveisFrontend from '../Config/Variaveis.Frontend.js';

const authService = {
    login: async (email, password) => {
        const response = await fetch(`${VariaveisFrontend.apiBaseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Falha no login');
        }
        return response.json();
    },

    loginWithGoogle: async (credential, referredBy) => {
        console.error("A função loginWithGoogle não está implementada.");
        throw new Error("Login com Google não está disponível no momento.");
    },

    logout: () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
    },

    register: async (email, password, username) => {
        const response = await fetch(`${VariaveisFrontend.apiBaseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, username }),
        });
        if (!response.ok) {
            throw new Error('Falha no registro');
        }
        return response.json();
    },

    getProfile: async (userId) => {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`${VariaveisFrontend.apiBaseUrl}/profile/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
        });
        if (!response.ok) {
            throw new Error('Falha ao buscar perfil');
        }
        return response.json();
    },

    updateProfile: async (profileData) => {
        const token = localStorage.getItem('userToken');
        const response = await fetch(`${VariaveisFrontend.apiBaseUrl}/profile`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(profileData),
        });
        if (!response.ok) {
            throw new Error('Falha ao atualizar perfil');
        }
        return response.json();
    },

    getToken: () => {
        return localStorage.getItem('userToken');
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('userToken');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        try {
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Erro ao parsear dados do usuário do localStorage:", error);
            return null;
        }
    },

    sendVerificationCode: async (email) => {
        console.log(`(Simulado) Código de verificação enviado para ${email}`);
        return Promise.resolve();
    },

    verifyCode: async (email, code) => {
        console.log(`(Simulado) Verificando código ${code} para ${email}`);
        if (code === '123456') {
            return Promise.resolve({ success: true });
        }
        return Promise.reject(new Error('Código de verificação inválido.'));
    }
};

export default authService;
