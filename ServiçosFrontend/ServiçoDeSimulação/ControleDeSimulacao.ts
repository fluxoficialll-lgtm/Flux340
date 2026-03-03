
import { SafeFetchPatcher } from '../SafeFetchPatcher';
import { getSimulationHandlers } from './index'; // Importa os handlers de simulação

class ControleDeSimulacao {
    private isSimulationActive: boolean = false;
    private originalFetch: Function | null = null;

    constructor() {
        console.log("Controle de Simulação inicializado.");
        // Aplica o wrapper de simulação imediatamente usando o patcher seguro
        this.applySimulationWrapper();
    }

    private applySimulationWrapper() {
        SafeFetchPatcher.apply(async (next, url, config) => {
            // Se a simulação não estiver ativa, simplesmente continua a cadeia
            if (!this.isSimulationActive) {
                return next(url, config);
            }

            const urlObj = new URL(url.toString(), window.location.origin);
            const handlers = getSimulationHandlers();
            const handler = handlers[urlObj.pathname];

            if (handler) {
                console.log(`[SIMULAÇÃO] Interceptando requisição para: ${urlObj.pathname}`);
                return handler(urlObj, config);
            } else {
                console.log(`[SIMULAÇÃO] Sem handler para ${urlObj.pathname}. Deixando passar.`);
                // Se não houver um handler de simulação, continua para a chamada de rede real
                return next(url, config);
            }
        });
    }

    iniciarSimulacao() {
        if (!this.isSimulationActive) {
            this.isSimulationActive = true;
            console.log("--- MODO DE SIMULAÇÃO ATIVADO ---");
            // Não precisa mais mexer no window.fetch aqui
        }
    }

    pararSimulacao() {
        if (this.isSimulationActive) {
            this.isSimulationActive = false;
            console.log("--- MODO DE SIMULAÇÃO DESATIVADO ---");
            // Não precisa mais restaurar o window.fetch aqui
        }
    }

    estaAtivo(): boolean {
        return this.isSimulationActive;
    }
}

export const controleDeSimulacao = new ControleDeSimulacao();
