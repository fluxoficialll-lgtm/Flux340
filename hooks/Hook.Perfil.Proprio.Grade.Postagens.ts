
import { useState, useEffect } from 'react';
import { feedPublicationService as ServiçoPublicacaoFeed } from '../ServiçosFrontend/ServiçosDePublicações/Servico.Publicacao.Feed';

export const usePerfilProprioGradePostagens = (userId: string) => {
  const [postagens, setPostagens] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPostagens = async () => {
      try {
        setLoading(true);
        const todosOsPosts = await ServiçoPublicacaoFeed.getPosts();
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
