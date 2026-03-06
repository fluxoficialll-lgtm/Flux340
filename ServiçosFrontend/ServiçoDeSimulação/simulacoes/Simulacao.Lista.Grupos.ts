// --- SIMULAÇÃO DO SERVIÇO DE GRUPOS ---
import { mockPlatformGroups } from './Simulacao.Grupo.Plataforma';

// --- DADOS SIMULADOS ---
export const mockGroups = [
    {
        id: 'group-1',
        creatorId: 'user-1',
        name: 'Desenvolvedores Frontend BR',
        description: 'Grupo para desenvolvedores frontend discutirem as últimas tecnologias.',
        memberCount: 150,
        avatar: 'https://i.pravatar.cc/150?u=frontend-devs',
        isPrivate: false,
        isHubModeEnabled: true, // Habilitando o modo hub para este grupo
        memberIds: ['user-1', 'user-2'],
        channels: [],
        isVip: false,
        isSalesPlatformEnabled: false
    },
    {
        id: 'group-2',
        creatorId: 'user-2',
        name: 'Gamers de Plantão',
        description: 'Comunidade para todos os tipos de gamers.',
        memberCount: 300,
        avatar: 'https://i.pravatar.cc/150?u=gamers',
        isPrivate: false,
        isHubModeEnabled: false,
        memberIds: ['user-1', 'user-2'],
        channels: [],
        isVip: false,
        isSalesPlatformEnabled: true
    },
    {
        id: 'group-3',
        creatorId: 'user-3',
        name: 'Clube do Livro',
        description: 'Discussões mensais sobre livros de ficção e não-ficção.',
        memberCount: 50,
        avatar: 'https://i.pravatar.cc/150?u=book-club',
        isPrivate: true,
        isHubModeEnabled: false,
        memberIds: ['user-3'],
        channels: [],
        isVip: true,
        isSalesPlatformEnabled: false
    },
    // Adiciona os grupos da plataforma de vendas à lista principal
    ...mockPlatformGroups,
];

const handleGetGroups = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando lista de grupos combinada.');
    await new Promise(res => setTimeout(res, 300));

    return new Response(JSON.stringify(mockGroups), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const groupsHandlers = {
    '/api/groups': handleGetGroups,
};
