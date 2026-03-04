
// --- SIMULAÇÃO DO SERVIÇO DE REELS ---

// --- TIPOS (Estrutura de um Reel) ---
interface ReelAuthor {
    name: string;
    handle: string;
    avatar: string;
}

interface ReelMusic {
    title: string;
}

export interface MockReel {
    id: string;
    author: ReelAuthor;
    videoUrl: string;
    description: string;
    music: ReelMusic;
    likes: number;
    comments: number;
    isLiked: boolean;
}

// --- DADOS SIMULADOS ---

const mockReels: MockReel[] = [
    {
        id: 'reel-1',
        author: {
            name: 'Viajante Sincero',
            handle: 'viajante.sincero',
            avatar: 'https://i.pravatar.cc/150?u=viajante',
        },
        videoUrl: 'https://storage.googleapis.com/flux-testing-2024/reels/praia.mp4',
        description: 'Um dia perfeito na praia! 🌊☀️ #verão #praia #relax',
        music: {
            title: 'Som do Mar - Ondas Calmas',
        },
        likes: 12345,
        comments: 678,
        isLiked: false,
    },
    {
        id: 'reel-2',
        author: {
            name: 'Chef Criativo',
            handle: 'chef.criativo',
            avatar: 'https://i.pravatar.cc/150?u=chef',
        },
        videoUrl: 'https://storage.googleapis.com/flux-testing-2024/reels/receita.mp4',
        description: 'Receita rápida de macarrão para a semana! 🍝 #receita #food #comida',
        music: {
            title: 'Música Italiana - Tarantella Napoletana',
        },
        likes: 8901,
        comments: 432,
        isLiked: true,
    },
    {
        id: 'reel-3',
        author: {
            name: 'Gamer Engraçado',
            handle: 'gamer.engracado',
            avatar: 'https://i.pravatar.cc/150?u=gamer',
        },
        videoUrl: 'https://storage.googleapis.com/flux-testing-2024/reels/gameplay.mp4',
        description: 'Aquele momento que você quase ganha... mas o lag ataca 🤣 #gaming #fail #humor',
        music: {
            title: 'Lo-fi Hip Hop - Chill Beats',
        },
        likes: 25000,
        comments: 1200,
        isLiked: false,
    }
];


// --- HANDLER PARA A API ---

const handleGetReels = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando a lista de Reels.');
    // Simula um atraso de rede para uma experiência mais realista
    await new Promise(res => setTimeout(res, 450));

    return new Response(JSON.stringify(mockReels), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

// --- EXPORTAÇÃO DOS HANDLERS ---
export const reelsHandlers = {
    '/api/reels': handleGetReels,
};
