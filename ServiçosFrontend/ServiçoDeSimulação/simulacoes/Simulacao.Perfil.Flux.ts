
// --- SIMULAÇÃO PARA O FLUXO DE PERFIL ---

// Estado simulado de "seguindo"
const followingState: Record<string, boolean> = {
    'john_doe': true, // Exemplo inicial
};

// Mock para um perfil de usuário
const mockProfile = {
    id: 'uuid-do-usuario-mock',
    name: 'John Doe',
    nickname: 'john_doe',
    bio: 'Desenvolvedor e entusiasta de código aberto. Explorando o mundo, um commit de cada vez.',
    location: 'São Paulo, Brasil',
    website: 'https://johndoe.dev',
    postCount: 150,
    followerCount: 2500,
    followingCount: 300,
    isFollowing: false, // O estado de "isFollowing" será determinado pela `followingState`
    photoUrl: 'https://i.pravatar.cc/150?u=john_doe'
};

// --- HANDLERS DE SIMULAÇÃO ---

/**
 * Simula a busca de um perfil de usuário.
 * @param {URL} url - A URL da requisição.
 */
export const handleGetProfile = (url: URL): Promise<Response> => {
    const pathParts = url.pathname.split('/');
    const nickname = pathParts[pathParts.length - 1];

    if (nickname) {
        console.log(`[SIMULAÇÃO] ✅ Buscando perfil para: ${nickname}`);
        // Cria uma cópia do perfil para evitar mutação do estado global
        const profileResponse = { ...mockProfile, nickname: nickname };
        // Define o estado de "isFollowing" com base no nosso estado simulado
        profileResponse.isFollowing = !!followingState[nickname];
        
        return Promise.resolve(new Response(JSON.stringify(profileResponse), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
    }

    return Promise.resolve(new Response(JSON.stringify({ message: "Nickname não fornecido." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    }));
};

/**
 * Simula a ação de seguir ou deixar de seguir um perfil.
 * @param {URL} url - A URL da requisição.
 * @param {RequestInit} [config] - A configuração da requisição (para obter o método).
 */
export const handleFollowProfile = (url: URL, config?: RequestInit): Promise<Response> => {
    const pathParts = url.pathname.split('/');
    const nickname = pathParts[pathParts.length - 2]; // O penúltimo segmento é o nickname

    if (nickname) {
        const isFollowing = config?.method === 'POST';
        followingState[nickname] = isFollowing;
        console.log(`[SIMULAÇÃO] ✅ Ação de seguir para: ${nickname}. Agora está seguindo: ${isFollowing}`);

        const responseBody = { isFollowing };
        return Promise.resolve(new Response(JSON.stringify(responseBody), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }));
    }

    return Promise.resolve(new Response(JSON.stringify({ message: "Nickname não fornecido." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
    }));
};

/**
 * Handler unificado para /api/profiles/me que diferencia entre GET e PUT.
 * @param {URL} url - A URL da requisição.
 * @param {RequestInit} [config] - A configuração da requisição.
 */
export const handleProfileMe = async (url: URL, config?: RequestInit): Promise<Response> => {
    if (config?.method === 'PUT') {
        // Se for PUT, usa a lógica de completar perfil
        if (!config || !config.body) {
            return new Response(JSON.stringify({ message: 'Corpo da requisição ausente para PUT.' }), { status: 400 });
        }
        try {
            const profileData = JSON.parse(config.body as string);
            console.log('[SIMULAÇÃO] ✅ Atualizando perfil /me com dados:', profileData);
            Object.assign(mockProfile, profileData, { profile_completed: true });
            return new Response(JSON.stringify(mockProfile), { status: 200 });
        } catch (e) {
            return new Response(JSON.stringify({ message: 'Erro ao processar dados do perfil para PUT.' }), { status: 400 });
        }
    } else {
        // Se for GET (ou qualquer outro método), retorna o perfil mockado
        console.log('[SIMULAÇÃO] ✅ Buscando perfil para /me (GET).');
        return new Response(JSON.stringify(mockProfile), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};