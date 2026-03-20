
import { Usuario } from "../../../types/Saida/Types.Estrutura.Usuario";

// --- ESTADO DA SIMULAÇÃO ---

// A estrutura do mock foi alinhada com a interface 'Usuario' que a aplicação espera.
// 'perfilCompleto' está definido como 'true' para pular a tela de completar perfil.
const mockUser: Usuario = {
    id: 'uuid-gerado-na-simulacao',
    email: 'qualquer@email.com',
    nome: 'Usuário Simulado',
    apelido: 'user_simulado',
    urlFoto: 'https://i.pravatar.cc/150?u=simulado',
    bio: 'Este é um perfil simulado para fins de desenvolvimento. Explorando o universo Flux!',
    site: 'https://flux.plus',
    perfilCompleto: true, // Ponto chave: usuário já tem perfil completo.
    stats: {
        posts: 15,
        seguidores: 1337,
        seguindo: 42,
    },
    produtos: [],
};

export const ServicoAutenticacaoMock = {
    login: (email?: string, password?: string): Usuario => {
        console.log(`[SIMULAÇÃO] ✅ Login solicitado. O usuário é retornado com perfilCompleto: true.`);
        localStorage.setItem('isSimulating', 'true');
        localStorage.setItem('user', JSON.stringify(mockUser));
        return mockUser;
    },
    logout: (): void => {
        console.log('[SIMULAÇÃO] ✅ Usuário deslogado.');
        localStorage.removeItem('isSimulating');
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
    },
    isAuthenticated: (): boolean => {
        const isAuth = localStorage.getItem('isSimulating') === 'true';
        return isAuth;
    },
    completeProfile: (profileData: Partial<Usuario>): Usuario => {
        const updatedUser = { ...mockUser, ...profileData, perfilCompleto: true };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    },
};

// --- HANDLERS DE FETCH ---

const handleLogin = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log("[SIMULAÇÃO] Interceptando requisição de login.");
    const user = ServicoAutenticacaoMock.login();
    const responseBody = JSON.stringify({
        token: 'jwt-token-simulado-12345',
        user: user // O objeto de usuário agora tem 'perfilCompleto: true'
    });
    await new Promise(res => setTimeout(res, 300));
    return new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
};

const handleLogout = (): Promise<Response> => {
    ServicoAutenticacaoMock.logout();
    const responseBody = JSON.stringify({ message: "Logout bem-sucedido" });
    return Promise.resolve(new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } }));
};

const handleUpdateProfile = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log("[SIMULAÇÃO] Interceptando requisição para atualizar perfil.");
    const profileData = config ? JSON.parse(config.body as string) : {};
    const updatedUser = { ...mockUser, ...profileData, perfilCompleto: true };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    const responseBody = JSON.stringify({ user: updatedUser });
    await new Promise(res => setTimeout(res, 500));
    return new Response(responseBody, { status: 200, headers: { 'Content-Type': 'application/json' } });
};

export const authHandlers = {
    '/api/auth/login': handleLogin,
    '/api/auth/logout': handleLogout,
    '/api/user/profile': handleUpdateProfile,
};
