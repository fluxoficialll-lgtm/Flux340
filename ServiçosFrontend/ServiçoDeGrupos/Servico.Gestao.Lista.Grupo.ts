
import { Group } from '../../../types/Saida/Types.Estrutura.Grupos';
import { apiServicoGestaoListaGrupo } from '../APIs/APIsServicoGrupos/API.Servico.Gestao.Lista.Grupo';
import { mockMyGroups, mockPublicGroups } from '../ServiçoDeSimulação/simulacoes/Simulacao.Gestao.Lista.Grupo';
import { config } from '../ValidaçãoDeAmbiente/config';

/**
 * @file Serviço para gerenciar a obtenção e manipulação de listas de grupos.
 *
 * Utiliza a configuração de ambiente centralizada para decidir entre a API real
 * e os dados de simulação, servindo como uma ponte entre a UI e as fontes de dados.
 */
class ServicoGestaoListaGrupo {

  // A decisão de usar simulação agora vem da configuração central de ambiente.
  private useSimulation = () => config.VITE_APP_ENV === 'simulation';

  /**
   * Busca a lista combinada de grupos, usando dados mocados ou a API real.
   *
   * @returns Uma promessa que resolve para uma lista de grupos únicos.
   */
  async obterGrupos(): Promise<Group[]> {
    let publicGroups: Group[] = [];
    let myGroups: Group[] = [];

    try {
      if (this.useSimulation()) {
        console.log("[SIMULAÇÃO] Usando dados mocados para a lista de grupos, conforme configuração de ambiente.");
        publicGroups = mockPublicGroups;
        myGroups = mockMyGroups;
      } else {
        const [pub, mine] = await Promise.all([
          apiServicoGestaoListaGrupo.obterGruposPublicos(),
          apiServicoGestaoListaGrupo.obterMeusGrupos(),
        ]);
        publicGroups = pub;
        myGroups = mine;
      }

      // A lógica de negócio para combinar e garantir unicidade permanece centralizada.
      const allGroups = [...(myGroups || []), ...(publicGroups || [])];
      const uniqueGroups = Array.from(new Map(allGroups.map(group => [group.id, group])).values());

      return uniqueGroups;

    } catch (error) {
      console.error("ServicoGestaoListaGrupo: Falha ao obter e processar grupos:", error);
      return [];
    }
  }

  /**
   * Solicita a exclusão de um grupo.
   *
   * @param groupId O ID do grupo a ser excluído.
   */
  async excluirGrupo(groupId: string): Promise<void> {
    if (this.useSimulation()) {
      console.log(`[SIMULAÇÃO] Grupo ${groupId} teria sido excluído.`);
      return Promise.resolve();
    }

    try {
      await apiServicoGestaoListaGrupo.excluirGrupo(groupId);
    } catch (error) {
      console.error(`ServicoGestaoListaGrupo: Erro ao solicitar a exclusão do grupo ${groupId}:`, error);
      throw error;
    }
  }
}

export const servicoGestaoListaGrupo = new ServicoGestaoListaGrupo();
