
// --- CONTROLE CENTRAL DE SIMULAÇÃO (ORQUESTRADOR) ---

import { feedHandlers, handleUserPostsSimulado } from './simulacoes/SimulacaoDeFeed';
import { authHandlers, ServicoAutenticacaoMock } from './simulacoes/SimulacaoDeAuth';
import { servicoDeSimulacao } from './index';
import { simulacaoDeMarketplace } from './simulacoes/SimulacaoDeMarketplace';
import { MarketplaceItem } from '../../types';

const configBootHandler = (urlObj: URL): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Retornando mock para: GET /api/v1/config/boot');
    return Promise.resolve(new Response(JSON.stringify({ maintenanceMode: false, ambiente: 'local-simulado' }), { status: 200, headers: { 'Content-Type': 'application/json' } }));
};

const staticHandlers: Record<string, (url: URL, config?: RequestInit) => Promise<Response>> = {
    ...feedHandlers,
    ...authHandlers,
    '/api/v1/config/boot': configBootHandler,
};

const dynamicHandlers: { regex: RegExp; handler: (url: URL, config?: RequestInit) => Promise<Response> }[] = [
    { regex: /\/api\/users\/(.*?)\/posts/, handler: handleUserPostsSimulado },
];

let mockModeAtivado = false;

const popularDadosDeSimulacao = () => {
    console.log('[SIMULAÇÃO] Populando a cache com dados de simulação...');
    const marketplaceItems = simulacaoDeMarketplace();
    marketplaceItems.forEach(item => {
        servicoDeSimulacao.marketplace.add(item as unknown as MarketplaceItem);
    });
    console.log(`[SIMULAÇÃO] ✅ ${marketplaceItems.length} itens de marketplace adicionados à cache.`);
};

const loginUsuarioSimulado = () => {
    if (!ServicoAutenticacaoMock.isAuthenticated()) {
        console.log('[SIMULAÇÃO] Nenhum usuário autenticado. Logando usuário mock padrão...');
        ServicoAutenticacaoMock.login('mock@user.com');
    } else {
        console.log('[SIMULAÇÃO] Usuário mock já está autenticado.');
    }
};

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
        popularDadosDeSimulacao();

        const originalFetch = window.fetch;

        window.fetch = async (url: RequestInfo | URL, config?: RequestInit): Promise<Response> => {
            const urlObj = new URL(url.toString(), window.location.origin);
            
            let handler = staticHandlers[urlObj.pathname];

            if (!handler) {
                const dynamicMatch = dynamicHandlers.find(h => h.regex.test(urlObj.pathname));
                if (dynamicMatch) {
                    handler = dynamicMatch.handler;
                }
            }

            if (handler) {
                console.log(`[SIMULAÇÃO] Interceptado: ${config?.method || 'GET'} ${urlObj.pathname}`);
                return handler(urlObj, config);
            }

            console.error(`[SIMULAÇÃO] ❌ ERRO: Requisição para "${urlObj.pathname}" não foi simulada.`);
            console.error('[SIMULAÇÃO] 💡 Para corrigir, adicione um handler para esta URL no ficheiro de simulação apropriado.');

            return Promise.resolve(new Response(
                JSON.stringify({ error: 'Endpoint não simulado', message: `A requisição para ${urlObj.pathname} foi interceptada, mas não há um mock para ela.` }),
                { status: 404, statusText: 'Not Found (Mock Missing)', headers: { 'Content-Type': 'application/json' } }
            ));
        };
    }
}

export const ControleDeSimulacao = new SimulationControl();
