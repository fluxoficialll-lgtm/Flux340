
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { ServiçoPublicacaoReels } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoReels.js';
import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';
import { contentSafetyService } from '../ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/contentSafetyService.js';
import { DadosCriacaoReel, ErrosCriacaoReel, Group } from '../tipos';

export const useCreateReel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedGroup = location.state?.groupId as string | undefined;

  // Estado unificado para os dados do Reel
  const [dadosReel, setDadosReel] = useState<DadosCriacaoReel>({ 
    descricao: '',
    arquivoVideo: null,
    groupId: preselectedGroup || 'none'
  });

  // Estados da UI
  const [isCreating, setIsCreating] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [errors, setErrors] = useState<ErrosCriacaoReel>({});

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser?.id) {
      const groups = groupService.getUserGroups(currentUser.id);
      setUserGroups(groups);
    }
  }, []);

  const updateField = useCallback((field: keyof DadosCriacaoReel, value: any) => {
    setDadosReel(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
        updateField('arquivoVideo', file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setVideoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
        setErrors({});
    } else {
        setErrors({ arquivoVideo: 'Por favor, selecione um arquivo de vídeo válido.' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) return;

    // Validação
    if (!dadosReel.arquivoVideo) {
      return setErrors({ arquivoVideo: 'Um vídeo é obrigatório para criar o Reel.' });
    }
    if (!dadosReel.descricao.trim()) {
      return setErrors({ descricao: 'A descrição é obrigatória.' });
    }

    setIsCreating(true);
    setErrors({});

    try {
      const isSafe = await contentSafetyService.isTextSafe(dadosReel.descricao);
      if (!isSafe) {
        throw new Error('Sua descrição contém palavras não permitidas.');
      }

      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }
      
      // O serviço agora recebe o arquivo bruto e cuida do upload
      await ServiçoPublicacaoReels.create({
        ...dadosReel,
        authorId: user.id,
      });

      if (dadosReel.groupId && dadosReel.groupId !== 'none') {
        navigate(`/group/${dadosReel.groupId}`);
      } else {
        navigate('/feed');
      }

    } catch (err: any) {
      console.error("Erro ao criar o Reel:", err);
      setErrors({ geral: err.message || 'Ocorreu um erro ao criar seu Reel.' });
    } finally {
      setIsCreating(false);
    }
  };

  return {
    dadosReel,
    updateField,
    videoPreview,
    isCreating,
    userGroups,
    errors,
    handleFileChange,
    handleSubmit,
    navigate
  };
};
