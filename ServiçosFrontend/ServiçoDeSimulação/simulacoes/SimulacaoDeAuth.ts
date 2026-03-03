
// --- SIMULAÇÃO DO SERVIÇO DE AUTENTICAÇÃO ---

import { User } from "../../../types";

// --- ESTADO DA SIMULAÇÃO ---
const mockUser: User = {
    id: 'uuid-gerado-na-simulacao',
    email: 'mock@user.com',
    name: 'Usuário Mockado',
    nickname: 'mock_user',
    photoUrl: 'https://i.pravatar.cc/150?u=mockuser',
    profile_completed: false,
};

let isAuthenticated = false;

// --- SERVIÇO DE AUTENTICAÇÃO MOCK ---
export const ServicoAutenticacaoMock = {
    login: (email?: string, password?: string): User => {
        console.log(`[SIMULAÇÃO] ✅ Tentativa de login para: ${email}`);
        isAuthenticated = true;
        // Retorna uma cópia para evitar mutações externas no objeto mockUser
        return { ...mockUser }; 
    },

    logout: (): void => {
        console.log('[SIMULAÇÃO] ✅ Usuário deslogado.');
        isAuthenticated = false;
    },

    isAuthenticated: (): boolean => {
        return isAuthenticated;
    },
    
    // Atualiza o usuário mockado e o retorna
    completeProfile: (profileData: Partial<User>): User => {
        console.log('[SIMULAÇÃO] ✅ Completando perfil com dados:', profileData);
        Object.assign(mockUser, { ...profileData, profile_completed: true });
        console.log('[SIMULAÇÃO] ✅ Perfil do usuário mockado atualizado:', mockUser);
        return { ...mockUser };
    },
};

// --- HANDLERS PARA O ORQUESTRADOR DE SIMULAÇÃO ---

const handleLogin = (): Promise<Response> => {
    const user = ServicoAutenticacaoMock.login();
    const responseBody = JSON.stringify({ 
        token: 'jwt-token-simulado-12345', 
        user 
    });
    return Promise.resolve(new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } }));
};

const handleLogout = (): Promise<Response> => {
    ServicoAutenticacaoMock.logout();
    return Promise.resolve(new Response(null, { status: 204 }));
};

// Agrupa todos os handlers de autenticação para exportação
// A rota /api/profiles/me foi removida daqui e centralizada em Simulacao.Perfil.Flux.ts
export const authHandlers = {
    '/api/auth/login': handleLogin,
    '/api/auth/logout': handleLogout,
};