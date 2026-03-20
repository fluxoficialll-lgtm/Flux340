
import { useState, useEffect } from 'react';

// O marketplaceService foi removido, então este hook não buscará mais produtos.
// Ele agora retorna uma lista vazia para garantir que a UI não quebre.

export const usePerfilProprioGradeProdutos = (userId: string) => {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Inicia como false, pois não há carregamento
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // A lógica de busca foi removida porque o marketplaceService não existe mais.
    // O hook agora simplesmente gerencia um estado de produtos vazio.
    if (userId) {
        console.log("marketplaceService não encontrado. Produtos do usuário não serão carregados para o perfil.");
        setProdutos([]); // Garante que a lista de produtos esteja sempre vazia
    }
  }, [userId]);

  return { produtos, loading, error };
};
