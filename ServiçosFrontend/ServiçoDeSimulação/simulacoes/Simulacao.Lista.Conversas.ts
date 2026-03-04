
// --- SIMULAÇÃO DO SERVIÇO DE CONVERSAS ---

const mockConversations = [
    {
        id: 'chat-1', // ID alinhado com Simulacao.Chat.ts
        name: 'Alice',
        lastMessage: 'Tudo ótimo! E com você?',
        timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
        unread: 0,
        avatar: 'https://i.pravatar.cc/150?u=alice',
        handle: 'alice'
    },
    {
        id: 'chat-2', // ID alinhado com Simulacao.Chat.ts
        name: 'Beto',
        lastMessage: 'E aí, vamos jogar hoje?',
        timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
        unread: 1,
        avatar: 'https://i.pravatar.cc/150?u=beto',
        handle: 'beto_gamer'
    },
];

const handleGetConversations = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando lista de conversas no endpoint corrigido (/api/conversas).');
    await new Promise(res => setTimeout(res, 300));

    return new Response(JSON.stringify(mockConversations), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const conversationsHandlers = {
    // CORREÇÃO REVERTIDA: Voltando para /api/conversas para corresponder à chamada do frontend.
    '/api/conversas': handleGetConversations,
};
