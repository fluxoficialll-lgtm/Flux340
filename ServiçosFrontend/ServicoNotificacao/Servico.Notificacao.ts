
import { config } from '../ValidaçãoDeAmbiente/config';
import { apiNotificationService } from '../APIs/APIsServicoNotificacao/API.Servico.Notificacao';
import { mockNotifications } from '../ServiçoDeSimulação/simulacoes/Simulacao.Notificacoes';
import { Notificacao } from '../../../types/Saida/Types.Estrutura.Notificacao';

/**
 * @file Serviço para gerenciar notificações.
 *
 * Adota o padrão de verificação de ambiente para alternar entre a API real e dados simulados.
 * A lógica de decisão está contida dentro de cada método de serviço.
 */
class ServicoNotificacao {

  /**
   * Determina se o ambiente de simulação deve ser usado, com base na configuração central.
   */
  private useSimulation = () => config.VITE_APP_ENV === 'simulation';

  /**
   * Transforma os dados brutos da simulação para o formato esperado pela aplicação.
   * Esta função é uma utilitária interna para o modo de simulação.
   */
  private transformMockData(mockData: any[]): Notificacao[] {
    return mockData.map(n => ({
      id: n.id,
      lida: n.read,
      timestamp: n.created_at,
      tipo: n.type === 'new_follower' ? 'SEGUIDOR' : n.type === 'group_invite' ? 'CONVITE_GRUPO' : 'COMENTARIO',
      autor: {
        nome: n.actor.name,
        username: n.actor.handle,
        avatar: n.actor.avatar,
      },
      conteudoRelacionado: n.entity?.text,
    }));
  }

  /**
   * Busca a lista de notificações do usuário.
   * @param token O token de autenticação do usuário.
   */
  async getNotifications(token: string): Promise<Notificacao[]> {
    if (this.useSimulation()) {
      console.log('[SIMULAÇÃO] Usando dados mocados para notificações.');
      // Adiciona um pequeno atraso para simular a latência da rede
      await new Promise(res => setTimeout(res, 300));
      return this.transformMockData(mockNotifications);
    }

    try {
      return await apiNotificationService.getNotifications(token);
    } catch (error) {
      console.error("ServicoNotificacao: Erro ao buscar notificações da API real:", error);
      return []; // Retorna um array vazio em caso de erro.
    }
  }

  /**
   * Marca uma notificação específica como lida.
   * @param token O token de autenticação do usuário.
   * @param notificationId O ID da notificação a ser marcada.
   */
  async markAsRead(token: string, notificationId: string): Promise<boolean> {
    if (this.useSimulation()) {
      console.log(`[SIMULAÇÃO] Marcando notificação ${notificationId} como lida.`);
      const notification = mockNotifications.find(n => n.id === notificationId);
      if (notification) {
        notification.read = true;
        return true;
      }
      return false;
    }

    return await apiNotificationService.markAsRead(token, notificationId);
  }

  /**
   * Marca todas as notificações do usuário como lidas.
   * @param token O token de autenticação do usuário.
   */
  async markAllAsRead(token: string): Promise<boolean> {
    if (this.useSimulation()) {
      console.log('[SIMULAÇÃO] Marcando todas as notificações como lidas.');
      mockNotifications.forEach(n => n.read = true);
      return true;
    }

    return await apiNotificationService.markAllAsRead(token);
  }
}

// Exporta uma instância única do serviço para ser usada em toda a aplicação.
const servicoNotificacao = new ServicoNotificacao();
export default servicoNotificacao;
