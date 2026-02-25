
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { marketplaceService } from '../ServiçosFrontend/ServiçoDeMarketplace/marketplaceService.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { chatService } from '../ServiçosFrontend/ServiçoDeChat/chatService';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { MarketplaceItem, Comment as CommentType, ChatMessage } from '../types';
// PASSO 1: Importar o hook de ações que criamos para o marketplace
import { useMarketplaceItemActions } from './useMarketplaceItemActions';

export const useProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [item, setItem] = useState<MarketplaceItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [questions, setQuestions] = useState<CommentType[]>([]);
  const [commentText, setCommentText] = useState('');
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [replyingTo, setReplyingTo] = useState<{ id: string, username: string } | null>(null);
  const [zoomedMedia, setZoomedMedia] = useState<{ url: string, type: 'image' | 'video' } | null>(null);

  const currentUser = authService.getCurrentUser();

  const loadData = useCallback(() => {
    if (id) {
      const foundItem = marketplaceService.getItemById(id);
      if (foundItem) {
        setItem(foundItem);
        setQuestions(foundItem.comments || []);
        setIsSeller(currentUser?.email === foundItem.sellerId || currentUser?.id === foundItem.sellerId);
      }
    }
    setLoading(false);
  }, [id, currentUser]);

  useEffect(() => {
    loadData();
    const unsub = servicoDeSimulacao.subscribe('marketplace', loadData);
    return () => unsub();
  }, [loadData]);

  // PASSO 2: Instanciar o hook de ações, passando o item do marketplace
  // Usamos um item 'dummy' para evitar erros antes do item ser carregado
  const dummyItem: MarketplaceItem = { id: '', title: '', price: 0, image: '', sellerId: '' };
  const { handleCommentSubmit, isCommenting, commentError } = useMarketplaceItemActions(item || dummyItem);

  // PASSO 3: Substituir a lógica de handleSendQuestion
  const handleSendQuestion = async () => {
    if (!commentText.trim() || !item) return;

    // Chama a função do nosso hook centralizado. A lógica de responder ainda pode ser aprimorada aqui.
    // Por enquanto, estamos focando na criação de um novo comentário/pergunta.
    const success = await handleCommentSubmit(commentText.trim());

    if (success) {
      setCommentText('');
      setReplyingTo(null); // Limpa o estado de resposta
      loadData(); // Recarrega os dados para mostrar a nova pergunta
    }
    // Os estados de erro e carregamento (commentError, isCommenting) já vêm do useMarketplaceItemActions
  };

  const handleChat = useCallback(() => { /* ... */ }, [currentUser, item, isSeller, navigate]);
  const handleDeleteQuestion = useCallback(async (commentId: string) => { /* ... */ }, [item]);
  const handleLikeQuestion = useCallback((commentId: string) => { /* ... */ }, [item]);
  const handleDeleteItem = useCallback(async () => { /* ... */ }, [id, navigate]);
  const navigateToStore = useCallback(() => { /* ... */ }, [item, navigate]);
  const mediaItems = useMemo(() => { /* ... */ }, [item]);

  return {
    item, loading, isSeller, questions, commentText, setCommentText, isCommentModalOpen, setIsCommentModalOpen,
    replyingTo, setReplyingTo, zoomedMedia, setZoomedMedia, currentUser,
    handleChat, 
    handleSendQuestion, // Agora esta função usa nossa nova lógica de serviço
    handleDeleteQuestion, 
    handleLikeQuestion, 
    handleDeleteItem,
    navigateToStore, 
    mediaItems,
    // PASSO 4: Expor os novos estados para a página poder utilizá-los
    isCommenting, 
    commentError,
  };
};
