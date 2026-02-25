
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postService } from '../ServiçosFrontend/ServiçoDePosts/postService';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Post, Comment } from '../types';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
// PASSO 1: Importar o hook de ações que refatoramos
import { usePostActions } from './usePostActions';

export const usePostDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);

  const currentUser = authService.getCurrentUser();
  const currentUserId = currentUser?.id;

  // A função para carregar os dados permanece a mesma
  const loadData = useCallback(() => {
    if (id) {
      const foundPost = postService.getPostById(id);
      if (foundPost) {
        setPost(foundPost);
        setComments(foundPost.commentsList || []);
      } else {
        navigate('/feed');
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    loadData();
    const unsub = servicoDeSimulacao.subscribe('posts', (updatedPost) => {
        if (updatedPost.id === id) {
            loadData();
        }
    });
    return () => unsub();
  }, [id, loadData]);

  // PASSO 2: Instanciar o usePostActions, se o post existir
  // Usamos um post 'dummy' se o post principal ainda não carregou para evitar erros
  const dummyPost: Post = { id: '', likes: 0, comments: 0, liked: false, username: '', avatar: '', time: '', text: '' };
  const { handleCommentSubmit, isCommenting, commentError } = usePostActions(post || dummyPost);

  // A lógica de Like pode ser movida para o usePostActions no futuro, mas mantemos por enquanto
  const handleLike = () => {
    if (!post) return;
    const isLiked = !post.liked;
    setPost(p => p ? { ...p, liked: isLiked, likes: p.likes + (isLiked ? 1 : -1) } : null);
    postService.toggleLike(post.id);
  };

  // PASSO 3: Substituir a lógica de handleSendComment
  const handleSendComment = async () => {
    if (!commentText.trim() || !post || !currentUser) return;
    
    // Chama a função do nosso hook centralizado
    const success = await handleCommentSubmit(commentText.trim());
    
    // Se a publicação for bem-sucedida, limpamos a UI e recarregamos os dados
    if (success) {
        setCommentText('');
        setReplyingTo(null);
        // Recarrega a lista de comentários para exibir o novo comentário
        loadData(); 
    }
    // O estado de erro (commentError) e carregamento (isCommenting) já são gerenciados pelo usePostActions
  };
  
  // As outras funções (delete, like de comentário, etc) permanecem por enquanto
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
    handleLike, 
    handleSendComment, // Agora esta função usa nossa nova lógica
    handleDeleteComment, 
    handleCommentLike, 
    handleVote, 
    navigate,
    // PASSO 4: Expor os novos estados para a página
    isCommenting, // Para a UI saber que um comentário está sendo enviado
    commentError, // Para a UI poder exibir uma mensagem de erro
  };
};
