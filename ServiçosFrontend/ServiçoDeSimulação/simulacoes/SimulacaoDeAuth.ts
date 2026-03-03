
// --- SIMULAÇÃO DO SERVIÇO DE AUTENTICAÇÃO ---

import { User } from "../../../types";

// --- ESTADO DA SIMULAÇÃO ---
const mockUser: User = {
    id: 'uuid-gerado-na-simulacao',
    email: 'qualquer@email.com',
    name: 'Usuário Simulado',
    nickname: 'user_simulado',
    photoUrl: 'https://i.pravatar.cc/150?u=simulado',
    profile_completed: false,
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

// CORREÇÃO: Simplificado para sempre retornar um usuário mockado, ignorando o corpo da requisição.
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
