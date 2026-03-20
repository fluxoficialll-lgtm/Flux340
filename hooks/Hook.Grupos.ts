
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { Group } from '../tipos/types.Grupo';

export const HookGrupos = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  // --- Gerenciamento de Estado de Autenticação Reativo ---
  const [authState, setAuthState] = useState(authService.getState());
  const { user: currentUser, userId: currentUserId, userEmail: currentUserEmail } = authState;

  // Se inscreve para receber atualizações do estado de autenticação.
  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return () => unsubscribe(); // Limpa a inscrição ao desmontar.
  }, []);


  // --- Carregamento dos Grupos ---
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
            // Lógica para API real iria aqui
            setGroups([]);
        }
    } catch (error) {
      console.error("Falha ao carregar grupos:", error);
      setGroups([]);
    } finally {
      setLoading(false);
    }
}, []);

  // --- Efeitos ---
  useEffect(() => {
    if (!currentUser) {
      navigate('/'); // Redireciona se não houver usuário logado
      return;
    }
    
    loadGroups();

    const params = new URLSearchParams(location.search);
    const joinCode = params.get('join');
    if (joinCode) {
      console.log("Funcionalidade de entrar com código a ser implementada com a API real.");
    }
  }, [navigate, location.search, currentUser, loadGroups]);


  // --- Navegação e Ações ---
  const navigateToGroup = (group: Group) => {
    const isCreator = group.creatorId === currentUserId;
    const isMember = (group.memberIds || []).includes(currentUserId || '');
    
    if (group.isSalesPlatformEnabled) {
      navigate(`/group-folder/${group.id}/main`);
    } else if (group.isHubModeEnabled) {
      navigate(`/group-sales-content/${group.id}`);
    } else if (isCreator || isMember) {
      navigate(`/group-chat/${group.id}`);
    } else if (group.isVip) {
      navigate(`/vip-group-sales/${group.id}`);
    } else {
      navigate(`/group-info-page/${group.id}`);
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
    return 0; // Placeholder
  }

  return {
    groups, loading, currentUserEmail, navigate,
    navigateToGroup, joinGroupByCode, deleteGroup, getUnreadCount,
  };
};
