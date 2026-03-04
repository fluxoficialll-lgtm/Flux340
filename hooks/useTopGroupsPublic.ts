
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// CORREÇÃO: A importação do groupService foi removida.
// import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { Group } from '../types';

export const useTopGroupsPublic = () => {
  const navigate = useNavigate();
  const [rankedGroups, setRankedGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    try {
        // CORREÇÃO: Lógica de busca de grupos removida.
        setRankedGroups([]);
    } catch (e) {
        console.error("Erro ao carregar ranking público:", e);
    } finally {
        if (!isSilent) setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
    // A simulação pode continuar tentando atualizar, mas o loadData agora está vazio.
    const unsubscribe = servicoDeSimulacao.subscribe('groups', () => loadData(true));
    return () => unsubscribe();
  }, [loadData]);

  const handleGroupAction = useCallback((group: Group) => {
      const currentUserId = authService.getCurrentUserId();
      if (!currentUserId) return;
      
      const isMember = group.memberIds?.includes(currentUserId);
      if (isMember) {
          navigate(`/group-chat/${group.id}`);
      } else {
          navigate(`/group-landing/${group.id}`);
      }
  }, [navigate]);

  const handleTabNavigation = (path: string) => navigate(path);

  const handleBack = () => navigate('/groups');

  return {
    rankedGroups,
    loading,
    handleGroupAction,
    handleTabNavigation,
    handleBack,
  };
};
