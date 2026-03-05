
import { SafeFetchPatcher } from '../SafeFetchPatcher';
import { getSimulationHandlers } from './index';

// (Função findMatchingHandler permanece a mesma)
const findMatchingHandler = (handlers: Record<string, Function>, pathname: string) => {
    if (handlers[pathname]) return handlers[pathname];
    const dynamicRoute = Object.keys(handlers).find(route => {
        const routeParts = route.split('/').filter(p => p);
        const pathParts = pathname.split('/').filter(p => p);
        if (routeParts.length !== pathParts.length) return false;
        return routeParts.every((part, index) => part.startsWith(':') || part === pathParts[index]);
    });
    return dynamicRoute ? handlers[dynamicRoute] : null;
};


class ControleDeSimulacao {
    private isSimulationActive: boolean = false;

    constructor() {
        console.log("Controle de Simulação inicializado.");
        this.applySimulationWrapper();
        this.iniciarSimulacao();
    }

    private applySimulationWrapper() {
        SafeFetchPatcher.apply(async (next, url, config) => {
            if (!this.isSimulationActive) return next(url, config);

            const urlObj = new URL(url.toString(), window.location.origin);
            const handlers = getSimulationHandlers();
            const handler = findMatchingHandler(handlers, urlObj.pathname);

            if (handler) {
                return handler(urlObj, config);
            }
            
            return next(url, config);
        });
    }

    iniciarSimulacao() {
        if (!this.isSimulationActive) {
            this.isSimulationActive = true;
            localStorage.setItem('isSimulating', 'true');
            console.log("--- MODO DE SIMULAÇÃO ATIVADO ---");
        }
    }

    pararSimulacao() {
        if (this.isSimulationActive) {
            this.isSimulationActive = false;
            localStorage.removeItem('isSimulating');
            console.log("--- MODO DE SIMULAÇÃO DESATIVADO ---");
            this.reiniciarSimulacaoNoNavegador(); // Garante que o worker seja desativado
        }
    }

    /**
     * Força o service worker de simulação (msw) a ser desregistrado e recarrega a página
     * para garantir que as novas configurações de simulação sejam carregadas.
     */
    async reiniciarSimulacaoNoNavegador() {
        console.log("[CONTROLE DE SIMULAÇÃO] Tentando reiniciar o worker de simulação...");
        try {
            if ('serviceWorker' in navigator) {
                const registration = await navigator.serviceWorker.getRegistration();
                if (registration) {
                    await registration.unregister();
                    console.log("[CONTROLE DE SIMULAÇÃO] ✅ Worker de simulação desregistrado com sucesso.");
                } else {
                    console.log("[CONTROLE DE SIMULAÇÃO] Nenhum worker de simulação ativo encontrado para desregistrar.");
                }
            } else {
                console.warn("[CONTROLE DE SIMULAÇÃO] navigator.serviceWorker não está disponível.");
            }
        } catch (error) {
            console.error("[CONTROLE DE SIMULAÇÃO] ❌ Erro ao desregistrar o worker de simulação:", error);
        }
        
        // Força o recarregamento da página para que o novo worker seja registrado
        console.log("[CONTROLE DE SIMULAÇÃO] 🚀 Recarregando a página para aplicar as alterações...");
        window.location.reload();
    }

    estaAtivo(): boolean {
        return this.isSimulationActive;
    }
}

export const controleDeSimulacao = new ControleDeSimulacao();
