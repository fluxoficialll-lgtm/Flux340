
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Post, Comment } from '../types';
import { usePostActions } from './usePostActions';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';

export const usePostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);

  const currentUser = authService.getCurrentUser();
  const currentUserId = currentUser?.id;

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const foundPost = await ServiçoPublicaçãoFeed.getPostById(id);
        if (foundPost) {
          setPost(foundPost);
          // Assumindo que os comentários são parte do objeto do post
          setComments(foundPost.commentsList || []);
        } else {
          navigate('/feed');
        }
      } catch (error) {
        console.error("Falha ao buscar detalhes do post:", error);
        navigate('/feed'); // Redireciona em caso de erro
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    loadData();
  }, [id, loadData]);

  // O dummy post permanece útil para evitar erros de renderização antes do post carregar
  const dummyPost: Post = { id: '', likes: 0, comments: 0, liked: false, username: '', avatar: '', time: '', text: '' };
  const { handleCommentSubmit, isCommenting, commentError, handleLike, handleDelete } = usePostActions(post || dummyPost);

  const handleSendComment = async () => {
    if (!commentText.trim() || !post || !currentUser) return;
    
    const success = await handleCommentSubmit(commentText.trim());
    
    if (success) {
        setCommentText('');
        setReplyingTo(null);
        loadData(); // Recarrega os dados para mostrar o novo comentário
    }
  };
  
  // Estas funções podem ser implementadas no futuro
  const handleDeleteComment = async (commentId: string) => { /* ... */ };
  const handleCommentLike = (commentId: string) => { /* ... */ };
  const handleVote = (optionIndex: number) => { /* ... */ };

  return {
    post, 
    comments, 
    commentText, 
    setCommentText, 
    replyingTo, 
    setReplyingTo, 
    currentUserId, 
    handleLike, // Vem do usePostActions
    handleDelete, // Vem do usePostActions
    handleSendComment, 
    handleDeleteComment, 
    handleCommentLike, 
    handleVote, 
    navigate,
    isCommenting, 
    commentError, 
  };
};
