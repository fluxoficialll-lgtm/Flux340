
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

let isAuthenticated = false;

// --- SERVIÇO DE AUTENTICAÇÃO MOCK ---
export const ServicoAutenticacaoMock = {
    /**
     * Simula o login do usuário. No modo de simulação, qualquer credencial é válida.
     * @param {string} [email] - O e-mail fornecido (ignorado).
     * @param {string} [password] - A senha fornecida (ignorada).
     * @returns {User} O objeto do usuário mockado.
     */
    login: (email?: string, password?: string): User => {
        console.log(`[SIMULAÇÃO] ✅ Login solicitado com e-mail: ${email}. Credenciais aceitas automaticamente.`);
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

/**
 * Manipulador para a rota de login (/api/auth/login).
 * Simula uma resposta de login bem-sucedida para qualquer requisição, 
 * retornando um token e os dados do usuário mockado.
 */
const handleLogin = async (url: URL, config?: RequestInit): Promise<Response> => {
    // No modo de simulação, não validamos as credenciais.
    // Apenas chamamos o serviço de login mock para manter o estado.
    const user = ServicoAutenticacaoMock.login();
    
    const responseBody = JSON.stringify({ 
        token: 'jwt-token-simulado-qualquer-credencial-12345', 
        user 
    });
    
    // Simula um pequeno atraso de rede para uma experiência mais realista
    await new Promise(res => setTimeout(res, 300));

    return new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
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