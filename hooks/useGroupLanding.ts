
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// CORREÇÃO: A importação do groupService foi removida.
// import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Group } from '../types';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { CapacityValidator } from '../Componentes/ComponentesDeGroups/logic/CapacityValidator';

export const useGroupLanding = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [group, setGroup] = useState<Group | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const [isBanned, setIsBanned] = useState(false);
  const [creatorName, setCreatorName] = useState('');
  const [creatorAvatar, setCreatorAvatar] = useState<string | undefined>(undefined);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    // CORREÇÃO: A lógica que dependia do groupService foi removida.
    // O hook agora não busca mais dados de grupo, resultando em uma página em branco.
    setLoading(false);
  }, [id, navigate]);

  const handleJoinAction = () => {
    // CORREÇÃO: A ação de entrar no grupo foi desativada.
    alert("A funcionalidade de grupos foi desativada.");
  };

  const handleBack = () => {
      // A rota /groups pode não existir mais, o que pode causar um erro de navegação.
      navigate('/groups');
  };

  const isFull = group ? CapacityValidator.isFull(group) : false;

  return {
    group,
    loading,
    isMember,
    requestSent,
    isBanned,
    isFull,
    creatorName,
    creatorAvatar,
    onlineCount,
    handleJoinAction,
    handleBack
  };
};
