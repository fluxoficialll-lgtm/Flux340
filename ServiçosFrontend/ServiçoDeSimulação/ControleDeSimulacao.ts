
// --- CONTROLE CENTRAL DE SIMULAÇÃO (ORQUESTRADOR) ---

import { handleFeedSimulado, handleUserPostsSimulado, handlePostDetailsSimulado } from './simulacoes/SimulacaoDeFeed';
import { authHandlers, ServicoAutenticacaoMock } from './simulacoes/SimulacaoDeAuth';
import { handleGetProfile, handleFollowProfile, handleProfileMe } from './simulacoes/Simulacao.Perfil.Flux';
import { simulacaoDeMarketplace } from './simulacoes/SimulacaoDeMarketplace';

// --- CONFIGURAÇÃO DOS HANDLERS ---
const configBootHandler = (urlObj: URL): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Retornando mock para: GET /api/v1/config/boot');
    return Promise.resolve(new Response(JSON.stringify({ maintenanceMode: false, ambiente: 'local-simulado' }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
};

const handleMarketplaceSimulado = (): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Retornando mock para: GET /api/marketplace');
    const items = simulacaoDeMarketplace();
    return Promise.resolve(new Response(JSON.stringify(items), { status: 200, headers: { 'Content-Type': 'application/json' } }));
};

const staticHandlers: Record<string, (url: URL, config?: RequestInit) => Promise<Response>> = {
    ...authHandlers,
    '/api/v1/config/boot': configBootHandler,
};

const dynamicHandlers: { regex: RegExp; handler: (url: URL, config?: RequestInit) => Promise<any> }[] = [
    { regex: /^\/api\/feed\/?$/, handler: handleFeedSimulado },
    { regex: /\/api\/users\/(.*?)\/posts/, handler: handleUserPostsSimulado },
    { regex: /^\/api\/profiles\/me\/?$/, handler: handleProfileMe }, // Rota /me movida para dinâmico
    { regex: /^\/api\/profiles\/([^/]+)\/follow$/, handler: handleFollowProfile },
    { regex: /^\/api\/profiles\/([^/]+)$/, handler: handleGetProfile },
    { regex: /^\/api\/feed\/([^/]+)$/, handler: handlePostDetailsSimulado },
    { regex: /^\/api\/marketplace\/?$/, handler: handleMarketplaceSimulado },
];

// --- ESTADO E CONTROLE DA SIMULAÇÃO ---
let mockModeAtivado = false;
// CORREÇÃO: Garante que o `fetch` original mantenha o contexto `window` correto.
const originalFetch = window.fetch.bind(window);
const listeners = new Set<(isMockMode: boolean) => void>();

const notify = () => {
  listeners.forEach(listener => listener(mockModeAtivado));
};

const loginUsuarioSimulado = () => {
    if (!ServicoAutenticacaoMock.isAuthenticated()) {
        ServicoAutenticacaoMock.login('mock@user.com', 'password123');
    }
};

// --- CLASSE DE CONTROLE DE SIMULAÇÃO ---
class SimulationControl {
    isMockMode(): boolean {
        return mockModeAtivado;
    }

    ativarSimulacao(): void {
        if (mockModeAtivado) return;
        mockModeAtivado = true;

        console.warn('***********************************************************');
        console.warn('** MODO DE SIMULAÇÃO ATIVADO. API REAL DESABILITADA. **');
        console.warn('***********************************************************');

        loginUsuarioSimulado();
        notify();

        window.fetch = async (url: RequestInfo | URL, config?: RequestInit): Promise<Response> => {
            const urlObj = new URL(url.toString(), window.location.origin);
            const path = urlObj.pathname;

            const staticHandler = staticHandlers[path];
            if (staticHandler) {
                 return staticHandler(urlObj, config);
            }

            for (const dynamic of dynamicHandlers) {
                if (dynamic.regex.test(path)) {
                    return dynamic.handler(urlObj, config);
                }
            }
            
            // CORREÇÃO: Se nenhum handler for encontrado, executa a chamada de rede real.
            console.warn(`[SIMULAÇÃO] 🟡 Handler não encontrado para "${path}". Usando fetch real.`);
            return originalFetch(url, config);
        };
    }

    desativarSimulacao(): void {
        if (!mockModeAtivado) return;
        mockModeAtivado = false;
        window.fetch = originalFetch;
        notify();
    }

    subscribe(listener: (isMockMode: boolean) => void): () => void {
        listeners.add(listener);
        listener(mockModeAtivado);
        return () => listeners.delete(listener);
    }
}

export const ControleDeSimulacao = new SimulationControl();
