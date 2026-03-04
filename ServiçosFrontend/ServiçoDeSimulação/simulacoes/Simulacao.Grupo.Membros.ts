
// --- SIMULAÇÃO DO SERVIÇO DE MEMBROS DE GRUPO ---

import { User } from "../../../types";

// --- DADOS SIMULADOS --
const mockMembers: User[] = [
    {
        id: 'simulated-user-1',
        name: 'Ana Clara',
        username: 'anaclara',
        email: 'ana@email.com',
        avatar: 'https://i.pravatar.cc/150?u=ana',
        profile_completed: true,
    },
    {
        id: 'simulated-user-2',
        name: 'Beto Martins',
        username: 'betomartins',
        email: 'beto@email.com',
        avatar: 'https://i.pravatar.cc/150?u=beto',
        profile_completed: true,
    },
    {
        id: 'uuid-gerado-na-simulacao', // ID do usuário logado na simulação
        name: 'Usuário Simulado',
        username: 'user_simulado',
        email: 'qualquer@email.com',
        avatar: 'https://i.pravatar.cc/150?u=simulado',
        profile_completed: true,
    },
     {
        id: 'simulated-user-3',
        name: 'Carlos Zuccato',
        username: 'zuccato',
        email: 'zuccato@email.com',
        avatar: 'https://i.pravatar.cc/150?u=zuccato',
        profile_completed: true,
    },
];

// --- HANDLER PARA A ROTA --
const handleGetGroupMembers = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log(`[SIMULAÇÃO] ✅ Buscando membros para o grupo. URL: ${url.pathname}`);
    await new Promise(res => setTimeout(res, 450)); // Simula atraso de rede

    return new Response(JSON.stringify({ members: mockMembers, pending: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

// O handler será registrado para uma rota dinâmica no orquestrador principal.
export const groupMembersHandlers = {
    '/api/groups/:groupId/members': handleGetGroupMembers,
};

