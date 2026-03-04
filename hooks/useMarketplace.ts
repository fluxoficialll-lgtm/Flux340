
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { marketplaceService } from '../ServiçosFrontend/ServiçoDeMarketplace/marketplaceService';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { MarketplaceItem } from '../types';

export const useMarketplace = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Todos');
    const [searchTerm, setSearchTerm] = useState('');
    const [allItems, setAllItems] = useState<MarketplaceItem[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMarketplaceItems = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const isSimulating = localStorage.getItem('isSimulating') === 'true';

            if (isSimulating) {
                console.log("[SIMULAÇÃO] useMarketplace: Buscando itens do endpoint de simulação /api/marketplace/items");
                const response = await fetch('/api/marketplace/items');
                const items = await response.json();
                setAllItems(items || []);
            } else {
                const items = await marketplaceService.fetchItems();
                setAllItems(items || []);
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
        const email = authService.getCurrentUserEmail() || undefined;
        setCurrentUserEmail(email);
        
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
        if (currentUserEmail) {
            marketplaceService.trackView(item, currentUserEmail);
        }
        
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
