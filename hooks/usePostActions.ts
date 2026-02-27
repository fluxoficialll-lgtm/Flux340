
import { useState, useCallback } from 'react';
import { Post } from '../types';
// Importando o serviço correto para comentários do feed
import { ServiçoPublicacaoComentariosFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoComentáriosFeed.js';

export const usePostActions = (post: Post) => {
    // Estados existentes para Like
    const [isLiked, setIsLiked] = useState(post.liked);
    const [likesCount, setLikesCount] = useState(post.likes);

    // === NOVOS ESTADOS PARA COMENTÁRIOS ===
    const [isCommenting, setIsCommenting] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);
    const [commentsCount, setCommentsCount] = useState(post.comments);

    const handleLike = useCallback(async () => {
        const originalIsLiked = isLiked;
        setIsLiked(!originalIsLiked);
        setLikesCount(prev => prev + (!originalIsLiked ? 1 : -1));
        try {
            // A lógica de API para like será gerenciada em outro lugar ou injetada
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
            const newComment = await ServiçoPublicacaoComentariosFeed.create(post.id, { content: commentText });
            
            setCommentsCount(prev => prev + 1);
            console.log("Comentário publicado com sucesso:", newComment);
            return true; 

        } catch (error: any) {
            console.error("Falha ao publicar o comentário:", error);
            setCommentError(error.message || "Erro ao comentar. Tente novamente.");
            return false; 
        } finally {
            setIsCommenting(false);
        }
    }, [post.id]);

    const handleDelete = useCallback(async (e: React.MouseEvent) => {
        // A lógica de delete será gerenciada em outro lugar
    }, [post.id]);

    return {
        isLiked,
        likesCount,
        commentsCount, 
        isCommenting,  
        commentError,  
        handleLike,
        handleDelete,
        handleCommentSubmit, 
    };
};
