
import { useState, useCallback } from 'react';
import { Post } from '../types';
// Importando o serviço correto para comentários do feed
import { ServiçoPublicaçãoComentáriosFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoComentáriosFeed.js';
// Mantendo o postService para outras ações como like/delete no futuro
import { postService } from '../ServiçosFrontend/ServiçoDePosts/postService.js';

export const usePostActions = (post: Post) => {
    // Estados existentes para Like
    const [isLiked, setIsLiked] = useState(post.liked);
    const [likesCount, setLikesCount] = useState(post.likes);

    // === NOVOS ESTADOS PARA COMENTÁRIOS ===
    const [isCommenting, setIsCommenting] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);
    const [commentsCount, setCommentsCount] = useState(post.comments);

    const handleLike = useCallback(async () => {
        // ... lógica de like existente
        const originalIsLiked = isLiked;
        setIsLiked(!originalIsLiked);
        setLikesCount(prev => prev + (!originalIsLiked ? 1 : -1));
        try {
            // Simulação da chamada de API para Like
            // await postService.toggleLike(post.id);
        } catch (error) {
            console.error("Falha ao atualizar o like:", error);
            setIsLiked(originalIsLiked);
            setLikesCount(prev => prev - (!originalIsLiked ? 1 : -1));
        }
    }, [isLiked, post.id]);

    // === NOVA FUNÇÃO PARA PUBLICAR COMENTÁRIOS ===
    const handleCommentSubmit = useCallback(async (commentText: string) => {
        if (!commentText.trim()) return;

        setIsCommenting(true);
        setCommentError(null);

        try {
            // Chama o serviço correto que criamos, passando o ID do post e o conteúdo
            const newComment = await ServiçoPublicaçãoComentáriosFeed.create(post.id, { content: commentText });
            
            // Em caso de sucesso, atualiza a contagem de comentários na UI
            setCommentsCount(prev => prev + 1);
            console.log("Comentário publicado com sucesso:", newComment);
            return true; // Retorna sucesso para a UI

        } catch (error: any) {
            console.error("Falha ao publicar o comentário:", error);
            setCommentError(error.message || "Erro ao comentar. Tente novamente.");
            return false; // Retorna falha para a UI
        } finally {
            setIsCommenting(false);
        }
    }, [post.id]);

    const handleDelete = useCallback(async (e: React.MouseEvent) => {
        // ... lógica de delete existente
    }, [post.id]);

    const formatRelativeTime = postService.formatRelativeTime;

    return {
        isLiked,
        likesCount,
        commentsCount, // Exporta a contagem de comentários
        isCommenting,  // Exporta o estado de carregamento
        commentError,  // Exporta o estado de erro
        handleLike,
        handleDelete,
        handleCommentSubmit, // Exporta a nova função
        formatRelativeTime,
    };
};
