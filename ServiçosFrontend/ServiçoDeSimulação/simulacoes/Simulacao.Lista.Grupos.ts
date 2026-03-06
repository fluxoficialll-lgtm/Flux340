// --- SIMULAÇÃO DO SERVIÇO DE GRUPOS ---

// --- DADOS SIMULADOS ---
export const mockGroups = [
    {
        id: 'group-1',
        name: 'Desenvolvedores Frontend BR',
        description: 'Grupo para desenvolvedores frontend discutirem as últimas tecnologias.',
        memberCount: 150,
        avatar: 'https://i.pravatar.cc/150?u=frontend-devs',
        isPrivate: false,
        navigateTo: '/groups/sales-platform/group-1', // Adicionado para simular navegação
    },
    {
        id: 'group-2',
        name: 'Gamers de Plantão',
        description: 'Comunidade para todos os tipos de gamers.',
        memberCount: 300,
        avatar: 'https://i.pravatar.cc/150?u=gamers',
        isPrivate: false,
        navigateTo: '/groups/sales-platform/group-2', // Adicionado para simular navegação
    },
    {
        id: 'group-3',
        name: 'Clube do Livro',
        description: 'Discussões mensais sobre livros de ficção e não-ficção.',
        memberCount: 50,
        avatar: 'https://i.pravatar.cc/150?u=book-club',
        isPrivate: true,
        navigateTo: '/groups/sales-platform/group-3', // Adicionado para simular navegação
    },
];

const handleGetGroups = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando lista de grupos.');
    await new Promise(res => setTimeout(res, 300));

    return new Response(JSON.stringify(mockGroups), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const groupsHandlers = {
    '/api/groups': handleGetGroups,
};
