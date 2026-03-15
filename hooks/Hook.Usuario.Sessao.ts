
import { useState, useEffect, useCallback } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { User } from '../tipos/types.Usuario';

export const useUsuarioSessao = () => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  const handleAuthChange = useCallback(() => {
    console.log('[useUsuarioSessao] Detectada mudança de autenticação. Atualizando o usuário.');
    setUser(authService.getCurrentUser());
  }, []);

  useEffect(() => {
    // Adiciona o listener para o evento 'authChange'
    window.addEventListener('authChange', handleAuthChange);
    console.log('[useUsuarioSessao] Listener de autenticação adicionado.');

    // Simula o fim do carregamento inicial
    setLoading(false);

    // Função de limpeza para remover o listener quando o componente desmontar
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      console.log('[useUsuarioSessao] Listener de autenticação removido.');
    };
  }, [handleAuthChange]);

  // Retorna os dados do usuário e o estado de carregamento
  return { user, loading };
};
