
import { SafeFetchPatcher } from '../SafeFetchPatcher';
import { getSimulationHandlers } from './index';

// Função para encontrar um handler que corresponda a uma rota dinâmica
const findMatchingHandler = (handlers: Record<string, Function>, pathname: string) => {
    // Tenta encontrar uma correspondência exata primeiro
    if (handlers[pathname]) {
        return handlers[pathname];
    }

    // Se não encontrar, procura por uma rota dinâmica
    const dynamicRoute = Object.keys(handlers).find(route => {
        const routeParts = route.split('/').filter(p => p);
        const pathParts = pathname.split('/').filter(p => p);

        if (routeParts.length !== pathParts.length) {
            return false;
        }

        return routeParts.every((part, index) => {
            return part.startsWith(':') || part === pathParts[index];
        });
    });

    return dynamicRoute ? handlers[dynamicRoute] : null;
};

class ControleDeSimulacao {
    private isSimulationActive: boolean = false;

    constructor() {
        console.log("Controle de Simulação inicializado e integrado ao SafeFetchPatcher.");
        this.applySimulationWrapper();
        this.iniciarSimulacao();
    }

    private applySimulationWrapper() {
        SafeFetchPatcher.apply(async (next, url, config) => {
            if (!this.isSimulationActive) {
                return next(url, config);
            }

            const urlObj = new URL(url.toString(), window.location.origin);
            const handlers = getSimulationHandlers();
            
            // Usa a nova lógica de correspondência
            const handler = findMatchingHandler(handlers, urlObj.pathname);

            if (handler) {
                console.log(`[SIMULAÇÃO] Interceptando com correspondência dinâmica: ${urlObj.pathname}`);
                return handler(urlObj, config);
            }
            
            console.log(`[SIMULAÇÃO] Deixando passar: ${urlObj.pathname}`);
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
        }
    }

    estaAtivo(): boolean {
        return this.isSimulationActive;
    }
}

export const controleDeSimulacao = new ControleDeSimulacao();
