
import { EventEmitter } from 'events';
import { eventRepositorio } from '../GerenciadoresDeDados/event.repositorio.js';

class EventProcessor extends EventEmitter {
    constructor() {
        super();
        this.setupHandlers();
        this.processedCount = 0;
    }

    setupHandlers() {
        this.on('ingested_event', async (event) => {
            // Persiste o evento ANTES de qualquer outra coisa para garantir que não seja perdido.
            await eventRepositorio.storeEvent(event);
            // Inicia o processamento real.
            await this.processEvent(event);
        });
    }

    async processEvent(event) {
        const { event_id, type, source, payload } = event;

        try {
            // 1. Marca o evento como 'em processamento'
            await eventRepositorio.updateEventStatus(event_id, 'processing');

            // 2. Roteamento da Lógica de Negócios
            switch (type) {
                case 'payment_success':
                    await this.handlePaymentSuccess(payload);
                    break;
                case 'user_error':
                    await this.handleUserError(payload);
                    break;
                case 'content_created':
                    // Futuras implementações...
                    break;
                default:
                    // Para eventos sem lógica específica, apenas os marcamos como concluídos.
                    break;
            }
            
            // 3. Marca como concluído se tudo correu bem
            await eventRepositorio.updateEventStatus(event_id, 'completed');
            this.processedCount++;

        } catch (error) {
            console.error(`[PROCESSOR ERR] Failed to process ${event_id}:`, error.message);
            // 4. Marca como falho em caso de erro
            await eventRepositorio.updateEventStatus(event_id, 'failed', error.message);
        }
    }

    async handlePaymentSuccess(payload) {
        // A lógica de negócio para um pagamento bem-sucedido iria aqui.
        // Por exemplo, liberar acesso a um produto digital.
    }

    async handleUserError(payload) {
        // A lógica para lidar com um erro do usuário iria aqui.
        // Por exemplo, registrar o erro para análise.
    }

    getStats() {
        return {
            processed: this.processedCount,
            status: 'IDLE'
        };
    }
}

export const eventProcessor = new EventProcessor();
