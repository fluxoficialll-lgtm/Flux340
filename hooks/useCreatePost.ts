
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
// CORREÇÃO: A importação foi atualizada para usar o serviço real.
import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService.js';
import { contentSafetyService } from '../ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/contentSafetyService.js';
import { adService } from '../ServiçosFrontend/ServiçoDeAnúncios/adService.js';
// CORREÇÃO: Caminhos dos tipos ajustados
import { DadosCriacaoPost, ErrosCriacaoPost } from '../tipos/types.Post'; 
import { Group } from '../tipos/types.Criacao.Grupo.Publico';

export const useCreatePost = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const locationState = location.state as { isAd?: boolean } | null;

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

    const [myGroups, setMyGroups] = useState<Group[]>([]);
    const [isPublishDisabled, setIsPublishDisabled] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<ErrosCriacaoPost | null>(null);
    
    const currentUser = useMemo(() => authService.getCurrentUser(), []);

    const updateField = useCallback((key: keyof DadosCriacaoPost, value: any) => {
        setDadosPost(prev => ({ ...prev, [key]: value }));
    }, []);

    // CORREÇÃO: Busca os grupos do usuário.
    useEffect(() => {
        const fetchGroups = async () => {
            const token = localStorage.getItem('authToken');
            if (token && currentUser) {
                try {
                    const allGroups = await groupService.listGroups(token);
                    // Filtra grupos onde o usuário é criador ou membro
                    const userGroups = allGroups.filter(g => g.creatorId === currentUser.id || g.memberIds?.includes(currentUser.id));
                    setMyGroups(userGroups);
                } catch (err) {
                    console.error("Falha ao buscar grupos:", err);
                }
            }
        };
        fetchGroups();
    }, [currentUser]);

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
            // A lógica de upload de arquivos deve ser implementada aqui
            const uploadedUrls = dadosPost.arquivosMidia.map(m => m.url); // Usando URLs temporárias

            const postData = {
                content: dadosPost.texto,
                authorId: currentUser.id,
                mediaUrls: uploadedUrls,
                isPublic: !dadosPost.grupoSelecionado, 
                relatedGroupId: dadosPost.grupoSelecionado?.id,
                location: dadosPost.localizacao === 'Global' ? undefined : dadosPost.localizacao,
            };

            // CORREÇÃO: Usa createPost como nos outros hooks
            await ServiçoPublicaçãoFeed.createPost(postData);

            if (dadosPost.grupoSelecionado) {
                navigate(`/group-chat/${dadosPost.grupoSelecionado.id}`);
            } else {
                navigate('/feed');
            }

        } catch (error: any) {
            console.error("Erro ao publicar o post:", error);
            setError({ geral: error.message || "Ocorreu um erro desconhecido." });
        } finally {
            setIsProcessing(false);
        }
    }; 

    // Funções de manipulação de UI (stubs)
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
        myGroups, // CORREÇÃO: Retorna os grupos buscados
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
