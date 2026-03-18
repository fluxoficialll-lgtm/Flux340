
import { config } from '../ValidaçãoDeAmbiente/config';
import authApi from '../APIs/authApi.js';
import { ServicoAutenticacaoMock } from '../ServiçoDeSimulação/simulacoes/SimulacaoDeAuth.ts';

// --- Helper Function ---
const salvarSessao = (dados) => {
    if (!dados.token || !dados.user) return;

    localStorage.setItem('userToken', dados.token);
    localStorage.setItem('user', JSON.stringify(dados.user));
    window.dispatchEvent(new Event('authChange'));
};

// --- Real API-based Service ---
const realAuthService = {
    login: async (email, password) => {
        try {
            const response = await authApi.login(email, password);
            salvarSessao(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha no login';
            throw new Error(errorMessage);
        }
    },

    loginWithGoogle: async (credential, referredBy) => {
        try {
            const response = await authApi.google({ token: credential, referredBy });
            salvarSessao(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha na autenticação com o Google.';
            throw new Error(errorMessage);
        }
    },

    logout: () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
    },

    register: async (email, password, username, referredBy) => {
        try {
            const payload = { email, password, username, referredBy };
            const response = await authApi.register(email, password, username, referredBy);
            salvarSessao(response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha no registro';
            throw new Error(errorMessage);
        }
    },

    updateProfile: async (profileData) => {
        try {
            const response = await authApi.updateProfile(profileData);
            // Atualiza o usuário no localStorage se a API retornar os dados atualizados
            if (response.data.user) {
                 localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha ao atualizar perfil';
            throw new Error(errorMessage);
        }
    },

    getToken: () => localStorage.getItem('userToken'),

    isAuthenticated: () => !!localStorage.getItem('userToken'),

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        try {
            return user ? JSON.parse(user) : null;
        } catch (error) {
            realAuthService.logout();
            return null;
        }
    },
};

// --- Simulation Service Wrapper ---
const simulationServiceWrapper = {
    ...realAuthService, // Keep non-API dependent functions (getToken, getCurrentUser)

    login: async (email, password) => {
        console.log('[SIMULAÇÃO] ✅ Login solicitado.');
        const user = ServicoAutenticacaoMock.login(email, password);
        const sessionData = {
            token: 'jwt-token-simulado-qualquer-credencial-12345',
            user: user
        };
        salvarSessao(sessionData);
        console.log('[SIMULAÇÃO] ✅ Login realizado e sessão salva no localStorage.');
        return sessionData;
    },

    logout: () => {
        ServicoAutenticacaoMock.logout(); // Manages internal simulation state
        // Perform real logout actions
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        console.log('[SIMULAÇÃO] ✅ Logout realizado e sessão removida do localStorage.');
    },

    isAuthenticated: () => {
        // The source of truth is the mock service's state, but we can also check the token
        const isAuth = ServicoAutenticacaoMock.isAuthenticated();
        console.log(`[SIMULAÇÃO] ✅ Verificando autenticação: ${isAuth}`);
        return isAuth;
    },

    register: async (email, password, username) => {
        console.log('[SIMULAÇÃO] ✅ Registrando novo usuário:', { email, username });
        const user = {
            id: `simulated-${Date.now()}`,
            email: email,
            name: username,
            username: username,
            nickname: username,
            avatar: 'https://i.pravatar.cc/150?u=simulated-new',
            bio: 'Novo usuário simulado.',
            website: '',
            profile_completed: false,
            stats: { posts: 0, followers: 0, following: 0 },
            products: [],
        };
        const sessionData = {
            token: 'jwt-token-simulado-registro-12345',
            user: user
        };
        salvarSessao(sessionData);
        console.log('[SIMULAÇÃO] ✅ Registro completo e sessão salva.');
        return sessionData;
    },

    updateProfile: async (profileData) => {
        console.log('[SIMULAÇÃO] ✅ Atualizando perfil com:', profileData);
        const currentUser = realAuthService.getCurrentUser();
        const updatedUser = { ...currentUser, ...profileData, profile_completed: true };
        
        // Use the mock function to simulate backend update logic if needed
        ServicoAutenticacaoMock.completeProfile(profileData);

        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('[SIMULAÇÃO] ✅ Perfil atualizado no localStorage.');
        return { user: updatedUser };
    },

    loginWithGoogle: async () => {
        console.log('[SIMULAÇÃO] ✅ Login com Google solicitado.');
        return simulationServiceWrapper.login(); // Re-use the standard login simulation
    },
};


// --- Service Export Decision ---
let authService;

if (config.VITE_APP_ENV === 'simulation') {
  console.log('[SERVICE SELECTOR] Usando o serviço de autenticação de SIMULAÇÃO.');
  authService = simulationServiceWrapper;
} else {
  console.log('[SERVICE SELECTOR] Usando o serviço de autenticação REAL.');
  authService = realAuthService;
}

export default authService;
