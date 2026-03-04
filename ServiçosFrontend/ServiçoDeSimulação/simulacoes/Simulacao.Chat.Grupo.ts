
// --- SIMULAÇÃO DO SERVIÇO DE CHAT DE GRUPO ---

const mockGroupChats = {
    'group-1': {
        id: 'group-1',
        name: 'Desenvolvedores Frontend BR',
        participants: [ { name: 'Ana', avatar: 'https://i.pravatar.cc/150?u=ana-dev' }, { name: 'Bruno', avatar: 'https://i.pravatar.cc/150?u=bruno-dev' }, { name: 'Você', avatar: 'https://i.pravatar.cc/150?u=me' } ],
        messages: [
            { id: 'g1-msg-1', text: 'Alguém já testou o novo beta do React 19?', senderId: 'ana', senderName: 'Ana', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString() },
            { id: 'g1-msg-2', text: 'Ainda não, mas estou ansioso pelos novos hooks!', senderId: 'bruno', senderName: 'Bruno', timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString() },
        ]
    },
    'group-2': {
        id: 'group-2',
        name: 'Gamers de Plantão',
        participants: [ { name: 'Carlos', avatar: 'https://i.pravatar.cc/150?u=carlos-gamer' }, { name: 'Dani', avatar: 'https://i.pravatar.cc/150?u=dani-gamer' }, { name: 'Você', avatar: 'https://i.pravatar.cc/150?u=me' } ],
        messages: [
            { id: 'g2-msg-1', text: 'Bora fechar a raid hoje à noite?', senderId: 'carlos', senderName: 'Carlos', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
            { id: 'g2-msg-2', text: 'Fechado! Começamos às 21h?', senderId: 'dani', senderName: 'Dani', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
        ]
    },
    'group-3': {
        id: 'group-3',
        name: 'Clube do Livro',
        participants: [ { name: 'Elisa', avatar: 'https://i.pravatar.cc/150?u=elisa-leitora' }, { name: 'Você', avatar: 'https://i.pravatar.cc/150?u=me' } ],
        messages: [ { id: 'g3-msg-1', text: 'O que acharam do final do livro deste mês?', senderId: 'elisa', senderName: 'Elisa', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString() } ]
    }
};

const handleGetGroupChatDetails = async (url: URL, config?: RequestInit): Promise<Response> => {
    // --- CORREÇÃO CIRÚRGICA ---
    // Extrai o ID do grupo da URL de forma robusta, lidando com barras finais.
    // Ex: /api/group-chat/group-1/ -> split -> ['', 'api', 'group-chat', 'group-1', ''] -> filter -> ['api', 'group-chat', 'group-1'] -> pop -> 'group-1'
    const pathParts = url.pathname.split('/').filter(part => part !== '');
    const groupId = pathParts[pathParts.length - 1];

    console.log(`[SIMULAÇÃO] ✅ Buscando chat do grupo com ID extraído: '${groupId}'`);

    // @ts-ignore
    const chat = mockGroupChats[groupId];

    if (chat) {
        return new Response(JSON.stringify(chat), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        console.error(`[SIMULAÇÃO] ❌ Chat para o grupo ID '${groupId}' não encontrado nos mocks.`);
        return new Response(JSON.stringify({ message: "Grupo não encontrado" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};

// A exportação permanece a mesma, pois a lógica de roteamento está no index.
export const groupChatHandlers = {
    '/api/group-chat/:groupId': handleGetGroupChatDetails,
};
