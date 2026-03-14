
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
        console.log("Controle de Simulação inicializado e pronto para ser ativado.");
        this.applySimulationWrapper();
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
            window.location.reload();
        }
    }

    estaAtivo(): boolean {
        return this.isSimulationActive;
    }
}

export const controleDeSimulacao = new ControleDeSimulacao();
