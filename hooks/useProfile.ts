
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { marketplaceService } from '../ServiçosFrontend/ServiçoDeMarketplace/marketplaceService.js';
import { Post, User, MarketplaceItem } from '../types';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { handleError } from '../ServiçosFrontend/ServiçosDePrevençãoDeErros/ServicoDeTratamentoDeErro.ts';

export const useProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [activeTab, setActiveTab] = useState('posts');
    const [myPosts, setMyPosts] = useState<Post[]>([]);
    const [myProducts, setMyProducts] = useState<MarketplaceItem[]>([]);
    const [user, setUser] = useState<User | null>(null);
    
    const [followersCount, setFollowersCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);
    const [followListType, setFollowListType] = useState<'followers' | 'following' | null>(null);
    const [followListData, setFollowListData] = useState<User[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadProfileData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const currentUser = authService.getCurrentUser();
            if (!currentUser || !currentUser.id) {
                throw new Error("Usuário não autenticado. Por favor, faça login.");
            }
            setUser(currentUser);

            const storedPosts = await ServiçoPublicaçãoFeed.getFeed('profile', { userId: currentUser.id });
            if (storedPosts && Array.isArray(storedPosts)) {
                setMyPosts(storedPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
            } else {
                setMyPosts([]);
            }

            const storedProducts = marketplaceService.getItems().filter(i => i.sellerId === currentUser.email || i.sellerId === currentUser.id) || [];
            setMyProducts(storedProducts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

            const allRelationships = servicoDeSimulacao.relationships.getAll();
            const userFollowers = allRelationships.filter(rel => rel.followingId === currentUser.id);
            const userFollowing = allRelationships.filter(rel => rel.followerId === currentUser.id);

            setFollowersCount(userFollowers.length);
            setFollowingCount(userFollowing.length);

        } catch (e: any) {
            handleError(e, { a: 1 }, navigate);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        if (location.state && (location.state as any).activeTab) {
            setActiveTab((location.state as any).activeTab);
        }
    }, [location.state]);

    useEffect(() => {
        loadProfileData();
        const unsubPosts = servicoDeSimulacao.subscribe('posts', loadProfileData);
        const unsubRels = servicoDeSimulacao.subscribe('relationships', loadProfileData);
        const unsubUsers = servicoDeSimulacao.subscribe('users', loadProfileData);
        return () => { unsubPosts(); unsubRels(); unsubUsers(); };
    }, [loadProfileData]);

    const deletePost = useCallback(async (postId: string, confirmAction: () => Promise<boolean>) => {
        console.warn('deletePost não implementado');
    }, []);

    const handleLike = useCallback((id: string) => {
        console.warn('handleLike não implementado');
    }, []);

    const handleShowFollowList = useCallback((type: 'followers' | 'following') => {
      if (!user) return;
      const allRelationships = servicoDeSimulacao.relationships.getAll();
      let userIds: string[] = [];

      if (type === 'followers') {
          userIds = allRelationships
              .filter(rel => rel.followingId === user.id)
              .map(rel => rel.followerId);
      } else { // following
          userIds = allRelationships
              .filter(rel => rel.followerId === user.id)
              .map(rel => rel.followingId);
      }

      const users = userIds.map(id => servicoDeSimulacao.users.get(id)).filter((u): u is User => u !== undefined);
      setFollowListData(users);
      setFollowListType(type);
  }, [user]);

    const closeFollowList = useCallback(() => {
        setFollowListType(null);
        setFollowListData([]);
    }, []);

    const navigateToUserProfile = useCallback((username: string) => {
        closeFollowList();
        const clean = username.replace('@', '');
        navigate(`/user/${clean}`);
    }, [navigate, closeFollowList]);

    const handleShare = useCallback(async (post: Post) => {
        const url = `${window.location.origin}/#/post/${post.id}`;
        if (navigator.share) {
            try {
                await navigator.share({ title: `Post de ${post.username}`, text: (post.text || '').substring(0, 100), url: url });
            } catch (err) {}
        } else {
            navigator.clipboard.writeText(url);
            alert('Link copiado!');
        }
    }, []);

    const handleUserClick = useCallback((username: string) => {
        navigate(`/user/${username.replace('@', '')}`);
    }, [navigate]);

    const handleVote = useCallback((postId: string, index: number) => {
        console.warn('handleVote não implementado');
    }, []);
    
    const handleCtaClick = (link: string | undefined) => {
        if (link) {
            link.startsWith('http') ? window.open(link, '_blank') : navigate(link);
        }
    };

    return {
        scrollRef,
        user,
        activeTab,
        setActiveTab,
        myPosts,
        myProducts,
        followersCount,
        followingCount,
        followListType,
        followListData,
        isPreviewOpen,
        setIsPreviewOpen,
        loading,
        error,
        deletePost,
        handleLike,
        handleShowFollowList,
        closeFollowList,
        navigateToUserProfile,
        handleShare,
        handleUserClick,
        handleVote,
        handleCtaClick
    };
};
