
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Post, User } from '../types';

export type FeedSearchFilter = 'relevant' | 'recent';
export type SearchTab = 'posts' | 'users';

export const useFeedSearch = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<SearchTab>('posts');
    const [filter, setFilter] = useState<FeedSearchFilter>('relevant');
    
    const [postResults, setPostResults] = useState<Post[]>([]);
    const [userResults, setUserResults] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    
    const currentUser = authService.getCurrentUser();

    const handleSearch = useCallback(async (query: string, tab: SearchTab) => {
        if (!query.trim()) {
            setPostResults([]);
            setUserResults([]);
            return;
        }
        
        setLoading(true);
        try {
            if (tab === 'posts') {
                const data = await ServiçoPublicaçãoFeed.searchPosts(query);
                setPostResults(data);
            } else {
                const data = await authService.searchUsers(query);
                setUserResults(data);
            }
        } catch (e) {
            console.error("Search error", e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const timeout = setTimeout(() => handleSearch(searchTerm, activeTab), 400);
        return () => clearTimeout(timeout);
    }, [searchTerm, activeTab, handleSearch]);

    const sortedPosts = useMemo(() => {
        const list = [...postResults];
        if (filter === 'recent') {
            // Presume que `timestamp` é um número (epoch time) ou uma string ISO 8601
            return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
        // Lógica de relevância
        return list.sort((a, b) => {
            const scoreA = (a.likes || 0) + (a.comments || 0) * 2 + (a.views || 0) / 10;
            const scoreB = (b.likes || 0) + (b.comments || 0) * 2 + (b.views || 0) / 10;
            return scoreB - scoreA;
        });
    }, [postResults, filter]);

    const handleBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/feed');
        }
    };

    return {
        searchTerm,
        setSearchTerm,
        activeTab,
        setActiveTab,
        filter,
        setFilter,
        postResults: sortedPosts,
        userResults,
        loading,
        currentUser,
        handleBack,
    };
};
