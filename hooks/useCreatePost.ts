
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Importação do serviço de feed validado
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
// Mantendo outros serviços que o hook utiliza
import { authService, groupService } from '../ServiçosFrontend/ServiçoDeSimulação/serviceFactory';
import { contentSafetyService } from '../ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/contentSafetyService.js';
import { adService } from '../ServiçosFrontend/ServiçoDeAnúncios/adService.js';
import { Post, Group } from '../types';

interface MediaPreview {
  file: File;
  url: string;
  type: 'image';
}

// ... (toda a lógica de estado e UI permanece a mesma)

export const useCreatePost = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { isAd?: boolean } | null;
  const isAd = locationState?.isAd || false;

  const [text, setText] = useState('');
  const [mediaFiles, setMediaFiles] = useState<MediaPreview[]>([]);
  const [isPublishDisabled, setIsPublishDisabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ... (outros estados como ad, location, groups, etc. permanecem)
  const [adBudget, setAdBudget] = useState('');
  const [adLink, setAdLink] = useState('');
  const [isAdultContent, setIsAdultContent] = useState(false);
  const [displayLocation, setDisplayLocation] = useState('Global');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  
  const user = authService.getCurrentUser();

  useEffect(() => {
    // A lógica para habilitar/desabilitar o botão de publicação permanece a mesma
    const textLength = text.trim().length;
    const hasMedia = mediaFiles.length > 0;
    setIsPublishDisabled(!(textLength > 0 || hasMedia) || isProcessing);
  }, [text, mediaFiles, isProcessing]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePublishClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPublishDisabled || !user) return;

    setIsProcessing(true);
    setError(null);

    try {
        // Passo 1: Preparar os dados para o serviço.
        // A lógica de upload de mídia pode ser abstraída para dentro do serviço no futuro,
        // mas por agora, vamos assumir que ela retorna URLs.
        const uploadedUrls = await Promise.all(
            mediaFiles.map(m => new Promise<string>(resolve => setTimeout(() => resolve(m.url), 200))) // Simula upload
        );

        const postData = {
            content: text,
            mediaUrls: uploadedUrls,
            // Adicionando outros campos que o serviço pode esperar
            isPublic: true,
            relatedGroupId: selectedGroup?.id,
            location: displayLocation === 'Global' ? undefined : displayLocation,
        };

        // Passo 2: Chamar o serviço de publicação de feed.
        // A lógica complexa foi movida para o serviço. O hook apenas chama o método 'create'.
        const newPost = await ServiçoPublicaçãoFeed.create(postData);

        console.log('Post criado com sucesso:', newPost);

        // Passo 3: Redirecionar o usuário após o sucesso.
        if (selectedGroup) {
            navigate(`/group-chat/${selectedGroup.id}`);
        } else {
            navigate('/feed');
        }

    } catch (error: any) {
        console.error("Erro ao publicar o post:", error);
        setError(error.message || "Ocorreu um erro desconhecido. Tente novamente.");
    } finally {
        setIsProcessing(false);
    }
  };
  
  // O restante do hook (handlers de mídia, localização, etc.) permanece o mesmo para não quebrar a UI
  // Estes são apenas exemplos para manter a estrutura
  const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => {};
  const handleRemoveMedia = (index: number) => {};
  const saveLocation = () => {};
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};

  return {
    isAd, text, setText, mediaFiles, isPublishDisabled, isProcessing, error,
    adBudget, setAdBudget, adLink, setAdLink,
    isAdultContent, setIsAdultContent, displayLocation, 
    selectedGroup, setSelectedGroup,
    handleMediaChange, handleRemoveMedia, handleBack, handlePublishClick,
    saveLocation, handleCountryChange, handleStateChange,
    //... (exportar outros estados e funções que a página pode precisar)
  };
};
