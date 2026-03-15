
import VariaveisFrontend from '../Config/Variaveis.Frontend.js';
import { controleDeSimulacao } from '../ServiçoDeSimulação/ControleDeSimulacao.js';

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
        if (controleDeSimulacao.estaAtivo()) {
            console.log(`(Simulado) Buscando perfil para userId: ${userId}`);
            const currentUser = authService.getCurrentUser();

            const isOwnProfile = currentUser && currentUser.id === userId;

            return Promise.resolve({
                id: userId,
                name: isOwnProfile ? (currentUser.name || "Usuário Simulado") : "Outro Usuário",
                nickname: isOwnProfile ? (currentUser.nickname || "simulado_user") : "outro_user",
                email: isOwnProfile ? (currentUser.email || "simulado@example.com") : "outro@example.com",
                photo_url: "https://i.pravatar.cc/150?u=" + userId,
                bio: "Este é um perfil de usuário simulado para fins de desenvolvimento e teste.",
                website: "https://simulado.flux.com",
                posts_count: 42,
                followers_count: 1337,
                following_count: 300,
                isFollowing: !isOwnProfile,
                posts: [
                    { id: 1, type: 'image', url: 'https://picsum.photos/seed/post1/500' },
                    { id: 2, type: 'video', url: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4' },
                    { id: 3, type: 'image', url: 'https://picsum.photos/seed/post2/500' },
                ],
                products: [
                    { id: 1, name: "Produto Simulado 1", price: "R$ 99,90", image: "https://picsum.photos/seed/prod1/300" },
                    { id: 2, name: "Produto Simulado 2", price: "R$ 49,90", image: "https://picsum.photos/seed/prod2/300" },
                ],
                photos: [
                     { id: 1, url: 'https://picsum.photos/seed/photo1/500' },
                     { id: 2, url: 'https://picsum.photos/seed/photo2/500' },
                ],
                reels: [
                    { id: 1, url: 'https://videos.pexels.com/video-files/3209828/3209828-hd_1280_720_25fps.mp4' },
                ]
            });
        }

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
