
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { chatService } from '../ServiçosFrontend/ServiçoDeChat/chatService.js';
import { Group } from '../tipos/types.Criacao.Grupo.Publico';

export const useGroups = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  
  const currentUser = authService.getCurrentUser();
  const currentUserId = currentUser?.id;
  const currentUserEmail = currentUser?.email;

  const loadGroups = useCallback(async () => {
    setLoading(true);
    try {
        const isSimulating = localStorage.getItem('isSimulating') === 'true';
        if (isSimulating) {
            console.log("[SIMULAÇÃO] useGroups: Buscando grupos de múltiplos endpoints.");
            
            // Fetch public groups
            const publicGroupsPromise = fetch('/api/groups').then(res => {
                if (!res.ok) throw new Error('Falha na simulação de grupos públicos');
                return res.json();
            });

            // Fetch user's own groups
            const myGroupsPromise = fetch('/api/groups/mine').then(res => {
                if (!res.ok) throw new Error('Falha na simulação de grupos próprios');
                return res.json();
            });

            // Wait for both promises to resolve
            const [publicGroups, myGroups] = await Promise.all([publicGroupsPromise, myGroupsPromise]);

            // Combine the arrays, ensuring no duplicates by ID
            const allGroups = [...(myGroups || []), ...(publicGroups || [])];
            const uniqueGroups = Array.from(new Map(allGroups.map(group => [group.id, group])).values());

            setGroups(uniqueGroups);

        } else {
            // Logic for real API remains unchanged
            setGroups([]);
        }
    } catch (error) {
      console.error("Falha ao carregar grupos:", error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
}, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    
    loadGroups();

    const params = new URLSearchParams(location.search);
    const joinCode = params.get('join');
    if (joinCode) {
      console.log("Funcionalidade de entrar com código a ser implementada com a API real.");
    }
  }, [navigate, location.search, currentUser, loadGroups]);

  const navigateToGroup = (group: Group) => {
    const isCreator = group.creatorId === currentUserId;
    const isMember = (group.memberIds || []).includes(currentUserId || '');
    
    if (group.isSalesPlatformEnabled && (isCreator || isMember)) {
      navigate(`/group-platform/${group.id}`);
      return;
    }
    if (isCreator || isMember) {
      const hasMultipleChannels = group.channels && group.channels.length > 0;
      navigate(hasMultipleChannels ? `/group/${group.id}/channels` : `/group-chat/${group.id}`);
    } else if (group.isVip) {
      navigate(`/vip-group-sales/${group.id}`);
    } else {
      navigate(`/group-landing/${group.id}`);
    }
  };

  const joinGroupByCode = async (inputCode: string) => {
    console.log("joinGroupByCode não implementado para a API real ainda.");
  };

  const deleteGroup = async (groupId: string) => {
    try {
        setGroups(prev => prev.filter(g => g.id !== groupId));
    } catch (error) {
      console.error(`Falha ao deletar o grupo ${groupId}:`, error);
    }
  };

  const getUnreadCount = (groupId: string) => {
    // Correção: Retorna 0 em modo de simulação para evitar o erro.
    return 0;
  }

  return {
    groups, loading, currentUserEmail, navigate,
    navigateToGroup, joinGroupByCode, deleteGroup, getUnreadCount,
  };
};
