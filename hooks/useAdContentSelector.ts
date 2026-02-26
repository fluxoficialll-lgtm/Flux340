import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiçoPublicaçãoFeed } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Post } from '../types';

export const useAdContentSelector = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'posts' | 'reels'>('posts');
    const [content, setContent] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            setLoading(true);
            const user = authService.getCurrentUser();
            if (user && user.id) {
                // Corrigido: Usa o serviço de feed para buscar os posts do perfil do usuário
                const feedResult = await ServiçoPublicaçãoFeed.getFeed('profile', { userId: user.id });
                // O resultado pode ter um formato diferente, garantimos que pegamos o array de posts
                const allPosts = feedResult.data || feedResult;
                setContent(allPosts as Post[]);
            }
            setLoading(false);
        };
        loadContent();
    }, []);

    const filteredContent = content.filter(p => 
        activeTab === 'reels' ? p.type === 'video' : (p.type === 'photo' || p.type === 'text')
    );

    const handleSelect = (post: Post) => {
        navigate('/ad-placement-selector', { state: { boostedContent: post } });
    };

    return {
        activeTab,
        setActiveTab,
        loading,
        filteredContent,
        handleSelect,
        navigate
    };
};