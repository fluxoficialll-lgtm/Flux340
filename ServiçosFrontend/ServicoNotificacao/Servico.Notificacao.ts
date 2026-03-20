
import { Notificacao } from '../../types/Saida/Types.Estrutura.Notificacao';
import { apiNotificationService } from '../APIs/APIsServicoNotificacao/API.Servico.Notificacao';
import authService from '../ServiçoDeAutenticação/authService';
import { simularBuscaDeNotificacoes } from '../ServiçoDeSimulação/simulacoes/Simulacao.Notificacoes';

/**
 * @file Serviço para gestão de notificações.
 * 
 * Este serviço orquestra a obtenção de dados de notificação, decidindo se deve
 * usar a API real ou uma simulação com base no estado da aplicação. Ele não
 * contém lógica de transformação de dados; essa responsabilidade é delegada
 * à camada de simulação ou à camada de API, conforme apropriado.
 */
const servicoNotificacao = {
    /**
     * Busca todas as notificações para o usuário logado.
     * Decide entre a API real e a simulação com base no localStorage.
     * @returns Uma promessa que resolve para um array de notificações.
     */
    async buscarNotificacoes(): Promise<Notificacao[]> {
        const isSimulating = localStorage.getItem('isSimulating') === 'true';

        if (isSimulating) {
            console.log("[servicoNotificacao] Modo de simulação ATIVADO. Chamando módulo de simulação.");
            return simularBuscaDeNotificacoes();
        } else {
            console.log("[servicoNotificacao] Modo de simulação DESATIVADO. Buscando dados reais.");
            const token = authService.getState().token;
            if (!token) {
                console.error("[servicoNotificacao] Erro: Token de autenticação não encontrado.");
                return []; // Não pode fazer a requisição sem token
            }
            try {
                const notificacoes = await apiNotificationService.getNotifications(token);
                return notificacoes;
            } catch (error) {
                console.error("[servicoNotificacao] Erro ao buscar notificações da API real:", error);
                return []; // Retorna array vazio em caso de falha
            }
        }
    },

    /**
     * Marca uma notificação específica como lida.
     * (API real a ser implementada)
     * @param id - O ID da notificação.
     */
    async marcarComoLida(id: string | number): Promise<void> {
        console.log(`[servicoNotificacao] Marcando notificação ${id} como lida.`);
        // TODO: Lógica da API real viria aqui.
        // Ex: const token = authService.getState().token;
        //      await apiNotificationService.markAsRead(token, id);
        return Promise.resolve();
    },

    /**
     * Marca todas as notificações como lidas.
     * (API real a ser implementada)
     */
    async marcarTodasComoLidas(): Promise<void> {
        console.log("[servicoNotificacao] Marcando todas as notificações como lidas.");
        // TODO: Lógica da API real viria aqui.
        // Ex: const token = authService.getState().token;
        //      await apiNotificationService.markAllAsRead(token);
        return Promise.resolve();
    }
};

export default servicoNotificacao;
