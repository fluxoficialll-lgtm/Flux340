
import authApi from '../APIs/authApi.js';
import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

// Função auxiliar para salvar os dados da sessão
const salvarSessao = (dados) => {
    if (!dados.token || !dados.user) return;

    localStorage.setItem('userToken', dados.token);
    localStorage.setItem('user', JSON.stringify(dados.user));
    window.dispatchEvent(new Event('authChange'));
};

const authService = {
    login: async (email, password) => {
        try {
            // A API lida com a chamada, o serviço com a lógica de negócio
            const response = await authApi.login(email, password);
            salvarSessao(response.data);
            return response.data;
        } catch (error) {
            // Os erros já são logados pelo ClienteBackend
            const errorMessage = error.response?.data?.message || 'Falha no login';
            throw new Error(errorMessage);
        }
    },

    loginWithGoogle: async (credential, referredBy) => {
        // O ideal é a API abstrair o payload completo
        // TODO: Refatorar authApi.google para aceitar um objeto
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
        ServicoLog.info("AuthService.logout", "Sessão do usuário encerrada.");
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
    },

    register: async (email, password, username, referredBy) => {
        try {
            const payload = { email, password, username, referredBy };
             // TODO: Refatorar authApi.register para aceitar um objeto
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
            // Se a atualização de perfil retornar dados do usuário, talvez seja necessário atualizar o localStorage
            // localStorage.setItem('user', JSON.stringify(response.data.user));
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Falha ao atualizar perfil';
            throw new Error(errorMessage);
        }
    },

    // Funções que não precisam de API continuam iguais
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
            ServicoLog.erro("AuthService.getCurrentUser", "Erro ao parsear dados do usuário.", error);
            authService.logout(); // Chama o logout para limpar um estado corrompido
            return null;
        }
    },
};

export default authService;
