
import { Usuario } from "../../../types/Saida/Types.Estrutura.Usuario";

// --- ESTADO DA SIMULAÇÃO ---

// Mock para o perfil do usuário "próprio" (logado)
const mockOwnProfile: Usuario = {
    id: 'uuid-proprio-simulado-123',
    email: 'proprio@email.simulado.com',
    name: 'Usuario Proprio Simulado',
    nickname: 'proprio_simulado',
    photo_url: 'https://i.pravatar.cc/150?u=proprio',
    bio: 'Este é o perfil simulado do usuário logado. Bem-vindo ao meu mundo no Flux!',
    website: 'https://meu-site-pessoal.com',
    profile_is_complete: true,
    posts_count: 25,
    followers_count: 1500,
    following_count: 100,
    posts: [],
    products: [],
    photos: [],
    reels: [],
};

// Mock para um perfil "público" de outro usuário
const mockPublicProfile: Usuario = {
    id: 'uuid-publico-simulado-456',
    email: 'publico@email.simulado.com',
    name: 'Usuario Publico Simulado',
    nickname: 'publico_simulado',
    photo_url: 'https://i.pravatar.cc/150?u=publico',
    bio: 'Apenas mais um usuário simulado navegando pelo Flux. Conecte-se comigo!',
    website: 'https://blog-do-publico.com',
    profile_is_complete: true,
    posts_count: 50,
    followers_count: 800,
    following_count: 250,
    posts: [],
    products: [],
    photos: [],
    reels: [],
};


// --- MOCK DO SERVIÇO ---

/**
 * Mock do servicoPerfilUsuario que retorna dados simulados sem fazer chamadas de rede.
 * Simula a interface do serviço real para ser usado em ambientes de desenvolvimento.
 */
export const mockServicoPerfilUsuario = {
    /**
     * Simula a busca do perfil do usuário autenticado.
     */
    getOwnProfile: async (): Promise<Usuario | null> => {
        console.log("SIMULAÇÃO: Chamando getOwnProfile");
        // Simula uma pequena latência de rede
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockOwnProfile;
    },

    /**
     * Simula a busca de um perfil público de outro usuário.
     */
    getPublicProfileByUsername: async (username: string): Promise<Usuario | null> => {
        console.log(`SIMULAÇÃO: Chamando getPublicProfileByUsername para ${username}`);
        await new Promise(resolve => setTimeout(resolve, 300));
        // Retorna o perfil público mockado, independente do username, para fins de simulação
        return mockPublicProfile;
    },

    /**
     * Simula a atualização de um perfil.
     */
    updateProfile: async (userId: string, profileData: Partial<Usuario>): Promise<Usuario | null> => {
        console.log(`SIMULAÇÃO: Chamando updateProfile para userId ${userId} com dados:`, profileData);
        await new Promise(resolve => setTimeout(resolve, 300));

        // Em uma simulação real, você poderia atualizar o objeto mockOwnProfile
        Object.assign(mockOwnProfile, profileData);

        return mockOwnProfile;
    },
};
