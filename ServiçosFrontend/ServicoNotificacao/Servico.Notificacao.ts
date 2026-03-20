
import { Notificacao } from '../../types/Saida/Types.Estrutura.Notificacao';
import { MockNotification } from '../ServiçoDeSimulação/simulacoes/Simulacao.Notificacoes';

/**
 * @file Serviço para gestão de notificações.
 * 
 * Este serviço é responsável por toda a comunicação com a API de notificações,
 * incluindo a busca e qualquer manipulação de dados de notificações, como marcar como lida.
 */

/**
 * Transforma um objeto de notificação da API (mock) para o formato esperado pela UI.
 * @param mock - O objeto de notificação da API simulada.
 * @returns O objeto de notificação no formato da aplicação.
 */
const transformarMockParaNotificacao = (mock: MockNotification): Notificacao => ({
    id: mock.id,
    tipo: mock.type === 'new_follower' ? 'follow' : mock.type as any, // Mapeia o tipo
    nomeUsuario: mock.actor.handle,
    nomeExibicao: mock.actor.name,
    urlAvatar: mock.actor.avatar,
    timestamp: mock.createdAt, // Para exibição
    dataCriacao: mock.createdAt, // Para agrupamento
    conteudoRelacionado: mock.entity?.text,
    seguindoDeVolta: false, // Lógica a ser implementada na UI se necessário
    lida: false, // O estado inicial é não lida
});

const servicoNotificacao = {
    /**
     * Busca todas as notificações para o usuário logado.
     * No modo de simulação, busca dados mockados e os transforma.
     * @returns Uma promessa que resolve para um array de notificações.
     */
    async buscarNotificacoes(): Promise<Notificacao[]> {
        const isSimulating = localStorage.getItem('isSimulating') === 'true';

        if (isSimulating) {
            try {
                const response = await fetch('/api/notificacoes');
                if (!response.ok) {
                    throw new Error(`Falha na requisição da API: ${response.statusText}`);
                }
                const mockData: MockNotification[] = await response.json();
                // Transforma os dados para o formato da UI
                return mockData.map(transformarMockParaNotificacao);
            } catch (error) {
                console.error("[servicoNotificacao] Erro ao buscar ou transformar notificações simuladas:", error);
                return []; // Retorna um array vazio em caso de erro
            }
        } else {
            console.warn("[servicoNotificacao] Modo de simulação desativado. API real não implementada.");
            // Lógica para a API real viria aqui.
            return [];
        }
    },

    /**
     * Marca uma notificação específica como lida.
     * @param id - O ID da notificação.
     */
    async marcarComoLida(id: string | number): Promise<void> {
        console.log(`[servicoNotificacao] Marcando notificação ${id} como lida. (Simulado)`);
        // Lógica da API para marcar como lida: await api.post(`/notifications/${id}/read`);
        return Promise.resolve();
    },

    /**
     * Marca todas as notificações como lidas.
     */
    async marcarTodasComoLidas(): Promise<void> {
        console.log("[servicoNotificacao] Marcando todas as notificações como lidas. (Simulado)");
        // Lógica da API: await api.post('/notifications/mark-all-read');
        return Promise.resolve();
    }
};

export default servicoNotificacao;
