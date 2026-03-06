// --- SIMULAÇÃO DO SERVIÇO DE DETALHES DE GRUPOS ---

// --- DADOS SIMULADOS ---
const mockGroupDetails: { [key: string]: any } = {
    'group-1': {
        id: 'group-1',
        creatorId: 'user-1',
        name: 'Desenvolvedores Frontend BR',
        description: 'Grupo para desenvolvedores frontend discutirem as últimas tecnologias.',
        memberCount: 150,
        avatar: 'https://i.pravatar.cc/150?u=frontend-devs',
        isPrivate: false,
        isHubModeEnabled: true, // Habilitado para corresponder à lista
        isVip: false,
        isSalesPlatformEnabled: false,
        ownerId: 'user-1',
        creatorEmail: 'dev@email.com',
        isOwner: true,
        memberIds: ['user-1', 'user-2'],
        salesPlatformSections: [] // Estrutura básica
    },
    'group-2': {
        id: 'group-2',
        creatorId: 'user-2',
        name: 'Gamers de Plantão',
        description: 'Comunidade para todos os tipos de gamers.',
        memberCount: 300,
        avatar: 'https://i.pravatar.cc/150?u=gamers',
        isPrivate: false,
        isHubModeEnabled: false,
        isVip: false,
        isSalesPlatformEnabled: true,
        ownerId: 'user-2',
        creatorEmail: 'gamer@email.com',
        isOwner: false,
        memberIds: ['user-1', 'user-2'],
        salesPlatformSections: []
    },
    'group-3': {
        id: 'group-3',
        creatorId: 'user-3',
        name: 'Clube do Livro',
        description: 'Discussões mensais sobre livros de ficção e não-ficção.',
        memberCount: 50,
        avatar: 'https://i.pravatar.cc/150?u=book-club',
        isPrivate: true,
        isHubModeEnabled: false,
        isVip: true,
        isSalesPlatformEnabled: false,
        ownerId: 'user-3',
        creatorEmail: 'books@email.com',
        isOwner: false,
        memberIds: ['user-3'],
        salesPlatformSections: []
    },
};

const mockGroupStructure: { [key: string]: any } = {
    'group-1': {
        isSalesPlatformEnabled: true,
        structure: {
            folders: [
                { id: 'folder-1', name: 'Recursos Introdutórios', fileCount: 5 },
                { id: 'folder-2', name: 'Materiais Avançados', fileCount: 8 },
            ]
        }
    },
    'group-2': {
        isSalesPlatformEnabled: false,
        structure: { folders: [] }
    },
    'group-3': {
        isSalesPlatformEnabled: true,
        structure: {
            folders: [
                { id: 'folder-vip-1', name: 'Boas-vindas VIP', fileCount: 1 },
            ]
        }
    }
};

// --- HANDLERS ---
const handleGetGroupDetails = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/').pop() || '';
    const group = mockGroupDetails[groupId];

    console.log(`[SIMULAÇÃO] ✅ Buscando detalhes para o grupo: ${groupId}`);

    if (group) {
        await new Promise(res => setTimeout(res, 400));
        return new Response(JSON.stringify(group), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        console.error(`[SIMULAÇÃO] ❌ Grupo não encontrado para o ID: ${groupId}`);
        return new Response(JSON.stringify({ message: 'Grupo não encontrado' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

const handleGetGroupStructure = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupIdMatch = url.pathname.match(/groups\/([\w-]+)\/structure/);
    const groupId = groupIdMatch ? groupIdMatch[1] : '';
    const structure = mockGroupStructure[groupId];
    
    console.log(`[SIMULAÇÃO] ✅ Buscando estrutura para o grupo: ${groupId}`);

    const responseData = structure || { isSalesPlatformEnabled: false, structure: { folders: [] } };
    
    await new Promise(res => setTimeout(res, 350));
    return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

// --- EXPORT ---
export const groupDetailsHandlers = {
    '/api/groups/:id': handleGetGroupDetails,
    '/api/groups/mine/:id': handleGetGroupDetails,
    '/api/groups/:id/structure': handleGetGroupStructure,
};
