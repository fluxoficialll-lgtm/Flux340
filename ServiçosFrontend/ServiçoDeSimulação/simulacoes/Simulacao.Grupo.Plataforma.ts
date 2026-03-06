// --- SIMULAÇÃO DO SERVIÇO DE GRUPO COM PLATAFORMA DE VENDAS ---

// --- DADOS SIMULADOS ---
// Lista de grupos que possuem a plataforma de vendas ativada, agora com conteúdo detalhado.
export const mockPlatformGroups = [
    {
        id: 'group-4',
        creatorId: 'user-4',
        name: 'Curso de Design UX/UI',
        description: 'Aprenda os fundamentos do design de experiência do usuário.',
        memberCount: 85,
        avatar: 'https://i.pravatar.cc/150?u=ux-design',
        isPrivate: false,
        isHubModeEnabled: false,
        memberIds: ['user-4'],
        isVip: false,
        isSalesPlatformEnabled: true,
        sections: [
            {
                id: 'sec-1', title: 'Módulo 1: Introdução ao UX/UI',
                folders: [
                    { id: 'f-1-1', name: 'Fundamentos de UX', channels: [{ id: 'c-1-1-1', name: 'O que é Experiência do Usuário?', type: 'video' }] },
                    { id: 'f-1-2', name: 'Princípios de Design de Interface', channels: [{ id: 'c-1-2-1', name: 'Contraste, Repetição, Alinhamento', type: 'text' }] }
                ]
            },
            { 
                id: 'sec-2', title: 'Módulo 2: Ferramentas e Processos', 
                folders: [
                    { id: 'f-2-1', name: 'Figma para Iniciantes', channels: [{ id: 'c-2-1-1', name: 'Tour pela Interface do Figma', type: 'video' }] }
                ]
            }
        ]
    },
    {
        id: 'group-5',
        creatorId: 'user-5',
        name: 'Fotografia para Iniciantes',
        description: 'Domine sua câmera e comece a tirar fotos incríveis.',
        memberCount: 120,
        avatar: 'https://i.pravatar.cc/150?u=photography',
        isPrivate: false,
        isHubModeEnabled: false,
        memberIds: ['user-5'],
        isVip: false,
        isSalesPlatformEnabled: true,
        sections: [
            { 
                id: 'sec-3', title: 'Módulo 1: Conhecendo sua Câmera',
                folders: [
                    { id: 'f-3-1', name: 'Configurações Essenciais', channels: [{ id: 'c-3-1-1', name: 'Abertura, ISO e Velocidade', type: 'video' }] }
                ]
            }
        ]
    },
    {
        id: 'group-6',
        creatorId: 'user-6',
        name: 'Masterclass de Culinária',
        description: 'Receitas e técnicas para elevar suas habilidades na cozinha.',
        memberCount: 200,
        avatar: 'https://i.pravatar.cc/150?u=cooking-class',
        isPrivate: true,
        isHubModeEnabled: false,
        memberIds: ['user-6'],
        isVip: true,
        isSalesPlatformEnabled: true,
        sections: [
            { 
                id: 'sec-4', title: 'Módulo 1: Técnicas de Corte', 
                folders: [
                    { id: 'f-4-1', name: 'Cortes Básicos', channels: [{ id: 'c-4-1-1', name: 'Julienne, Brunoise e Chiffonade', type: 'video' }] }
                ]
            }
        ]
    },
];

// --- HANDLER ---
const handleGetSalesPlatformGroup = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/').pop() || '';
    const group = mockPlatformGroups.find(g => g.id === groupId);

    console.log(`[SIMULAÇÃO] ✅ Buscando conteúdo da plataforma para o grupo: ${groupId}`);
    
    if (group) {
        await new Promise(res => setTimeout(res, 400));
        return new Response(JSON.stringify(group), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({ message: 'Conteúdo do grupo não encontrado' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
    });
};

// --- EXPORT ---
export const groupSalesPlatformHandlers = {
    '/api/groups/platform/:id': handleGetSalesPlatformGroup,
};
