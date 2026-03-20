
// Arquivo: ServiçosFrontend/APIs/APIsServicoNotificacao/API.Servico.Notificacao.ts

// CORREÇÃO: A importação foi alterada para usar a exportação padrão (default export) do Cliente.Backend
import backend from "../../Cliente.Backend.js";
import { Notificacao } from "../../../types/Saida/Types.Estrutura.Notificacao";

/**
 * @file API para o serviço de notificações.
 * 
 * Este arquivo define a camada de comunicação direta com o backend para
 * todas as operações relacionadas a notificações. Ele abstrai as chamadas de rede
 * (GET, POST, etc.), tratando a construção da requisição e o recebimento da resposta.
 */

class ApiNotificationService {
  /**
   * Busca as notificações de um usuário no backend.
   * 
   * @param token - O token de autenticação do usuário.
   * @returns Uma promessa que resolve para um array de notificações.
   */
  async getNotifications(token: string): Promise<Notificacao[]> {
    try {
      const response = await backend.get<Notificacao[]>('/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // A resposta da API já deve estar no formato esperado (Notificacao[])
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar notificações da API:', error);
      // Lança o erro para que a camada de serviço possa tratá-lo
      throw new Error('Falha ao buscar notificações.');
    }
  }
}

// Exporta uma instância única do serviço de API de notificação
export const apiNotificationService = new ApiNotificationService();
