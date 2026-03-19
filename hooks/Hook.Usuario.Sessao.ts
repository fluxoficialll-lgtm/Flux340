
import { useState, useEffect, useCallback, useMemo } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { Usuario } from '../../types/Saida/Types.Estrutura.Usuario';

export const useUsuarioSessao = () => {
  const [user, setUser] = useState<Usuario | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  const handleAuthChange = useCallback(() => {
    console.log('[useUsuarioSessao] Detectada mudança de autenticação. Atualizando o usuário.');
    setUser(authService.getCurrentUser());
  }, []);

  useEffect(() => {
    window.addEventListener('authChange', handleAuthChange);
    console.log('[useUsuarioSessao] Listener de autenticação adicionado.');
    setLoading(false);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      console.log('[useUsuarioSessao] Listener de autenticação removido.');
    };
  }, [handleAuthChange]);

  const memoizedUser = useMemo(() => user, [user?.id]);

  return { user: memoizedUser, loading };
};
