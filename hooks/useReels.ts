
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Reel, Comment } from '../types';

// Serviços de produção corretos
import { ServiçoPublicacaoReels } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoReels.js';
import { MetricasPublicacaoReels } from '../ServiçosFrontend/SistemaDeMétricas/Métricas.Publicação.Reels.js';
import { ServicoPublicacaoComentariosReels } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoComentáriosReels.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';

export const useReels = () => {
    const navigate = useNavigate();
    const [reels, setReels] = useState<Reel[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activeReelId, setActiveReelId] = useState<string | null>(null);
    const [currentComments, setCurrentComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');
    const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);

    const [isCommenting, setIsCommenting] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);

    const currentUser = authService.getCurrentUser();

    const loadReels = useCallback(async () => {
        try {
            setIsLoading(true);
            const fetchedReels = await ServiçoPublicacaoReels.getReels();
            setReels(fetchedReels || []); // Garante que é um array
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Falha ao carregar os reels.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadReels();
    }, [loadReels]);

    const handleLike = useCallback(async (reelId: string) => {
        try {
            await MetricasPublicacaoReels.toggleLike(reelId);
            setReels(prevReels =>
                prevReels.map(reel => {
                    if (reel.id === reelId) {
                        const isLiked = !reel.isLiked;
                        const likesCount = isLiked ? reel.likesCount + 1 : reel.likesCount - 1;
                        return { ...reel, isLiked, likesCount };
                    }
                    return reel;
                })
            );
        } catch (err) {
            console.error("Falha ao curtir o reel:", err);
        }
    }, []);

    const handleCommentClick = useCallback((reelId: string) => {
        const reel = reels.find(r => r.id === reelId);
        if (reel) {
            setActiveReelId(reelId);
            setCurrentComments(reel.commentsList || []);
            setIsCommentModalOpen(true);
        }
    }, [reels]);

    const handleSendComment = async () => {
        if (!activeReelId || !commentText.trim()) return;

        setIsCommenting(true);
        setCommentError(null);

        try {
            const newComment = await ServicoPublicacaoComentariosReels.create(activeReelId, {
                content: commentText.trim(),
                parentCommentId: replyingTo?.id || null,
            });

            const updateComments = (reel: Reel) => ({
                ...reel,
                commentsList: [...(reel.commentsList || []), newComment],
                commentsCount: (reel.commentsCount || 0) + 1,
            });

            setReels(prev => prev.map(r => (r.id === activeReelId ? updateComments(r) : r)));
            setCurrentComments(prev => [...prev, newComment]);
            setCommentText('');
            setReplyingTo(null);
        } catch (err: any) {
            setCommentError(err.message || 'Falha ao enviar comentário.');
        } finally {
            setIsCommenting(false);
        }
    };

    const handleDeleteReel = useCallback(async (reelId: string, confirmAction: () => Promise<boolean>) => {
        if (await confirmAction()) {
            try {
                await MetricasPublicacaoReels.deleteReel(reelId);
                setReels(prev => prev.filter(r => r.id !== reelId));
            } catch (err) {
                console.error("Falha ao deletar o reel:", err);
            }
        }
    }, []);

    const handleDeleteComment = useCallback(async (commentId: string, confirmAction: () => Promise<boolean>) => {
        if (!activeReelId) return;
        if (await confirmAction()) {
            try {
                await MetricasPublicacaoReels.deleteComment(activeReelId, commentId);
                const updateComments = (reel: Reel) => ({
                    ...reel,
                    commentsList: (reel.commentsList || []).filter(c => c.id !== commentId),
                    commentsCount: Math.max(0, (reel.commentsCount || 0) - 1),
                });
                setReels(prev => prev.map(r => (r.id === activeReelId ? updateComments(r) : r)));
                setCurrentComments(prev => prev.filter(c => c.id !== commentId));
            } catch (err) {
                console.error("Falha ao deletar o comentário:", err);
            }
        }
    }, [activeReelId]);

    const handleCommentLike = useCallback(async (commentId: string) => {
        if (!activeReelId) return;
        try {
            await MetricasPublicacaoReels.toggleCommentLike(activeReelId, commentId);
            const mapLikes = (c: Comment) => c.id === commentId ? { ...c, isLiked: !c.isLiked, likesCount: c.isLiked ? c.likesCount - 1 : c.likesCount + 1 } : c;
            
            setReels(prev => prev.map(r => r.id === activeReelId ? { ...r, commentsList: (r.commentsList || []).map(mapLikes) } : r));
            setCurrentComments(prev => prev.map(mapLikes));
        } catch (err) {
            console.error("Falha ao curtir o comentário:", err);
        }
    }, [activeReelId]);

    const handleShare = useCallback(async (reelId: string) => {
        try {
            await MetricasPublicacaoReels.incrementShare(reelId);
            setReels(prev => prev.map(r => r.id === reelId ? { ...r, sharesCount: (r.sharesCount || 0) + 1 } : r));
            // Aqui poderia abrir o menu de compartilhamento nativo
            navigator.clipboard.writeText(`${window.location.origin}/reels/${reelId}`);
        } catch (err) {
            console.error("Falha ao compartilhar o reel:", err);
        }
    }, []);
    
    const handleView = useCallback(async (reelId: string) => {
        try {
            await MetricasPublicacaoReels.incrementView(reelId);
        } catch (error) {
            console.error('Falha ao registrar visualização:', error);
        }
    }, []);

    // Funções utilitárias que dependem de authService
    const getDisplayName = (handle: string) => authService.getUserByHandle(handle)?.profile?.nickname || handle;
    const getUserAvatar = (handle: string) => authService.getUserByHandle(handle)?.profile?.photoUrl;

    return {
        reels,
        isLoading,
        error,
        currentUser,
        isCommentModalOpen,
        setIsCommentModalOpen,
        activeReelId,
        currentComments,
        commentText,
        setCommentText,
        replyingTo,
        setReplyingTo,
        isCommenting,
        commentError,
        handleLike,
        handleCommentClick,
        handleSendComment,
        handleDeleteReel,
        handleDeleteComment,
        handleCommentLike,
        handleShare,
        handleView,
        getDisplayName,
        getUserAvatar,
        navigate,
    };
};
