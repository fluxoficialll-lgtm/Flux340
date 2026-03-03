
import { SafeFetchPatcher } from '../SafeFetchPatcher';
import { getSimulationHandlers } from './index';

class ControleDeSimulacao {
    private isSimulationActive: boolean = false;

    constructor() {
        console.log("Controle de Simulação inicializado e integrado ao SafeFetchPatcher.");
        // O Patcher será o único a modificar o fetch global
        this.applySimulationWrapper();
        
        // CORREÇÃO: Força o início da simulação imediatamente na inicialização do app.
        this.iniciarSimulacao();
    }

    private applySimulationWrapper() {
        SafeFetchPatcher.apply(async (next, url, config) => {
            if (!this.isSimulationActive) {
                return next(url, config); // Se a simulação não está ativa, passa para o próximo (telemetria ou fetch)
            }

            const urlObj = new URL(url.toString(), window.location.origin);
            const handlers = getSimulationHandlers();
            const handler = handlers[urlObj.pathname];

            if (handler) {
                console.log(`[SIMULAÇÃO] Interceptando: ${urlObj.pathname}`);
                return handler(urlObj, config);
            }
            
            console.log(`[SIMULAÇÃO] Deixando passar: ${urlObj.pathname}`);
            return next(url, config); // Passa para o próximo se não houver handler
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
