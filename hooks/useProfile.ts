
import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { postService } from '../ServiçosFrontend/ServiçoDePosts/postService';
import { relationshipService } from '../ServiçosFrontend/ServiçoDeRelacionamento/relationshipService.js';
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
    const [followListData, setFollowListData] = useState<any[]>([]);
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
                // Dispara o erro que será capturado pelo catch
                throw new Error("Usuário não autenticado. Por favor, faça login.");
            }
            setUser(currentUser);

            const token = authService.getToken();

            const storedPosts = await postService.getUserPosts(token, currentUser.id);
            if (storedPosts && Array.isArray(storedPosts)) {
                setMyPosts(storedPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
            } else {
                setMyPosts([]);
            }

            const storedProducts = marketplaceService.getItems().filter(i => i.sellerId === currentUser.email || i.sellerId === currentUser.id) || [];
            setMyProducts(storedProducts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));

            if (currentUser.profile && currentUser.profile.name) {
                const followers = relationshipService.getFollowers(currentUser.profile.name);
                setFollowersCount(followers.length);
            }
            if (currentUser.id) {
                const following = relationshipService.getFollowing(currentUser.id);
                setFollowingCount(following.length);
            }
        } catch (e: any) {
            // Agora, em vez de apenas definir um erro, usamos o handleError
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
        if (await confirmAction()) {
            const token = authService.getToken();
            await postService.deletePost(token, postId);
        }
    }, []);

    const handleLike = useCallback((id: string) => {
        postService.toggleLike(id);
    }, []);

    const handleShowFollowList = useCallback((type: 'followers' | 'following') => {
        if (!user) return;
        let list: any[] = [];
        if (type === 'followers' && user.profile?.name) { 
            list = relationshipService.getFollowers(user.profile.name); 
        } else if (type === 'following' && user.id) { 
            list = relationshipService.getFollowing(user.id); 
        }
        setFollowListData(list);
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
        postService.voteOnPoll(postId, index)
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
