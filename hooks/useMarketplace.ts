
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
            // O marketplaceService agora usa fetch internamente, que será interceptado.
            const items = await marketplaceService.fetchItems();
            setAllItems(items || []);
        } catch (err) {
            console.error("Erro ao carregar itens do marketplace:", err);
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
            setAllItems([]); // Garante que não haja dados antigos em caso de erro
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const email = authService.getCurrentUserEmail() || undefined;
        setCurrentUserEmail(email);
        
        // Busca os itens ao montar o componente.
        fetchMarketplaceItems();

        // Não há mais necessidade de subscribe, o fetch resolve tudo.
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
        error, // Expondo o erro para a UI
        filteredProducts,
        handleProductClick
    };
};
