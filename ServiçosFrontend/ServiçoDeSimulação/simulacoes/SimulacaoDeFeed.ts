
// --- SIMULAÇÃO DO SERVIÇO DE FEED ---
import { Post } from "../../../types";

// Mock de dados para o feed
const mockFeedPosts: Post[] = [
    {
        id: 'post-1',
        author: {
            id: 'user-2',
            username: 'influencer',
            nickname: 'Influenciadora Digital',
            avatar: 'https://i.pravatar.cc/150?u=influencer',
        },
        text: 'Este é um post de texto simples. Bem-vindo ao meu feed!',
        likes: 152,
        commentsCount: 12,
        createdAt: '2024-07-29T10:00:00.000Z',
        type: 'text',
        likedBy: [],
    },
    {
        id: 'post-2',
        author: {
            id: 'user-3',
            username: 'pro_gamer',
            nickname: 'Gamer Profissional',
            avatar: 'https://i.pravatar.cc/150?u=gamer',
        },
        text: 'Qual deve ser o próximo jogo da live?',
        type: 'poll',
        poll: {
            options: [
                { text: 'Aventura Épica', votes: 120, voters: [] },
                { text: 'Corrida Alucinante', votes: 85, voters: [] },
                { text: 'Terror Assustador', votes: 45, voters: [] },
            ],
        },
        likes: 320,
        commentsCount: 45,
        createdAt: '2024-07-29T11:30:00.000Z',
        likedBy: [],
    },
    {
        id: 'post-3',
        author: {
            id: 'user-4',
            username: 'dev_master',
            nickname: 'Mestre do Código',
            avatar: 'https://i.pravatar.cc/150?u=dev',
        },
        text: 'Novo grupo para desenvolvedores! Participe e compartilhe seu conhecimento.',
        type: 'group',
        group: { // OBJETO ADICIONADO AQUI
            id: 'group-1',
            name: 'Devs do Futuro',
            isPublic: true,
            memberCount: 250,
            bannerUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop',
        },
        likes: 50,
        commentsCount: 5,
        createdAt: '2024-07-29T12:00:00.000Z',
        likedBy: [],
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

export const feedHandlers = {
    '/api/feed': handleGetFeed,
};
