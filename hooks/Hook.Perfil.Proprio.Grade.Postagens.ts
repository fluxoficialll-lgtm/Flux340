
import { useState, useEffect } from 'react';
// CORREÇÃO: Importa o serviço como padrão (sem chaves)
import ServiçoPublicacaoFeed from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';

export const usePerfilProprioGradePostagens = (userId: string) => {
  const [postagens, setPostagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPostagens = async () => {
      try {
        setLoading(true);
        // O serviço de feed não tem um método para buscar por usuário, então buscamos tudo
        // e filtramos no frontend.
        const todosOsPosts = await ServiçoPublicacaoFeed.getFeed('posts'); // Assumindo método getFeed
        const postagensDoUsuario = todosOsPosts.filter(post => post.userId === userId);
        setPostagens(postagensDoUsuario);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPostagens();
    }
  }, [userId]);

  return { postagens, loading, error };
};
