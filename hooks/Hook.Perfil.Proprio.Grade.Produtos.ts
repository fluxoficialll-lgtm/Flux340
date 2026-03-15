
import { useState, useEffect } from 'react';
import { marketplaceService } from '../ServiçosFrontend/ServiçoDeMarketplace/marketplaceService.js';

export const usePerfilProprioGradeProdutos = (userId: string) => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProdutos = () => { // Removido async, pois o serviço é síncrono
      try {
        setLoading(true);
        // O serviço de simulação busca os produtos de forma síncrona
        const produtosDoServico = marketplaceService.getItemsByUserId(userId);
        setProdutos(produtosDoServico);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProdutos();
    }
  }, [userId]);

  return { produtos, loading, error };
};
