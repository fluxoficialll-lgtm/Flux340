
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Group, User, GroupRole } from '../../../../types';
import { groupSystem } from '../../../../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js';
import { authService } from '../../../../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { servicoDeSimulacao } from '@/ServiçosFrontend/ServiçoDeSimulação';

export const useGroupMembers = (group: Group | null) => {
  const [members, setMembers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);
  const [roles, setRoles] = useState<GroupRole[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const currentUserId = authService.getCurrentUser()?.id;

  const refreshMembers = useCallback(async (groupId: string) => {
    if (!groupId) return;
    setIsLoading(true);
    try {
      const { members: fetchedMembers, pending } = await groupSystem.getGroupMembers(groupId);
      setMembers(fetchedMembers || []);
      setPendingRequests(pending || []);
    } catch (e) {
      console.error("Erro ao carregar membros do grupo:", e);
      setMembers([]); 
      setPendingRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (group) {
      setRoles(group.roles || []);
      refreshMembers(group.id);

      // CORREÇÃO: A linha abaixo causava o erro e foi removida.
      // A funcionalidade de subscribe não existe no serviço de simulação.
      // const unsub = servicoDeSimulacao.subscribe('groups', () => refreshMembers(group.id));
      // return () => unsub();
    }
  }, [group, refreshMembers]);

  const filteredMembers = useMemo(() => {
      const activeMembers = members || [];
      const term = searchQuery.toLowerCase().trim();
      if (!term) return activeMembers;

      return activeMembers.filter(m => {
          const name = m.name?.toLowerCase() || '';
          const nickname = m.username?.toLowerCase() || '';
          return name.includes(term) || nickname.includes(term);
      });
  }, [members, searchQuery]);

  const mappedMembers = useMemo(() => {
      if (!group) return [];
      
      const userRolesMap = (group as any).userRoles || {};

      return filteredMembers.map(u => ({
          id: u.id,
          name: u.name || 'Membro Flux',
          role: u.id === group.creatorId ? 'Dono' : (group.adminIds?.includes(u.id) ? 'Admin' : 'Membro'),
          roleId: userRolesMap[u.id], 
          isMe: u.id === currentUserId,
          avatar: u.avatar
      }));
  }, [filteredMembers, group, currentUserId]);

  return {
    state: { 
        members: mappedMembers, 
        pendingRequests, 
        roles,
        searchQuery,
        isLoading
    },
    actions: { 
        setMembers, 
        setPendingRequests, 
        setRoles, 
        refreshMembers,
        setSearchQuery 
    },
    getMembersPayload: () => ({ roles })
  };
};
