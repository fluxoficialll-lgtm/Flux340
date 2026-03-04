
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reel, Comment, User } from '../types'; // Garanta que User está sendo importado
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';

// A simulação será ativada com base na flag do localStorage
const IS_SIMULATING = localStorage.getItem('isSimulating') === 'true';

export const useReels = () => {
    const navigate = useNavigate();
    const [reels, setReels] = useState<Reel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activeReelId, setActiveReelId] = useState<string | null>(null);
    const [currentComments, setCurrentComments] = useState<Comment[]>([]);
    
    // ... (restante dos estados não precisa de alteração imediata)
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const user = authService.getCurrentUser();
        setCurrentUser(user);
    }, []);

    // Função para carregar os reels
    const loadReels = useCallback(async () => {
        setIsLoading(true);
        try {
            let fetchedReels: Reel[];

            if (IS_SIMULATING) {
                console.log('[SIMULAÇÃO] useReels: Buscando reels do endpoint /api/reels');
                const response = await fetch('/api/reels');
                if (!response.ok) throw new Error('Falha ao buscar reels simulados.');
                const data = await response.json();
                
                // O simulador já retorna os dados em um formato compatível com a interface Reel
                // Adicionamos os campos que o componente espera
                fetchedReels = data.map((reel: any) => ({
                    ...reel,
                    author: {
                        ...reel.author,
                        // Simulando o nome de exibição e avatar que o componente espera
                        displayName: reel.author.name,
                        avatarUrl: reel.author.avatar,
                    },
                    // Mapeando para as propriedades corretas do tipo `Reel`
                    likesCount: reel.likes,
                    commentsCount: reel.comments,
                    commentsList: [], // Inicialmente vazio
                    sharesCount: 0, // Simulando
                }));

            } else {
                // **MANTÉM O CÓDIGO DE PRODUÇÃO**
                // const { ServiçoPublicacaoReels } = await import('../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoReels.js');
                // fetchedReels = await ServiçoPublicacaoReels.getReels();
                console.warn('Modo de produção para Reels não implementado neste exemplo.');
                fetchedReels = [];
            }
            
            setReels(fetchedReels);
            setError(null);
        } catch (err: any) {
            console.error("Erro em useReels:", err);
            setError(err.message || 'Falha ao carregar os reels.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadReels();
    }, [loadReels]);

    // Manipulador de curtidas adaptado para a simulação
    const handleLike = useCallback((reelId: string) => {
        console.log(`[SIMULAÇÃO] Like/Unlike no reel: ${reelId}`);
        setReels(prevReels =>
            prevReels.map(reel => {
                if (reel.id === reelId) {
                    return {
                        ...reel,
                        isLiked: !reel.isLiked,
                        likesCount: reel.isLiked ? reel.likesCount - 1 : reel.likesCount + 1,
                    };
                }
                return reel;
            })
        );
        // Em produção, você chamaria o serviço aqui.
    }, []);
    
    // O restante dos handlers (comentários, compartilhamento, etc.) pode ser adaptado de forma semelhante se necessário.
    // Por agora, vamos focar em exibir os reels e a função de curtir.

    const handleCommentClick = useCallback((reelId: string) => {
        const reel = reels.find(r => r.id === reelId);
        if (reel) {
            setActiveReelId(reelId);
            setCurrentComments(reel.commentsList || []);
            setIsCommentModalOpen(true);
        }
    }, [reels]);

    return {
        reels,
        isLoading,
        error,
        currentUser,
        handleLike,
        handleCommentClick, // Necessário para a UI
        isCommentModalOpen, // Necessário para a UI
        setIsCommentModalOpen, // Necessário para a UI
        currentComments, // Necessário para a UI
        // Mock de outras funções para evitar erros
        handleShare: (id: string) => console.log('Share (simulado):', id),
        handleView: (id: string) => console.log('View (simulado):', id),
        navigate, 
    };
};
