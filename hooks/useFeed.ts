
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { MetricasPublicacaoFeed } from '../ServiçosFrontend/SistemaDeMétricas/Metricas.Publicação.Feed.js';
import { recommendationService } from '../ServiçosFrontend/ServiçoDeRecomendação/recommendationService.js';
import { Post } from '../types';

export const useFeed = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const loaderRef = useRef<HTMLDivElement>(null);
    
    const [posts, setPosts] = useState<Post[]>([]);
    const [uiVisible, setUiVisible] = useState(true);
    const [activeLocationFilter, setActiveLocationFilter] = useState<string | null>(null);
    const [nextCursor, setNextCursor] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const isFetchingRef = useRef(false);
    const viewedPostsRef = useRef<Set<string>>(new Set());
    const lastScrollY = useRef(0);
    const PAGE_SIZE = 15;

    const currentUser = useMemo(() => authService.getCurrentUser(), []);
    const isAdultContentAllowed = useMemo(() => localStorage.getItem('settings_18_plus') === 'true', []);

    const mergePosts = useCallback((newPosts: Post[], reset: boolean = false) => {
        if (!newPosts) return;
        setPosts(prev => {
            const combined = reset ? newPosts : [...prev, ...newPosts];
            const uniqueMap = new Map<string, Post>();
            combined.forEach(p => { if (p && p.id && !uniqueMap.has(p.id)) { uniqueMap.set(p.id, p); } });

            const scored = Array.from(uniqueMap.values()).map(p => ({ p, score: recommendationService.scorePost(p, currentUser?.email) }));
            return scored.sort((a, b) => b.score - a.score).map(item => item.p);
        });
    }, [currentUser?.email]);

    const fetchPosts = useCallback(async (cursor?: number, reset = false) => {
        if (isFetchingRef.current && !reset) return;
        isFetchingRef.current = true;
        if (!cursor || reset) setLoading(true);
        
        try {
            const storedFilter = localStorage.getItem('feed_location_filter');
            const filterValue = (storedFilter === 'Global' || !storedFilter) ? null : storedFilter;
            
            const response = await ServiçoPublicaçãoFeed.getFeed('home', {
                limit: PAGE_SIZE, 
                cursor: cursor, 
                locationFilter: filterValue, 
                allowAdultContent: isAdultContentAllowed
            });

            const fetched = response.data || [];
            mergePosts(fetched, reset || cursor === undefined);
            setNextCursor(response.nextCursor);
            setHasMore(!!response.nextCursor && fetched.length > 0);
        } catch (error) {
            console.error("Erro ao buscar posts do feed:", error);
            if (!cursor || reset) setHasMore(false);
        } finally {
            setLoading(false);
            isFetchingRef.current = false;
        }
    }, [isAdultContentAllowed, mergePosts]);

    useEffect(() => {
        if (!authService.isAuthenticated()) {
            navigate('/');
            return;
        }
        
        const filter = localStorage.getItem('feed_location_filter');
        setActiveLocationFilter(filter);
        
        fetchPosts(undefined, true); 

    }, [navigate, fetchPosts]);

    useEffect(() => {
        if (posts.length === 0) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const postId = entry.target.getAttribute('data-post-id');
                    if (postId && !viewedPostsRef.current.has(postId)) {
                        viewedPostsRef.current.add(postId);
                        MetricasPublicacaoFeed.incrementView(postId);
                        recommendationService.trackImpression(postId);
                    }
                }
            });
        }, { threshold: 0.15 });
        const postElements = document.querySelectorAll('.feed-post-item');
        postElements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, [posts]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore && !loading && !isFetchingRef.current && nextCursor) {
                fetchPosts(nextCursor);
            }
        }, { root: null, threshold: 0.1 });
        
        if (loaderRef.current) observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [hasMore, nextCursor, fetchPosts, loading]);

    const handleContainerScroll = () => {
        if (!scrollContainerRef.current) return;
        const currentScroll = scrollContainerRef.current.scrollTop;
        setUiVisible(currentScroll <= lastScrollY.current || currentScroll <= 100);
        lastScrollY.current = currentScroll;
    };

    const handlePostDelete = async (id: string) => {
        await MetricasPublicacaoFeed.deletePost(id);
        setPosts(prev => prev.filter(p => p.id !== id));
    };

    const handlePostLike = (id: string) => {
        MetricasPublicacaoFeed.toggleLike(id);
        setPosts(prev => prev.map(p => p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
    };
    
    const handlePostVote = (postId: string, index: number) => {
        MetricasPublicacaoFeed.voteOnPoll(postId, index); 
        setPosts(prev => prev.map(p => {
            if (p.id === postId && p.pollOptions && p.votedOptionIndex == null) {
                const newOptions = [...p.pollOptions];
                newOptions[index].votes += 1;
                return { ...p, pollOptions: newOptions, votedOptionIndex: index };
            }
            return p;
        }));
    };

    const handlePostShare = async (p: Post) => {
        const url = `${window.location.origin}/#/post/${p.id}`;
        if (navigator.share) {
            try { await navigator.share({ title: `Post de ${p.username}`, url }); } catch (err) {}
        } else {
            navigator.clipboard.writeText(url);
            alert('Link copiado!');
        }
        MetricasPublicacaoFeed.incrementShare(p.id);
    };
    
    const handleCtaClick = (link: string | undefined) => {
        if(link) {
            link.startsWith('http') ? window.open(link,'_blank') : navigate(link);
        }
    };

    return {
        scrollContainerRef, loaderRef, posts, loading, hasMore, currentUserId: currentUser?.id, uiVisible,
        activeLocationFilter, isMenuOpen, setIsMenuOpen, handleContainerScroll,
        handlePostLike, handlePostDelete, handlePostVote, handlePostShare, handleCtaClick,
        navigate
    };
};
