
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { ServiçoPublicacaoReels } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoReels.js';
import { fileService } from '../ServiçosFrontend/ServiçoDeArquivos/fileService.js'; // Corrigido
import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';
import { contentSafetyService } from '../ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/contentSafetyService.js';
import { Group } from '../types';

export const useCreateReel = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedGroup = location.state?.groupId as string | undefined;

  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [userGroups, setUserGroups] = useState<Group[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(preselectedGroup || 'none');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser?.id) {
      const groups = groupService.getUserGroups(currentUser.id);
      setUserGroups(groups);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setVideoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Por favor, selecione um arquivo de vídeo.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile || isCreating) return;

    setIsCreating(true);
    setError(null);

    try {
      const isSafe = await contentSafetyService.isTextSafe(description);
      if (!isSafe) {
        throw new Error('Sua descrição contém palavras não permitidas.');
      }

      const videoUrl = await fileService.uploadFile(videoFile);

      const user = authService.getCurrentUser();
      if (!user) {
        throw new Error("Usuário não autenticado.");
      }
      
      const reelData = {
        description,
        videoUrl,
        authorId: user.id,
        groupId: selectedGroupId !== 'none' ? selectedGroupId : undefined,
      };

      await ServiçoPublicacaoReels.create(reelData);

      if (selectedGroupId !== 'none') {
        navigate(`/group/${selectedGroupId}`);
      } else {
        navigate('/feed');
      }

    } catch (err: any) {
      console.error("Erro ao criar o Reel:", err);
      setError(err.message || 'Ocorreu um erro ao criar seu Reel. Tente novamente.');
      setIsCreating(false);
    }
  };

  return {
    description, setDescription,
    videoPreview,
    isCreating,
    userGroups,
    selectedGroupId, setSelectedGroupId,
    handleFileChange,
    handleSubmit,
    error,
    navigate
  };
};
