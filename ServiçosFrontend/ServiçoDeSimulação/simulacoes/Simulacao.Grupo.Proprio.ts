// --- SIMULAÇÃO DO SERVIÇO DE GRUPOS DO USUÁRIO ---

// --- DADOS SIMULADOS ---
const myMockGroups = [
    {
        id: 'my-group-1',
        name: 'Meu Grupo de Testes',
        description: 'Este é um grupo que eu possuo para testar funcionalidades.',
        memberCount: 10,
        avatar: 'https://i.pravatar.cc/150?u=my-group-1',
        isPrivate: false,
        ownerId: 'user-123', // Assuming a simulated user ID
        creatorEmail: 'qualquer@email.com', // Added for creator check
        isOwner: true,
    },
    {
        id: 'my-group-2',
        name: 'Grupo VIP Secreto',
        description: 'Um grupo VIP super exclusivo que eu administro.',
        memberCount: 5,
        avatar: 'https://i.pravatar.cc/150?u=my-group-2',
        isPrivate: true,
        ownerId: 'user-123',
        creatorEmail: 'qualquer@email.com', // Added for creator check
        isOwner: true,
    },
    {
        id: 'my-group-3',
        name: 'Grupo VIP Exclusivo',
        description: 'Acesso exclusivo para membros VIP.',
        memberCount: 25,
        avatar: 'https://i.pravatar.cc/150?u=my-group-3',
        isPrivate: true,
        isVip: true,
        ownerId: 'user-123',
        creatorEmail: 'qualquer@email.com',
        isOwner: true,
    },
];

const handleGetMyGroups = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando lista dos meus grupos.');
    await new Promise(res => setTimeout(res, 200));

    return new Response(JSON.stringify(myMockGroups), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const groupDetailsHandlers = {
    '/api/groups/mine': handleGetMyGroups,
};
