
import { useQuery } from '@tanstack/react-query';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';

export const HookTopGrupos = () => {
  // CORREÇÃO: O usuário é obtido através do estado do serviço de autenticação.
  const userId = authService.getState().user?.id;

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
