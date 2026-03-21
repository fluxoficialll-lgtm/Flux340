import { DadosChat } from '../../../types/Saida/Types.Estrutura.Chat';
import { api } from '../APIs/APIsServicoConversas/API.Servico.Gestao.Lista.Conversas';

export const ServicoGestaoListaConversas = {
  async listarConversas(): Promise<DadosChat[]> {
    const isSimulating = localStorage.getItem('isSimulating') === 'true';

    if (isSimulating) {
      console.log("[SIMULAÇÃO] ServicoGestaoListaConversas: Buscando conversas do endpoint de simulação /api/conversas");
      const response = await fetch('/api/conversas');
      const conversations = await response.json();
      return conversations || [];
    } else {
      return await api.listarConversas();
    }
  },
};
