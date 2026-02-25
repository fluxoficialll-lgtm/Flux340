
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { reelsService } from '../ServiçosFrontend/ServiçoDeReels/reelsService.js';
import { postService } from '../ServiçosFrontend/ServiçoDePosts/postService';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { recommendationService } from '../ServiçosFrontend/ServiçoDeRecomendação/recommendationService.js';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { Post, Comment, Reel } from '../types'; // Import Reel type
// PASSO 1: Importar o hook de ações que criamos para Reels
import { useReelActions } from './useReelActions';

export const useReels = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const navState = location.state as { authorId?: string } | null;
    const containerRef = useRef<HTMLDivElement>(null);

    const [reels, setReels] = useState<Post[]>([]);
    const [activeReelIndex, setActiveReelIndex] = useState(0);
    const [expandedReels, setExpandedReels] = useState<Set<string>>(new Set());

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [activeReelId, setActiveReelId] = useState<string | null>(null);
    const [currentComments, setCurrentComments] = useState<Comment[]>([]);
    const [commentText, setCommentText] = useState('');

    const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);

    const currentUser = authService.getCurrentUser();
    const currentUserId = currentUser?.id;

    const loadReels = useCallback(() => { /* ... load logic ... */ });

    useEffect(() => { /* ... load and subscription logic ... */ }, [loadReels]);

    // ... (other useEffects and handlers remain mostly the same)

    // PASSO 2: Identificar o Reel ativo e instanciar o hook de ações
    const activeReel = useMemo(() => reels[activeReelIndex], [reels, activeReelIndex]);
    const dummyReel: Reel = { id: '', videoUrl: '', authorId: '', commentsCount: 0, likesCount: 0 };
    const { handleCommentSubmit, isCommenting, commentError } = useReelActions(activeReel || dummyReel);

    const handleCommentClick = useCallback((reelId: string) => {
        const reel = reels.find(r => r.id === reelId);
        if (reel) {
            setActiveReelId(reelId);
            // O ideal seria buscar os comentários do serviço real aqui
            setCurrentComments(reel.commentsList || []);
            setIsCommentModalOpen(true);
        }
    }, [reels]);

    // PASSO 3: Substituir a lógica de handleSendComment
    const handleSendComment = async () => {
        if (!activeReelId || !commentText.trim()) return;
        
        // A função handleCommentSubmit do useReelActions já está "mirando" no reel ativo
        const success = await handleCommentSubmit(commentText.trim());

        if (success) {
            setCommentText('');
            setReplyingTo(null);
            // Recarrega os dados para obter o novo comentário
            // Uma abordagem mais otimizada seria apenas adicionar o novo comentário ao estado local
            const post = postService.getPostById(activeReelId); 
            if(post) setCurrentComments(post.commentsList || []);
        }
        // Os estados de erro e carregamento já são gerenciados pelo useReelActions
    };
    
    // ... (rest of the functions: handleLike, handleDeleteReel, etc.)
    const toggleReadMore = (reelId: string, e: React.MouseEvent) => { /* ... */ };
    const reportWatchTime = useCallback((reelId: string) => { /* ... */ }, [reels]);
    const handleLike = useCallback(async (reelId: string) => { /* ... */ }, []);
    const handleDeleteReel = useCallback(async (reelId: string, confirmAction: () => Promise<boolean>) => { /* ... */ }, []);
    const handleDeleteComment = useCallback(async (commentId: string, confirmAction: () => Promise<boolean>) => { /* ... */ }, [activeReelId]);
    const handleCommentLike = useCallback((commentId: string) => { /* ... */ }, [activeReelId]);
    const handleShare = useCallback(async (reel: Post) => { /* ... */ }, []);
    const getDisplayName = (u: string) => authService.getUserByHandle(u)?.profile?.nickname || u;
    const getUserAvatar = (u: string) => authService.getUserByHandle(u)?.profile?.photoUrl;

    return {
        containerRef,
        reels,
        activeReelIndex,
        expandedReels,
        toggleReadMore,
        isCommentModalOpen,
        setIsCommentModalOpen,
        currentComments,
        commentText,
        setCommentText,
        replyingTo,
        setReplyingTo,
        currentUserId,
        handleLike,
        handleDeleteReel,
        handleCommentClick,
        handleSendComment, // Agora usa a lógica do serviço real
        handleDeleteComment,
        handleCommentLike,
        handleShare,
        reportWatchTime,
        getDisplayName,
        getUserAvatar,
        // PASSO 4: Expor os novos estados para a UI
        isCommenting,
        commentError
    };
};
