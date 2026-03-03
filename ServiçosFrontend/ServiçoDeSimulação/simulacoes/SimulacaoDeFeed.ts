
// --- SIMULAÇÃO DO SERVIÇO DE FEED ---

// Mock de dados para o feed
const mockFeedPosts = [
    {
        id: 'post-1',
        author: {
            id: 'user-2',
            name: 'Influenciadora Digital',
            nickname: 'influencer',
            photoUrl: 'https://i.pravatar.cc/150?u=influencer',
        },
        content: 'Adorei o novo recurso de Grupos VIP! Já criei o meu, venham conferir! 🚀 #novidade #flux',
        likes: 152,
        comments: 12,
        timestamp: '2024-07-29T10:00:00.000Z',
    },
    {
        id: 'post-2',
        author: {
            id: 'user-3',
            name: 'Gamer Profissional',
            nickname: 'pro_gamer',
            photoUrl: 'https://i.pravatar.cc/150?u=gamer',
        },
        content: 'Live hoje à noite, pessoal! Vamos jogar juntos e conversar. Não percam! 🎮',
        likes: 320,
        comments: 45,
        timestamp: '2024-07-29T11:30:00.000Z',
    },
];

const handleGetFeed = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando feed de posts.');
    // Simula um atraso de rede
    await new Promise(res => setTimeout(res, 500));
    
    return new Response(JSON.stringify(mockFeedPosts), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

// AQUI ESTÁ A CORREÇÃO: Adicionando a palavra-chave `export`
export const feedHandlers = {
    '/api/feed': handleGetFeed,
};
