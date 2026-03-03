
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { groupService } from '../ServiçosFrontend/ServiçoDeSimulação/serviceFactory';
import { contentSafetyService } from '../ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/contentSafetyService.js';
import { adService } from '../ServiçosFrontend/ServiçoDeAnúncios/adService.js';
import { DadosCriacaoPost, TipoArquivoMidia, ErrosCriacaoPost, Group } from '../tipos';

export const useCreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as { isAd?: boolean } | null;

    // Estado unificado para os dados da postagem
    const [dadosPost, setDadosPost] = useState<DadosCriacaoPost>({
        texto: '',
        arquivosMidia: [],
        isConteudoAdulto: false,
        localizacao: 'Global',
        grupoSelecionado: null,
        isAnuncio: locationState?.isAd || false,
        orcamentoAnuncio: '',
        linkAnuncio: '',
    });

    // Estados da interface
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<ErrosCriacaoPost | null>(null);
    
    const currentUser = useMemo(() => authService.getCurrentUser(), []);

    // Função genérica para atualizar os dados da postagem
    const updateField = useCallback((key: keyof DadosCriacaoPost, value: any) => {
        setDadosPost(prev => ({ ...prev, [key]: value }));
    }, []);

    useEffect(() => {
        const textLength = dadosPost.texto.trim().length;
        const hasMedia = dadosPost.arquivosMidia.length > 0;
        setIsPublishDisabled(!(textLength > 0 || hasMedia) || isProcessing);
    }, [dadosPost, isProcessing]);

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
                dadosPost.arquivosMidia.map(m => new Promise<string>(resolve => setTimeout(() => resolve(m.url), 200))) // Simulação de upload
            );

            const postData = {
                content: dadosPost.texto,
                author_id: currentUser.id,
                mediaUrls: uploadedUrls,
                isPublic: true, // Ou baseado em alguma lógica de privacidade
                relatedGroupId: dadosPost.grupoSelecionado?.id,
                location: dadosPost.localizacao === 'Global' ? undefined : dadosPost.localizacao,
            };

            const newPost = await ServiçoPublicaçãoFeed.create(postData);

            if (dadosPost.grupoSelecionado) {
                navigate(`/group-chat/${dadosPost.grupoSelecionado.id}`);
            } else {
                navigate('/feed');
            }

        } catch (error: any) {
            console.error("Erro ao publicar o post:", error);
            setError({ geral: error.message || "Ocorreu um erro desconhecido. Tente novamente." });
        } finally {
            setIsProcessing(false);
        }
    };
  
    const handleMediaChange = (event: React.ChangeEvent<HTMLInputElement>) => { /* ...Lógica para adicionar mídia... */ };
    const handleRemoveMedia = (index: number) => { /* ...Lógica para remover mídia... */ };
    const saveLocation = () => { /* ...Lógica para salvar localização... */ };
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => { /* ... */ };
    const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => { /* ... */ };

    return {
        dadosPost,
        updateField,
        isPublishDisabled,
        isProcessing,
        error,
        handleMediaChange,
        handleRemoveMedia,
        handleBack,
        handlePublishClick,
        saveLocation,
        handleCountryChange,
        handleStateChange,
        avatarUrl: currentUser?.avatar_url,
        username: currentUser?.username,
        myGroups: [], // Lógica para buscar grupos do usuário
        isLocationModalOpen: false, /* ...estados do modal... */
        setIsLocationModalOpen: () => {},
        isGroupModalOpen: false,
        setIsGroupModalOpen: () => {},
        targetCountry: '', /* ...estados de localização... */
        targetState: '',
        targetCity: '',
        setTargetCity: () => {},
        countries: [],
        states: [],
        cities: [],
        navigate,
    };
};
