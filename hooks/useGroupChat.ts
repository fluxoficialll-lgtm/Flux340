
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Group, ChatMessage } from '../types';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js'; // Importa o novo serviço

export const useGroupChat = () => {
  const navigate = useNavigate();
  const { groupId } = useParams<{ groupId: string }>();

  const [group, setGroup] = useState<Group | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentUserEmail = useMemo(() => authService.getCurrentUserEmail()?.toLowerCase(), []);

  const loadChatData = useCallback(async () => {
    if (!groupId) {
      navigate('/conversas');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // CORREÇÃO: Utiliza o groupSystem para buscar os dados do grupo.
      // Esta chamada é mais limpa e alinhada com a arquitetura.
      const groupData = await groupSystem.getGroupDetails(groupId);
      
      setGroup(groupData);

      const rawMessages = groupData.messages || [];
      const uniqueMap = new Map();

      rawMessages.forEach((m: ChatMessage) => {
        if (m.id && !m.deletedBy?.includes(currentUserEmail || '')) {
          uniqueMap.set(m.id, m);
        }
      });

      const finalMessages = Array.from(uniqueMap.values()).sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      setMessages(finalMessages);

    } catch (err: any) {
      console.error("Erro ao carregar o chat do grupo:", err);
      setError('Não foi possível carregar o chat. Tente novamente mais tarde.');
      // O erro "Grupo não encontrado" virá da API/simulação e será tratado na UI
      if (err.message === 'Grupo não encontrado') {
          navigate('/conversas', { state: { error: 'Grupo não encontrado' } });
      }
    } finally {
      setLoading(false);
    }
  }, [groupId, currentUserEmail, navigate]);

  useEffect(() => {
    loadChatData();

    // Se houver um serviço de soquete para grupos, as subscrições viriam aqui.
    // Ex: const unsubscribe = groupSocketService.onMessage(...);
    // return () => unsubscribe();

    // A subscrição ao serviço de simulação pode ser mantida para forçar recargas
    const unsubDb = servicoDeSimulacao.subscribe('grupos', loadChatData);
    return () => unsubDb();

  }, [loadChatData]);

  // Funções para enviar mensagens, deletar, etc. seriam adicionadas aqui.
  // Por enquanto, o foco é carregar os dados corretamente.

  return {
    loading,
    group,
    messages,
    error,
    // Outros valores e funções que a UI precisar...
  };
};
