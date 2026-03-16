
// --- SIMULAÇÃO DO SERVIÇO DE DETALHES DE GRUPO ---

// --- DADOS SIMULADOS ---

// Mock para os detalhes de múltiplos grupos
export const mockGroupDetails = {
    'my-group-1': {
        id: 'my-group-1',
        name: 'Meu Grupo de Testes',
        description: 'Este é um grupo que eu possuo para testar funcionalidades.',
        memberCount: 10,
        avatar: 'https://i.pravatar.cc/150?u=my-group-1',
        isPrivate: false,
        ownerId: 'user-123',
        creatorEmail: 'qualquer@email.com',
        isSalesPlatformEnabled: false,
    },
    'my-group-2': {
        id: 'my-group-2',
        name: 'Grupo VIP Secreto',
        description: 'Um grupo VIP super exclusivo que eu administro.',
        memberCount: 5,
        avatar: 'https://i.pravatar.cc/150?u=my-group-2',
        isPrivate: true,
        ownerId: 'user-123',
        creatorEmail: 'qualquer@email.com',
        isSalesPlatformEnabled: true,
    },
    'my-group-3': {
        id: 'my-group-3',
        name: 'Grupo VIP Exclusivo',
        description: 'Acesso exclusivo para membros VIP.',
        memberCount: 25,
        avatar: 'https://i.pravatar.cc/150?u=my-group-3',
        isPrivate: true,
        isVip: true,
        ownerId: 'user-123',
        creatorEmail: 'qualquer@email.com',
        isSalesPlatformEnabled: true,
    }
};

// --- HANDLERS DINÂMICOS ---

const createGroupDetailsHandler = (groupId: string) => {
    return async (url: URL): Promise<Response> => {
        console.log(`[SIMULAÇÃO] ✅ Buscando detalhes para o grupo ${groupId}.`);
        
        const groupData = mockGroupDetails[groupId];

        if (groupData) {
            await new Promise(res => setTimeout(res, 500)); // Simula atraso de rede
            return new Response(JSON.stringify(groupData), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            console.error(`[SIMULAÇÃO] ❌ Grupo com ID ${groupId} não encontrado.`);
            return new Response(JSON.stringify({ message: 'Grupo não encontrado' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    };
};

// --- EXPORTAÇÃO DOS HANDLERS ---

// Gera um handler para cada grupo mockado, criando rotas estáticas
export const groupDetailsHandlers = Object.keys(mockGroupDetails).reduce((handlers, groupId) => {
    handlers[`/api/groups/${groupId}`] = createGroupDetailsHandler(groupId);
    return handlers;
}, {} as Record<string, (url: URL) => Promise<Response>>);
