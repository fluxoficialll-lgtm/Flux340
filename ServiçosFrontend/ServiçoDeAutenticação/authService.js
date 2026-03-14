
import VariaveisFrontend from '../Config/Variaveis.Frontend.js';

// Função auxiliar para salvar os dados da sessão
const salvarSessao = (dados) => {
    if (!dados.token || !dados.user) return;

    localStorage.setItem('userToken', dados.token);
    // Salva o usuário como string JSON
    localStorage.setItem('user', JSON.stringify(dados.user));
    // Dispara um evento global para notificar outras partes da aplicação (ex: cabeçalho)
    window.dispatchEvent(new Event('authChange'));
};

const authService = {
    login: async (email, password) => {
        const response = await fetch(`${VariaveisFrontend.apiBaseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Mesmo em caso de erro, a API pode retornar uma mensagem útil
            throw new Error(data.message || 'Falha no login');
        }
        
        // CORREÇÃO: Salva o token e os dados do usuário no localStorage
        salvarSessao(data);
        return data;
    },

    loginWithGoogle: async (credential, referredBy) => {
        if (!credential) {
            throw new Error('Credencial do Google não fornecida.');
        }

        const response = await fetch(`${VariaveisFrontend.apiBaseUrl}/auth/google`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: credential,
                referredBy: referredBy,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Se a resposta não for OK, lança um erro com a mensagem do backend.
            throw new Error(data.message || 'Falha na autenticação com o Google.');
        }

        // Salva o token e os dados do usuário após o login bem-sucedido
        salvarSessao(data);
        return data;
    },

    logout: () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
    },

    register: async (email, password, username, referredBy) => {
        const body = { email, password, username };
        if (referredBy) {
            body.referredBy = referredBy;
        }

        const response = await fetch(`${VariaveisFrontend.apiBaseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Falha no registro');
        }

        // CORREÇÃO: Salva o token e os dados do usuário após o registro bem-sucedido
        salvarSessao(data);
        return data;
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
        // A verificação de autenticação DEVE depender do token.
        return !!localStorage.getItem('userToken');
    },

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        try {
            // Garante que o parse seja seguro
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Erro ao parsear dados do usuário do localStorage:", error);
            // Limpa dados inválidos para evitar loops de erro
            localStorage.removeItem('user');
            localStorage.removeItem('userToken');
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
