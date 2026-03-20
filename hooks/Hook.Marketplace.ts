
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { MarketplaceItem } from '../types';

export const HookMarketplace = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [allItems, setAllItems] = useState<MarketplaceItem[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [authState, setAuthState] = useState(authService.getState());
    const currentUserEmail = authState.user?.email;

    useEffect(() => {
        const unsubscribe = authService.subscribe(setAuthState);
        return () => unsubscribe();
    }, []);

    const fetchMarketplaceItems = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const isSimulating = localStorage.getItem('isSimulating') === 'true';

            if (isSimulating) {
                console.log("[SIMULAÇÃO] useMarketplace: Buscando itens do endpoint de simulação /api/marketplace/items");
                const response = await fetch('/api/marketplace/items');
                if (!response.ok) throw new Error(`Falha na simulação: ${response.statusText}`);
                const items = await response.json();
                setAllItems(items || []);
            } else {
                console.log("marketplaceService não encontrado. Itens do marketplace não serão carregados.");
                setAllItems([]);
            }
        } catch (err) {
            console.error("Erro ao carregar itens do marketplace:", err);
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
            setAllItems([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMarketplaceItems();
    }, [fetchMarketplaceItems]);

    const filteredProducts = useMemo(() => {
        if (!Array.isArray(allItems)) return [];
        let result = [...allItems];
        
        if (activeCategory !== 'Todos') {
            result = result.filter(p => p && p.category === activeCategory);
        }
        
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            result = result.filter(p => p && (
                (p.title && p.title.toLowerCase().includes(term)) || 
                (p.location && p.location.toLowerCase().includes(term))
            ));
        }
        return result;
    }, [allItems, activeCategory, searchTerm]);

    const handleProductClick = (item: MarketplaceItem) => {
        if (!item) return;
        // A funcionalidade de rastreamento foi removida pois o marketplaceService não existe mais.
        navigate(`/marketplace/product/${item.id}`); 
    };

    return {
        activeCategory,
        setActiveCategory,
        searchTerm,
        setSearchTerm,
        isMenuOpen,
        setIsMenuOpen,
        isLoading,
        error,
        filteredProducts,
        handleProductClick
    };
};
