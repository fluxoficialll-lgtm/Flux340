// --- SIMULAÇÃO ESPECÍFICA PARA O MODO HUB ---

// --- DADOS SIMULADOS ---
const mockHubGroupDetails: { [key: string]: any } = {
    'my-group-1': {
        id: 'my-group-1',
        name: 'Meu Grupo de Testes (Modo Hub)',
        description: 'Este é um grupo com o Modo Hub ativado para testes.',
        memberCount: 10,
        avatar: 'https://i.pravatar.cc/150?u=my-group-1',
        isPrivate: false,
        ownerId: 'user-123', // ID de usuário estático para a simulação
        isOwner: true,
        isSalesPlatformEnabled: true,
        salesPlatformSections: [
            {
                id: 'sec_1',
                name: 'Módulo Introdutório',
                folders: [
                    { id: 'fold_1', name: 'Boas-vindas', itemsCount: 2, allowDownload: true, allowMemberUpload: false },
                    { id: 'fold_2', name: 'Recursos Principais', itemsCount: 5, allowDownload: true, allowMemberUpload: false },
                ],
                channels: [
                    { id: 'ch_1', name: 'Canal de Discussão', type: 'text', onlyAdminsPost: false },
                ]
            },
            {
                id: 'sec_2',
                name: 'Módulo Avançado',
                folders: [
                    { id: 'fold_3', name: 'Estratégias de Crescimento', itemsCount: 8, allowDownload: false, allowMemberUpload: true },
                ],
                channels: [
                    { id: 'ch_2', name: 'Anúncios Importantes', type: 'text', onlyAdminsPost: true },
                    { id: 'ch_3', name: 'Laboratório de Ideias', type: 'text', onlyAdminsPost: false },
                ]
            }
        ]
    },
    'my-group-2': {
        id: 'my-group-2',
        name: 'Grupo VIP Secreto (Modo Hub)',
        description: 'Um grupo VIP com modo hub desativado.',
        memberCount: 5,
        avatar: 'https://i.pravatar.cc/150?u=my-group-2',
        isPrivate: true,
        ownerId: 'user-123',
        isOwner: true,
        isSalesPlatformEnabled: false,
        salesPlatformSections: []
    },
     'my-group-3': {
        id: 'my-group-3',
        name: 'Grupo VIP Exclusivo (Modo Hub)',
        description: 'Acesso exclusivo para membros VIP.',
        memberCount: 25,
        avatar: 'https://i.pravatar.cc/150?u=my-group-3',
        isPrivate: true,
        isVip: true,
        ownerId: 'user-123',
        isOwner: true,
        isSalesPlatformEnabled: true,
        salesPlatformSections: [
            {
                id: 'sec_vip_1',
                name: 'Benefícios VIP',
                folders: [
                    { id: 'fold_vip_1', name: 'Downloads Exclusivos', itemsCount: 12, allowDownload: true, allowMemberUpload: false },
                ],
                channels: [
                    { id: 'ch_vip_1', name: 'Canal VIP', type: 'text', onlyAdminsPost: true },
                ]
            }
        ]
    },
};

// --- HANDLER PARA DETALHES DO GRUPO (MODO HUB) ---
const handleGetGroupDetailsForHub = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/').pop() || '';
    const group = mockHubGroupDetails[groupId];

    console.log(`[SIMULAÇÃO MODO HUB] ✅ Buscando detalhes para o grupo: ${groupId}`);

    if (group) {
        await new Promise(res => setTimeout(res, 250)); // Simula latência de rede
        return new Response(JSON.stringify(group), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Grupo não encontrado na simulação do Modo Hub' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

// --- EXPORT DOS HANDLERS DO MODO HUB ---
export const modoHubHandlers = {
    '/api/groups/:id': handleGetGroupDetailsForHub,
};