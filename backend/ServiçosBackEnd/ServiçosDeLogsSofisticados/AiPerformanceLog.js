
import { auditLogRepositorio } from '../../GerenciadoresDeDados/auditLog.repositorio.js';

/**
 * AiPerformanceLog: Monitor de inteligência artificial.
 */
export const AiPerformanceLog = {
    /**
     * Registra o resultado de uma operação de IA para análise de 'alucinação' ou custo.
     */
    async record(model, context, metrics) {
        const { duration, success, tokenCount, traceId, prompt } = metrics;

        try {
            // Logamos para o sistema de eventos do banco
            // Isso alimenta o painel de 'IA Health' no admin
            await auditLogRepositorio.insert({
                traceId: traceId,
                level: success ? 'info' : 'error',
                service: 'AI_PERFORMANCE',
                contexto: context, // Ex: 'GeradorDePosts', 'AnalisadorDeSentimento'
                data: {
                    model,
                    duration,
                    tokenCount,
                    prompt, // Cuidado com PII ao logar prompts
                },
                timestamp: new Date()
            });

        } catch (e) {
            // Auditoria nunca deve quebrar o fluxo principal
            console.error('Falha ao gravar log de auditoria de IA:', e.message);
        }
    }
};
