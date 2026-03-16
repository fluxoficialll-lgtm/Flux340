
import { SafeFetchPatcher } from '../SafeFetchPatcher';
import { getSimulationHandlers } from './index';

// Função para encontrar o handler correspondente, incluindo rotas dinâmicas
const findMatchingHandler = (handlers: Record<string, Function>, pathname: string) => {
    // Tenta encontrar uma correspondência exata primeiro
    if (handlers[pathname]) return handlers[pathname];

    // Se não encontrar, procura por rotas dinâmicas (ex: /api/profiles/:id)
    const dynamicRoute = Object.keys(handlers).find(route => {
        const routeParts = route.split('/').filter(p => p);
        const pathParts = pathname.split('/').filter(p => p);
        if (routeParts.length !== pathParts.length) return false;

        // Verifica se cada parte da rota corresponde, permitindo placeholders (:)
        return routeParts.every((part, index) => part.startsWith(':') || part === pathParts[index]);
    });

    return dynamicRoute ? handlers[dynamicRoute] : null;
};


class ControleDeSimulacao {
    public isSimulationActive: boolean = false;

    constructor() {
        // Define o estado inicial da simulação lendo o localStorage
        this.checkInitialState();
        console.log(`Controle de Simulação inicializado. Ativo: ${this.isSimulationActive}`);
        this.applySimulationWrapper();
    }

    // Aplica um "patch" na função fetch para interceptar chamadas de rede
    private applySimulationWrapper() {
        SafeFetchPatcher.apply(async (next, url, config) => {
            // Se a simulação não estiver ativa, continua com a chamada de rede normal
            if (!this.isSimulationActive) return next(url, config);

            // Se a simulação estiver ativa, tenta encontrar um handler para a URL
            const urlObj = new URL(url.toString(), window.location.origin);
            const handlers = getSimulationHandlers();
            const handler = findMatchingHandler(handlers, urlObj.pathname);

            if (handler) {
                // Se encontrar um handler, executa-o para obter dados simulados
                return handler(urlObj, config);
            }
            
            // Se não houver handler, permite que a chamada de rede prossiga
            return next(url, config);
        });
    }

    // Verifica o estado de simulação no localStorage
    public checkInitialState() {
        this.isSimulationActive = localStorage.getItem('isSimulating') === 'true';
    }

    // Ativa o modo de simulação
    iniciarSimulacao() {
        if (!this.isSimulationActive) {
            this.isSimulationActive = true;
            localStorage.setItem('isSimulating', 'true');
            console.log("--- MODO DE SIMULAÇÃO ATIVADO ---");
            window.location.reload(); // Recarrega a página para aplicar o modo
        }
    }

    // Desativa o modo de simulação
    pararSimulacao() {
        if (this.isSimulationActive) {
            this.isSimulationActive = false;
            localStorage.removeItem('isSimulating');
            console.log("--- MODO DE SIMULAÇÃO DESATIVADO ---");
            window.location.reload(); // Recarrega para voltar ao modo normal
        }
    }

    // Retorna se a simulação está ativa (usado pelo patcher)
    estaAtivo(): boolean {
        return this.isSimulationActive;
    }
}

export const controleDeSimulacao = new ControleDeSimulacao();
