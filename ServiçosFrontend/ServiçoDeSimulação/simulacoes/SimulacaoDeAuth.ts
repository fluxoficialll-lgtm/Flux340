
// --- SIMULAÇÃO DO SERVIÇO DE AUTENTICAÇÃO ---

import { User } from "../../../types";

// --- ESTADO DA SIMULAÇÃO ---
// CORREÇÃO: O usuário mockado agora inclui todos os campos esperados pela interface de perfil.
const mockUser: User = {
    id: 'uuid-gerado-na-simulacao',
    email: 'qualquer@email.com',
    name: 'Usuário Simulado',
    username: 'user_simulado', // Adicionado
    nickname: 'Simulado',      // Alterado para um nome mais amigável
    avatar: 'https://i.pravatar.cc/150?u=simulado', // Renomeado de photoUrl
    bio: 'Este é um perfil simulado para fins de desenvolvimento. Explorando o universo Flux!', // Adicionado
    website: 'https://flux.plus', // Adicionado
    profile_completed: true, // Alterado para true
    stats: { // Adicionado o objeto de estatísticas
        posts: 15,
        followers: 1337,
        following: 42,
    },
};

// --- SERVIÇO DE AUTENTICAÇÃO MOCK ---
export const ServicoAutenticacaoMock = {
    login: (email?: string, password?: string): User => {
        console.log(`[SIMULAÇÃO] ✅ Login solicitado. Persistindo estado no localStorage.`);
        localStorage.setItem('isSimulating', 'true');
        return { ...mockUser };
    },

    logout: (): void => {
        console.log('[SIMULAÇÃO] ✅ Usuário deslogado. Removendo estado do localStorage.');
        localStorage.removeItem('isSimulating');
    },

    isAuthenticated: (): boolean => {
        const isAuth = localStorage.getItem('isSimulating') === 'true';
        return isAuth;
    },

    completeProfile: (profileData: Partial<User>): User => {
        console.log('[SIMULAÇÃO] ✅ Completando perfil com dados:', profileData);
        Object.assign(mockUser, { ...profileData, profile_completed: true });
        return { ...mockUser };
    },
};

// --- HANDLERS PARA O ORQUESTRADOR DE SIMULAÇÃO ---

const handleLogin = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log("[SIMULAÇÃO] Interceptando requisição de login.");
    const user = ServicoAutenticacaoMock.login();
    const responseBody = JSON.stringify({
        token: 'jwt-token-simulado-qualquer-credencial-12345',
        user
    });
    await new Promise(res => setTimeout(res, 300)); // Simula atraso de rede
    return new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
};

const handleLogout = (): Promise<Response> => {
    ServicoAutenticacaoMock.logout();
    const responseBody = JSON.stringify({});
    return Promise.resolve(new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } }));
};

export const authHandlers = {
    '/api/auth/login': handleLogin,
    '/api/auth/logout': handleLogout,
};
