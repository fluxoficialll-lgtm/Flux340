
import { User } from "../../../types";

// --- ESTADO DA SIMULAÇÃO ---

// Lista de produtos que pertencem ao usuário simulado
const mockUserProducts = [
    // NOVO CONTAINER ADICIONADO PARA TESTE
    {
        id: 'user-container-1',
        type: 'container', // A propriedade que define este item como um contêiner
        title: 'Minha Coleção de Verão',
        description: 'Os melhores produtos para você curtir a estação mais quente do ano!',
        backgroundColor: '#fff8e1',
        textColor: '#8d6e63',
        items: [
            {
                id: 'user-prod-1',
                title: 'Consultoria de Carreira',
                image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                price: 250.00,
            },
            {
                id: 'user-prod-2',
                title: 'E-book: Guia do Dev Freelancer',
                image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                price: 59.90,
            },
            {
                id: 'user-prod-3',
                title: 'Pack de Presets para Fotos',
                image: 'https://images.unsplash.com/photo-1572044157829-57d314497a5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                price: 89.90,
            }
        ],
        seller: {
            id: 'uuid-gerado-na-simulacao',
            name: 'Usuário Simulado',
            nickname: 'user_simulado',
        },
        location: 'Online',
        category: 'Coleção'
    },
    // Produtos normais que já existiam
    {
        id: 'user-prod-1',
        title: 'Consultoria de Carreira',
        description: 'Sessão de 1 hora para alavancar sua carreira na tecnologia.',
        price: 250.00,
        seller: {
            id: 'uuid-gerado-na-simulacao',
            name: 'Usuário Simulado',
            nickname: 'user_simulado',
        },
        image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        category: 'Serviços',
        location: 'Remoto',
        type: 'service',
        soldCount: 12,
        isAd: false,
    },
    {
        id: 'user-prod-2',
        title: 'E-book: Guia do Dev Freelancer',
        description: 'Aprenda a conseguir seus primeiros clientes como desenvolvedor freelancer.',
        price: 59.90,
        seller: {
            id: 'uuid-gerado-na-simulacao',
            name: 'Usuário Simulado',
            nickname: 'user_simulado',
        },
        image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        category: 'Infoprodutos',
        location: 'Digital',
        type: 'infoproduct',
        soldCount: 57,
        isAd: false,
    }
];

const mockUser: User = {
    id: 'uuid-gerado-na-simulacao',
    email: 'qualquer@email.com',
    name: 'Usuário Simulado',
    username: 'user_simulado',
    nickname: 'Simulado',
    avatar: 'https://i.pravatar.cc/150?u=simulado',
    bio: 'Este é um perfil simulado para fins de desenvolvimento. Explorando o universo Flux!',
    website: 'https://flux.plus',
    profile_completed: true,
    stats: {
        posts: 15,
        followers: 1337,
        following: 42,
    },
    products: mockUserProducts,
};

export const ServicoAutenticacaoMock = {
    login: (email?: string, password?: string): User => {
        console.log(`[SIMULAÇÃO] ✅ Login solicitado. Persistindo estado no localStorage.`);
        localStorage.setItem('isSimulating', 'true');
        return { ...mockUser };
    },
    logout: (): void => {
        console.log('[SIMULAÇÃO] ✅ Usuário deslogado. Removendo estado do localStorage.');
        localStorage.removeItem('isSimulating');
    },
    isAuthenticated: (): boolean => {
        const isAuth = localStorage.getItem('isSimulating') === 'true';
        return isAuth;
    },
    completeProfile: (profileData: Partial<User>): User => {
        console.log('[SIMULAÇÃO] ✅ Completando perfil com dados:', profileData);
        Object.assign(mockUser, { ...profileData, profile_completed: true });
        return { ...mockUser };
    },
};

const handleLogin = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log("[SIMULAÇÃO] Interceptando requisição de login.");
    const user = ServicoAutenticacaoMock.login();
    const responseBody = JSON.stringify({
        token: 'jwt-token-simulado-qualquer-credencial-12345',
        user
    });
    await new Promise(res => setTimeout(res, 300));
    return new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
};

const handleLogout = (): Promise<Response> => {
    ServicoAutenticacaoMock.logout();
    const responseBody = JSON.stringify({});
    return Promise.resolve(new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } }));
};

export const authHandlers = {
    '/api/auth/login': handleLogin,
    '/api/auth/logout': handleLogout,
};
