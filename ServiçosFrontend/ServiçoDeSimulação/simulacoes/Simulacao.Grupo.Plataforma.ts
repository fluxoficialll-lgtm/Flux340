
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
                    { id: 'f-1-1', name: 'Fundamentos de UX', channels: [
                        { id: 'c-1-1-1', name: 'O que é Experiência do Usuário.mp4', type: 'video' },
                        { id: 'c-1-1-2', name: 'guia_de_estilo.pdf', type: 'document' },
                    ] 
                    },
                    { id: 'f-1-2', name: 'Princípios de Design de Interface', channels: [
                        { id: 'c-1-2-1', name: 'Contraste, Repetição, Alinhamento.docx', type: 'text' },
                        { id: 'c-1-2-2', name: 'paleta_de_cores.png', type: 'image' },
                    ] 
                    }
                ]
            },
            { 
                id: 'sec-2', title: 'Módulo 2: Ferramentas e Processos', 
                folders: [
                    { id: 'f-2-1', name: 'Figma para Iniciantes', channels: [
                        { id: 'c-2-1-1', name: 'Tour pela Interface do Figma.mp4', type: 'video' },
                        { id: 'c-2-1-2', name: 'atalhos_essenciais.pdf', type: 'document' },
                    ] 
                    }
                ]
            }
        ]
    },
];

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

export const groupSalesPlatformHandlers = {
    '/api/groups/platform/:id': handleGetSalesPlatformGroup,
};