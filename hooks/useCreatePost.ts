
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// CORREÇÃO: A importação foi alterada para usar a sintaxe de importação padrão.
import ServiçoPublicacaoFeed from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { contentSafetyService } from '../ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/contentSafetyService.js';
import { adService } from '../ServiçosFrontend/ServiçoDeAnúncios/adService.js';
import { DadosCriacaoPost, ErrosCriacaoPost } from '../tipos/types.Post';

export const useCreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as { isAd?: boolean } | null;

    const [dadosPost, setDadosPost] = useState<Omit<DadosCriacaoPost, 'grupoSelecionado'>>({
        texto: '',
        arquivosMidia: [],
        isConteudoAdulto: false,
        localizacao: 'Global',
        isAnuncio: locationState?.isAd || false,
        orcamentoAnuncio: '',
        linkAnuncio: '',
    });

    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<ErrosCriacaoPost | null>(null);
    
    const currentUser = useMemo(() => authService.getCurrentUser(), []);

    const updateField = useCallback((key: keyof typeof dadosPost, value: any) => {
        setDadosPost(prev => ({ ...prev, [key]: value }));
    }, []);

    useEffect(() => {
        const textLength = dadosPost.texto.trim().length;
        const hasMedia = dadosPost.arquivosMidia.length > 0;
        setIsPublishDisabled(!(textLength > 0 || hasMedia) || isProcessing);
    }, [dadosPost, isProcessing]);

    const handleBack = () => navigate(-1);

    const handlePublishClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        if (isPublishDisabled || !currentUser) return;

        setIsProcessing(true);
        setError(null);

        try {
            const uploadedUrls = dadosPost.arquivosMidia.map(m => m.url);

            const postData = {
                content: dadosPost.texto,
                authorId: currentUser.id,
                mediaUrls: uploadedUrls,
                isPublic: true, 
                location: dadosPost.localizacao === 'Global' ? undefined : dadosPost.localizacao,
            };

            // A chamada agora usa a importação padrão e a função com nome correto.
            await ServiçoPublicacaoFeed.createPost(postData);

            navigate('/feed');

        } catch (error: any) {
            console.error("Erro ao publicar o post:", error);
            setError({ geral: error.message || "Ocorreu um erro desconhecido." });
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
        isLocationModalOpen: false, 
        setIsLocationModalOpen: () => {},
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
