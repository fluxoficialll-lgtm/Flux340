
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { chatService } from '../ServiçosFrontend/ServiçoDeChat/chatService.js';
import { Group } from '../tipos/types.Grupo';

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
            
            const publicGroupsPromise = fetch('/api/groups').then(res => {
                if (!res.ok) throw new Error('Falha na simulação de grupos públicos');
                return res.json();
            });

            const myGroupsPromise = fetch('/api/groups/mine').then(res => {
                if (!res.ok) throw new Error('Falha na simulação de grupos próprios');
                return res.json();
            });

            const [publicGroups, myGroups] = await Promise.all([publicGroupsPromise, myGroupsPromise]);

            const allGroups = [...(myGroups || []), ...(publicGroups || [])];
            const uniqueGroups = Array.from(new Map(allGroups.map(group => [group.id, group])).values());

            setGroups(uniqueGroups);

        } else {
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
    
    // 1. PRIORIDADE MÁXIMA: Se for plataforma de vendas, vai direto para o conteúdo.
    if (group.isSalesPlatformEnabled) {
      navigate(`/groups/${group.id}/conteudo-pasta-vendas`);
      return;
    }

    // 2. Se for modo Hub, vai para a página de vendas do Hub.
    if (group.isHubModeEnabled) {
      navigate(`/group/${group.id}/sales-content`);
      return;
    }

    // 3. Se for membro ou criador, entra no chat ou nos canais.
    if (isCreator || isMember) {
      const hasMultipleChannels = group.channels && group.channels.length > 0;
      navigate(hasMultipleChannels ? `/group/${group.id}/channels` : `/group-chat/${group.id}`);
      return;
    }
    
    // 4. Se não for membro e o grupo for VIP, vai para a página de vendas VIP.
    if (group.isVip) {
      navigate(`/vip-group-sales/${group.id}`);
      return;
    }

    // 5. Caso contrário (público e não-membro), vai para a landing page.
    navigate(`/group-landing/${group.id}`);
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
    return 0;
  }

  return {
    groups, loading, currentUserEmail, navigate,
    navigateToGroup, joinGroupByCode, deleteGroup, getUnreadCount,
  };
};
