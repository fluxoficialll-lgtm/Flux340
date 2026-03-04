
// --- SIMULAÇÃO DO SERVIÇO DE CHAT (DETALHES DA CONVERSA) ---

// --- DADOS SIMULADOS ---

// Simula um banco de dados de chats
export const mockChats = {
    'chat-1': {
        id: 'chat-1',
        participants: [
            { name: 'Alice', avatar: 'https://i.pravatar.cc/150?u=alice' },
            { name: 'Você', avatar: 'https://i.pravatar.cc/150?u=me' } 
        ],
        messages: [
            { id: 'msg-1', text: 'Olá! Tudo bem?', sender: 'Alice', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
            { id: 'msg-2', text: 'Tudo ótimo! E com você?', sender: 'Você', timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString() },
            { id: 'msg-3', text: 'Também, obrigado por perguntar.', sender: 'Alice', timestamp: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
        ]
    },
    'chat-2': {
        id: 'chat-2',
        participants: [
            { name: 'Beto', avatar: 'https://i.pravatar.cc/150?u=beto' },
            { name: 'Você', avatar: 'https://i.pravatar.cc/150?u=me' } 
        ],
        messages: [
            { id: 'msg-4', text: 'E aí, vamos jogar hoje?', sender: 'Beto', timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
        ]
    },
};

// --- HANDLER PARA A API ---
const handleGetChatDetails = async (url: URL, config?: RequestInit): Promise<Response> => {
    const chatId = url.pathname.split('/').pop(); // Extrai o ID do chat da URL
    console.log(`[SIMULAÇÃO] ✅ Buscando detalhes para o chat ID: ${chatId}`);
    
    await new Promise(res => setTimeout(res, 300)); // Simula atraso de rede

    // @ts-ignore
    const chat = mockChats[chatId];

    if (chat) {
        return new Response(JSON.stringify(chat), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        return new Response(JSON.stringify({ message: 'Chat não encontrado' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};


// --- EXPORTAÇÃO DOS HANDLERS ---
// Usamos um padrão de rota para capturar qualquer ID de chat
export const chatDetailsHandlers = {
    '/api/conversations/:chatId': handleGetChatDetails,
};
