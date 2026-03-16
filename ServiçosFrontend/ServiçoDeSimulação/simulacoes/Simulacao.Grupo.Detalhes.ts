// --- SIMULAÇÃO DE DADOS PARA DETALHES DO GRUPO ---

const mockGroupDetails = {
    'my-group-1': {
        id: 'my-group-1',
        name: 'Meu Grupo de Testes',
        description: 'Este é um grupo que eu possuo para testar funcionalidades.',
        totalMembers: 10,
        avatarUrl: 'https://i.pravatar.cc/150?u=my-group-1',
        coverUrl: 'https://via.placeholder.com/1500x500/111/fff?text=Capa+Meu+Grupo',
        isPrivate: false,
        isVip: false,
        isOwner: true,
    },
    'my-group-2': {
        id: 'my-group-2',
        name: 'Grupo VIP Secreto',
        description: 'Um grupo VIP super exclusivo que eu administro.',
        totalMembers: 5,
        avatarUrl: 'https://i.pravatar.cc/150?u=my-group-2',
        coverUrl: 'https://via.placeholder.com/1500x500/222/fff?text=Capa+Grupo+VIP',
        isPrivate: true,
        isVip: true,
        isOwner: true,
    },
    'my-group-3': {
        id: 'my-group-3',
        name: 'Grupo VIP Exclusivo',
        description: 'Acesso exclusivo para membros VIP.',
        totalMembers: 25,
        avatarUrl: 'https://i.pravatar.cc/150?u=my-group-3',
        coverUrl: 'https://via.placeholder.com/1500x500/333/fff?text=Capa+VIP+Exclusivo',
        isPrivate: true,
        isVip: true,
        isOwner: true,
    },
}; 

const handleGetGroupDetails = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/').pop() || '';
    const group = mockGroupDetails[groupId] || Object.values(mockGroupDetails)[0]; // Fallback

    console.log(`[SIMULAÇÃO] ✅ Buscando detalhes para o grupo: ${groupId}`);

    if (group) {
        await new Promise(res => setTimeout(res, 220));
        return new Response(JSON.stringify(group), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Grupo não encontrado' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

export const groupDetailsHandlers = {
    '/api/groups/:groupId': handleGetGroupDetails,
};
