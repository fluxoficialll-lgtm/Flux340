
import { Group, Message } from "../../../types";

// --- DADOS SIMULADOS ---

// 1. Detalhes do Grupo
const mockGroupDetails: Group = {
    id: 'group-1',
    name: 'Grupo de Teste Principal',
    description: 'Descrição do grupo de teste.',
    avatarUrl: 'https://i.pravatar.cc/200?u=group1', // Corrigido para avatarUrl
    creatorId: 'simulated-user-1',
    adminIds: ['simulated-user-2'],
    tags: ['dev', 'react', 'simulação'],
    userRoles: { 'simulated-user-1': 'Dono', 'simulated-user-2': 'Admin' },
    channels: [{ id: 'general', name: 'Geral', type: 'text' }],
    monetization: 'vip',
    visibility: 'private',
};

// 2. Mensagens do Chat
const mockMessages: Message[] = [
    {
        id: 'msg-1',
        senderEmail: 'admin@simulado.com', // Corrigido para senderEmail
        senderName: 'Admin Simulado',
        senderAvatar: 'https://i.pravatar.cc/150?u=admin',
        text: 'Bem-vindo ao chat do grupo de teste! Sinta-se à vontade para interagir.',
        timestamp: Date.now() - 200000,
    },
    {
        id: 'msg-2',
        senderEmail: 'dono@grupo.com',
        senderName: 'Dono do Grupo',
        senderAvatar: 'https://i.pravatar.cc/150?u=owner',
        text: 'Olá a todos! Este é um ambiente seguro para simulações.',
        timestamp: Date.now() - 100000,
    },
];


// --- HANDLER PARA A ROTA ---
const handleGetGroupChatData = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/').pop();
    console.log(`[SIMULAÇÃO] ✅ Buscando dados do chat para o grupo: ${groupId}.`);
    
    await new Promise(res => setTimeout(res, 400)); // Simula atraso de rede

    // CORREÇÃO FINAL: Retorna o objeto aninhado que o hook `useGroupChat` espera.
    const responsePayload = {
        group: mockGroupDetails,
        channelName: 'geral', // Adiciona o nome do canal esperado
        messages: mockMessages
    };

    return new Response(JSON.stringify(responsePayload), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};


export const groupChatHandlers = {
    '/api/group-chat/:groupId': handleGetGroupChatData,
};
