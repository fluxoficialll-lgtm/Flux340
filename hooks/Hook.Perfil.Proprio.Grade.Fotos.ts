
import { useState, useEffect } from 'react';
// CORREÇÃO: Importa o serviço como padrão (sem chaves)
import ServiçoPublicacaoFeed from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';

export const usePerfilProprioGradeFotos = (userId: string) => {
  const [fotos, setFotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchFotos = async () => {
      try {
        setLoading(true);
        // O serviço de feed não tem um método para buscar por usuário, então buscamos tudo
        // e filtramos no frontend.
        const todosOsPosts = await ServiçoPublicacaoFeed.getFeed('posts'); // Assumindo método getFeed
        const fotosDoUsuario = todosOsPosts.filter(post => post.tipo === 'foto' && post.userId === userId);
        setFotos(fotosDoUsuario);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFotos();
    }
  }, [userId]);

  return { fotos, loading, error };
};
