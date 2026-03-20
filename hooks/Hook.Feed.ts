
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import ServiçoPublicacaoFeed from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { Post } from '../tipos';

export const HookFeed = (initialCategory: string = 'all') => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const observer = useRef<IntersectionObserver | null>(null);
  const navigate = useNavigate();

  // UI State & Refs
  const [uiVisible, setUiVisible] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLocationFilter, setActiveLocationFilter] = useState('Global');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);

  // Estado de Autenticação Reativo
  const [authState, setAuthState] = useState(authService.getState());
  const currentUserId = authState.user?.id;

  // Inscrição no Serviço de Autenticação
  useEffect(() => {
    const unsubscribe = authService.subscribe(setAuthState);
    return () => unsubscribe();
  }, []);

  // Função para rolagem da UI
  const handleContainerScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const currentScrollTop = container.scrollTop;
      setUiVisible(currentScrollTop <= lastScrollTop.current || currentScrollTop < 100);
      lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }
  };

  // Função para buscar os posts (agora com useCallback)
  const fetchPosts = useCallback(async (isNewCategory = false) => {
    // Impede a busca se já estiver carregando ou se não houver ID de usuário
    if (loading || (!hasMore && !isNewCategory) || !currentUserId) return;
    
    setLoading(true);
    setError(null);

    const currentPage = isNewCategory ? 1 : page;

    try {
      const fetchedPosts = await ServiçoPublicacaoFeed.obterFeed(currentUserId, category, currentPage, 10);
      if (fetchedPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts(prev => isNewCategory ? fetchedPosts : [...prev, ...fetchedPosts]);
        setPage(prev => prev + 1);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
        if (err.message.includes('Token inválido')) {
          authService.logout();
          navigate('/login');
        }
      }
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, category, currentUserId, navigate]);

  // Efeito para buscar posts quando a categoria ou o usuário mudam
  useEffect(() => {
    // A dependência de 'fetchPosts' garante que a busca seja refeita quando o usuário logar
    // (pois a função 'fetchPosts' será recriada com o novo 'currentUserId')
    setPosts([]);
    setPage(1);
    setHasMore(true);
    fetchPosts(true); 
  }, [category, fetchPosts]);

  // Observador de intersecção para rolagem infinita
  const lastPostElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        fetchPosts();
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchPosts]);

  // Handlers de Interação com Post
  const handlePostLike = (id: string) => console.log('Like no post:', id);
  const handlePostDelete = (id: string) => {
    console.log('Deletar post:', id);
    setPosts(prevPosts => prevPosts.filter(p => p.id !== id));
  };
  const handlePostVote = (postId: string, index: number) => console.log('Voto no post:', postId, 'opção:', index);
  const handlePostShare = (post: Post) => console.log('Compartilhar post:', post);
  const handleCtaClick = () => console.log('CTA clicado');

  return {
    posts, loading, error, hasMore, lastPostElementRef, setCategory, scrollContainerRef, 
    currentUserId, uiVisible, activeLocationFilter, isMenuOpen, setIsMenuOpen,
    handleContainerScroll, handlePostLike, handlePostDelete, handlePostVote, 
    handlePostShare, handleCtaClick, navigate
  };
};
