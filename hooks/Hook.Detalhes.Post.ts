
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { PublicacaoFeed } from '../types/Saida/Types.Estrutura.Publicacao.Feed';
import { HookAcoesPost } from './Hook.Acoes.Post';
import { feedPublicationService } from '../ServiçosFrontend/ServiçosDePublicações/Servico.Publicacao.Feed';

export const HookDetalhesPost = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [post, setPost] = useState<PublicacaoFeed | null>(null);
  // Os comentários agora são parte do objeto post, então este estado pode não ser mais necessário
  // dependendo da implementação.
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);

  const currentUser = authService.getCurrentUser();
  const currentUserId = currentUser?.id;

  const loadData = useCallback(async () => {
    if (id) {
      try {
        const foundPost = await feedPublicationService.getById(id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          navigate('/feed');
        }
      } catch (error) {
        console.error("Falha ao buscar detalhes do post:", error);
        navigate('/feed');
      }
    }
  }, [id, navigate]);

  useEffect(() => {
    loadData();
  }, [id, loadData]);

  // Criar um objeto dummy que satisfaça a interface PublicacaoFeed para evitar erros de renderização.
  const dummyPost: PublicacaoFeed = {
    id: '', 
    texto: '', 
    author: { id: '', nome: '', avatar: '' }, 
    criadoEm: new Date(), 
    curtidas: [], 
    comentarios: [],
    // Adicione outras propriedades obrigatórias com valores padrão
    imagemUrl: null,
    videoUrl: null,
    enquete: null,
    // etc...
  };

  const { handleCommentSubmit, isCommenting, commentError, handleLike, handleDelete } = HookAcoesPost(post || dummyPost);

  const handleSendComment = async () => {
    if (!commentText.trim() || !post || !currentUser) return;
    
    const success = await handleCommentSubmit(commentText.trim());
    
    if (success) {
        setCommentText('');
        setReplyingTo(null);
        loadData();
    }
  };
  
  const handleDeleteComment = async (commentId: string) => { /* ... */ };
  const handleCommentLike = (commentId: string) => { /* ... */ };
  const handleVote = (optionIndex: number) => { /* ... */ };

  return {
    post, 
    comments: post?.comentarios || [], // Deriva os comentários do estado do post
    commentText, 
    setCommentText, 
    replyingTo, 
    setReplyingTo, 
    currentUserId, 
    handleLike, 
    handleDelete, 
    handleSendComment, 
    handleDeleteComment, 
    handleCommentLike, 
    handleVote, 
    navigate,
    isCommenting, 
    commentError, 
  };
};
