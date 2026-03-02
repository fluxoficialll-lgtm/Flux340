
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { groupService } from '../ServiçosFrontend/ServiçoDeSimulação/serviceFactory';
import { contentSafetyService } from '../ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/contentSafetyService.js';
import { adService } from '../ServiçosFrontend/ServiçoDeAnúncios/adService.js';
import { Post, Group } from '../types';

interface MediaPreview {
  file: File;
  url: string;
  type: 'image';
}

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

  const [adBudget, setAdBudget] = useState('');
  const [adLink, setAdLink] = useState('');
  const [isAdultContent, setIsAdultContent] = useState(false);
  const [displayLocation, setDisplayLocation] = useState('Global');
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  
  const currentUser = useMemo(() => authService.getCurrentUser(), []);

  useEffect(() => {
    const textLength = text.trim().length;
    const hasMedia = mediaFiles.length > 0;
    setIsPublishDisabled(!(textLength > 0 || hasMedia) || isProcessing);
  }, [text, mediaFiles, isProcessing]);

  const handleBack = () => {
    navigate(-1);
  };

  const handlePublishClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPublishDisabled || !currentUser) return;

    setIsProcessing(true);
    setError(null);

    try {
        const uploadedUrls = await Promise.all(
            mediaFiles.map(m => new Promise<string>(resolve => setTimeout(() => resolve(m.url), 200)))
        );

        const postData = {
            content: text,
            author_id: currentUser.id,
            mediaUrls: uploadedUrls,
            isPublic: true,
            relatedGroupId: selectedGroup?.id,
            location: displayLocation === 'Global' ? undefined : displayLocation,
        };

        const newPost = await ServiçoPublicaçãoFeed.create(postData);

        console.log('Post criado com sucesso:', newPost);

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
    avatarUrl: currentUser?.avatar_url,
    username: currentUser?.username,
    myGroups: [],
    isLocationModalOpen: false,
    setIsLocationModalOpen: () => {},
    isGroupModalOpen: false,
    setIsGroupModalOpen: () => {},
    targetCountry: '',
    targetState: '',
    targetCity: '',
    setTargetCity: () => {},
    countries: [],
    states: [],
    cities: [],
    navigate,
  };
};
