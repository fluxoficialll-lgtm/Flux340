
import { useQuery } from '@tanstack/react-query';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';

export const useTopGroups = () => {
  // CORREÇÃO: O método correto é `getCurrentUser`, que retorna um objeto.
  // O ID do usuário é então acessado a partir desse objeto.
  const userId = authService.getCurrentUser()?.id;

  const fetchTopGroups = async () => {
    if (!userId) {
      return [];
    }
    const groups = await groupSystem.getTopGroups(userId);
    return groups;
  };

  const { data: groups, isLoading, error } = useQuery({
    queryKey: ['topGroups', userId],
    queryFn: fetchTopGroups,
    enabled: !!userId, // A query só será executada se o userId existir.
  });

  return {
    groups: groups || [],
    isLoading,
    error,
  };
};
