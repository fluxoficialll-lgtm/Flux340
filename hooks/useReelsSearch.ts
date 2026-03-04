import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// CORREÇÃO: A importação agora é default, para corresponder à exportação do serviço.
import ServiçoPublicaçãoFeed from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { Post } from '../types';

export const useReelsSearch = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (query.trim() === '' || query.length < 3) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      try {
        // CORREÇÃO: A função foi renomeada de 'searchPosts' para 'search' para corresponder ao serviço.
        const searchResults = await ServiçoPublicaçãoFeed.search(query);
        setResults(searchResults);
      } catch (err) {
        setError('Falha ao buscar resultados.');
        console.error(err);
      }
      setIsLoading(false);
    };

    const debounceTimeout = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [query]);

  const handlePostClick = (postId: string) => {
    navigate(`/post/${postId}`);
  };

  return {
    query,
    setQuery,
    results,
    isLoading,
    error,
    handlePostClick
  };
};