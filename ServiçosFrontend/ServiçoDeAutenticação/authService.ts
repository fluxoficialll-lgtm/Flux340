
import { config } from '../ValidaçãoDeAmbiente/config';
import { ServicoAutenticacaoMock } from '../ServiçoDeSimulação/simulacoes/SimulacaoDeAuth';
import { metodoGoogle } from './Servico.Metodo.Google';
import { metodoEmailSenha } from './Servico.Metodo.Email.Senha';
import authApi from '../APIs/authApi';
import { CriarUsuarioDTO, LoginUsuarioDTO as LoginDto } from '../../../types/Entrada/Dto.Estrutura.Usuario';
import { Usuario } from '../../../types/Saida/Types.Estrutura.Usuario';
import { Sessao } from '../../../types/Saida/Types.Estrutura.Sessao';
import { AtualizarPerfilUsuarioDTO } from '../../../types/Entrada/Dto.Estrutura.Usuario';

// --- Interfaces ---
interface User extends Usuario {
  username?: string;
  nickname?: string;
  avatar?: string;
  website?: string;
  isPrivate?: boolean;
  profile_completed?: boolean;
  photoUrl?: string;
  stats?: { posts: number; followers: number; following: number };
  products?: any[];
  profile?: any;
}

interface SessionData extends Sessao {
  token: string;
  user: User;
}

interface IAuthService {
  login(dadosLogin: LoginDto): Promise<SessionData>;
  loginWithGoogle(credential: string, referredBy?: string): Promise<SessionData>;
  logout(): void;
  register(dadosConta: CriarUsuarioDTO): Promise<SessionData>;
  updateProfile(profileData: Partial<AtualizarPerfilUsuarioDTO>): Promise<{ user: User }>;
  getToken(): string | null;
  isAuthenticated(): boolean;
  getCurrentUser(): User | null;
  resetPassword(email: string, newPass: string): Promise<void>;
  completeProfile(profileData: any): Promise<any>;
}


// --- Helper Function ---
const salvarSessao = (dados: SessionData) => {
    if (!dados.token || !dados.user) return;

    localStorage.setItem('userToken', dados.token);
    localStorage.setItem('user', JSON.stringify(dados.user));
    window.dispatchEvent(new Event('authChange'));
};

// --- Real API-based Service ---
const realAuthService: IAuthService = {
    async login(dadosLogin) {
        try {
            const data = await metodoEmailSenha.login(dadosLogin);
            salvarSessao(data);
            return data;
        } catch (error: any) {
            const errorMessage = error.message || 'Falha no login';
            throw new Error(errorMessage);
        }
    },

    async loginWithGoogle(credential, referredBy) {
        try {
            const data = await metodoGoogle.login(credential, referredBy);
            salvarSessao(data);
            return data;
        } catch (error: any) {
            const errorMessage = error.message || 'Falha na autenticação com o Google.';
            throw new Error(errorMessage);
        }
    },

    logout() {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
    },

    async register(dadosConta) {
        try {
            const response = await authApi.register(dadosConta);
            salvarSessao(response.data);
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Falha no registro';
            throw new Error(errorMessage);
        }
    },

    async updateProfile(profileData) {
        try {
            const response = await authApi.updateProfile(profileData);
            if (response.data.user) {
                 localStorage.setItem('user', JSON.stringify(response.data.user));
            }
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Falha ao atualizar perfil';
            throw new Error(errorMessage);
        }
    },

    getToken: () => localStorage.getItem('userToken'),

    isAuthenticated: () => !!localStorage.getItem('userToken'),

    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        try {
            return user ? JSON.parse(user) as User : null;
        } catch (error) {
            realAuthService.logout();
            return null;
        }
    },
    
    async resetPassword(email: string, newPass: string): Promise<void> {
        console.log("reset password called", email, newPass);
        return Promise.resolve();
    },

    async completeProfile(profileData: any): Promise<any> {
        return realAuthService.updateProfile(profileData);
    }
};

// --- Simulation Service Wrapper ---
const simulationServiceWrapper: IAuthService = {
    ...realAuthService,

    async login(dadosLogin) {
        console.log('[SIMULAÇÃO] ✅ Login solicitado.');
        const user = ServicoAutenticacaoMock.login(dadosLogin.email, dadosLogin.senha);
        const sessionData: SessionData = {
            token: 'jwt-token-simulado-qualquer-credencial-12345',
            user: user
        };
        salvarSessao(sessionData);
        console.log('[SIMULAÇÃO] ✅ Login realizado e sessão salva no localStorage.');
        return sessionData;
    },

    logout() {
        ServicoAutenticacaoMock.logout();
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange'));
        console.log('[SIMULAÇÃO] ✅ Logout realizado e sessão removida do localStorage.');
    },

    isAuthenticated: () => {
        const isAuth = ServicoAutenticacaoMock.isAuthenticated();
        console.log(`[SIMULAÇÃO] ✅ Verificando autenticação: ${isAuth}`);
        return isAuth;
    },

    async register(dadosConta) {
        console.log('[SIMULAÇÃO] ✅ Registrando novo usuário:', { email: dadosConta.email, username: dadosConta.nome });
        const user: User = {
            id: `simulated-${Date.now()}`,
            email: dadosConta.email,
            nome: dadosConta.nome,
            apelido: dadosConta.nome,
            bio: 'Novo usuário simulado.',
            site: '',
            urlFoto: 'https://i.pravatar.cc/150?u=simulated-new',
            privado: false,
            perfilCompleto: false,
            seguidores: [],
            seguindo: [],
            dataCriacao: new Date(),
            dataAtualizacao: new Date(),
            stats: { posts: 0, followers: 0, following: 0 },
            products: [],
        };
        const sessionData: SessionData = {
            id: `simulated-session-${Date.now()}`,
            idUsuario: user.id,
            expiraEm: new Date(Date.now() + 3600 * 1000),
            dataCriacao: new Date(),
            token: 'jwt-token-simulado-registro-12345',
            user: user
        };
        salvarSessao(sessionData);
        console.log('[SIMULAÇÃO] ✅ Registro completo e sessão salva.');
        return sessionData;
    },

    async updateProfile(profileData) {
        console.log('[SIMULAÇÃO] ✅ Atualizando perfil com:', profileData);
        const currentUser = realAuthService.getCurrentUser();
        const updatedUser = { ...currentUser, ...profileData, profile_completed: true } as User;
        
        ServicoAutenticacaoMock.completeProfile(profileData);

        localStorage.setItem('user', JSON.stringify(updatedUser));
        console.log('[SIMULAÇÃO] ✅ Perfil atualizado no localStorage.');
        return { user: updatedUser };
    },

    async loginWithGoogle() {
        console.log('[SIMULAÇÃO] ✅ Login com Google solicitado.');
        return simulationServiceWrapper.login({email: 'google.user@example.com', senha: 'simulated_password'});
    },
};


// --- Service Export Decision ---
let authService: IAuthService;

if (config.VITE_APP_ENV === 'simulation') {
  console.log('[SERVICE SELECTOR] Usando o serviço de autenticação de SIMULAÇÃO.');
  authService = simulationServiceWrapper;
} else {
  console.log('[SERVICE SELECTOR] Usando o serviço de autenticação REAL.');
  authService = realAuthService;
}

export default authService;
