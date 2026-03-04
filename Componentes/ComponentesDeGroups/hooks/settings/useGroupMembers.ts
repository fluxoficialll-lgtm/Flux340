
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Group, User, GroupRole } from '../../../../types';
// CORREÇÃO: A importação do groupService foi removida.
// import { groupService } from '../../../../ServiçosFrontend/ServiçoDeGrupos/groupService.js';
import { authService } from '../../../../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { servicoDeSimulacao } from '@/ServiçosFrontend/ServiçoDeSimulação';

export const useGroupMembers = (group: Group | null) => {
  const [members, setMembers] = useState<User[]>([]);
  const [pendingRequests, setPendingRequests] = useState<User[]>([]);
  const [roles, setRoles] = useState<GroupRole[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const currentUserId = authService.getCurrentUserId();

  const refreshMembers = useCallback((groupId: string) => {
    if (!groupId) return;
    try {
        // CORREÇÃO: Lógica de busca de membros removida.
        console.error("groupService not available. Returning empty member list.");
        setMembers([]);
        setPendingRequests([]);
    } catch (e) {
        console.error("Erro ao carregar membros do grupo (simulado):", e);
    }
  }, []);

  useEffect(() => {
    if (group) {
      setRoles(group.roles || []);
      refreshMembers(group.id);

      const unsub = servicoDeSimulacao.subscribe('groups', () => refreshMembers(group.id));
      return () => unsub();
    }
  }, [group, refreshMembers]);

  const filteredMembers = useMemo(() => {
      const activeMembers = members || [];
      const term = searchQuery.toLowerCase().trim();
      if (!term) return activeMembers;

      return activeMembers.filter(m => {
          const name = m.profile?.name?.toLowerCase() || '';
          const nickname = m.profile?.nickname?.toLowerCase() || '';
          return name.includes(term) || nickname.includes(term);
      });
  }, [members, searchQuery]);

  const mappedMembers = useMemo(() => {
      if (!group) return [];
      const safeFiltered = filteredMembers || [];
      
      const userRolesMap = (group as any).userRoles || {};

      return safeFiltered.map(u => ({
          id: u.id,
          name: u.profile?.nickname || u.profile?.name || 'Membro Flux',
          role: u.id === group.creatorId ? 'Dono' : (group.adminIds?.includes(u.id) ? 'Admin' : 'Membro'),
          roleId: userRolesMap[u.id], 
          isMe: u.id === currentUserId,
          avatar: u.profile?.photoUrl
      }));
  }, [filteredMembers, group, currentUserId]);

  return {
    state: { 
        members: mappedMembers, 
        pendingRequests, 
        roles,
        searchQuery 
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
