
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// CORREÇÃO: As importações foram atualizadas para usar os serviços reais.
// import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { chatService } from '../ServiçosFrontend/ServiçoDeChat/chatService.js';
import { Group } from '../tipos/types.Criacao.Grupo.Publico'; // Caminho corrigido

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
        // CORREÇÃO: Lógica de busca de grupos removida.
        setGroups([]);
    } catch (error) {
      console.error("Falha ao carregar grupos:", error);
      setGroups([]); // Limpa em caso de erro
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) {
      navigate('/'); // Redireciona se não houver usuário
      return;
    }
    
    loadGroups();

    const params = new URLSearchParams(location.search);
    const joinCode = params.get('join');
    if (joinCode) {
      // A lógica de join precisa ser adaptada para a API real
      // Ex: joinGroupByCode(joinCode).then(() => navigate('/groups', { replace: true }));
      console.log("Funcionalidade de entrar com código a ser implementada com a API real.");
    }
  }, [navigate, location.search, currentUser, loadGroups]);

  const navigateToGroup = (group: Group) => {
    const isCreator = group.creatorId === currentUserId;
    // A propriedade memberIds pode não existir, dependendo da definição de Group
    const isMember = (group.memberIds || []).includes(currentUserId || '');
    
    if (group.isSalesPlatformEnabled && (isCreator || isMember)) {
      navigate(`/group-platform/${group.id}`);
      return;
    }
    if (isCreator || isMember) {
      // A lógica de acesso VIP deve ser gerenciada pelo backend
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
    // Implementação futura com a API real:
    // const token = localStorage.getItem('authToken');
    // if (!token) return { success: false, message: 'Autenticação necessária' };
    // try {
    //   const result = await groupService.joinGroup(token, inputCode);
    //   loadGroups(); // Recarrega os grupos
    //   return { success: true, ...result };
    // } catch (error) {
    //   return { success: false, message: error.message };
    // }
  };

  const deleteGroup = async (groupId: string) => {
    try {
        // CORREÇÃO: Lógica de exclusão de grupo removida.
        setGroups(prev => prev.filter(g => g.id !== groupId));
    } catch (error) {
      console.error(`Falha ao deletar o grupo ${groupId}:`, error);
    }
  };

  const getUnreadCount = (groupId: string) => {
    // Esta funcionalidade pode precisar de uma integração mais profunda com o chatService
    return chatService.getGroupUnreadCount(groupId);
  }

  return {
    groups, loading, currentUserEmail, navigate,
    navigateToGroup, joinGroupByCode, deleteGroup, getUnreadCount,
  };
};
