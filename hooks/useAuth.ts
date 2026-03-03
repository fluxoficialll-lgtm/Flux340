
import { useState, useEffect, useCallback } from 'react';
// CORREÇÃO: A importação foi atualizada para usar o serviço de autenticação real.
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { User } from '../tipos/types.Usuario'; // Caminho corrigido para o tipo User

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  const handleAuthChange = useCallback(() => {
    console.log('[useAuth] Detectada mudança de autenticação. Atualizando o usuário.');
    setUser(authService.getCurrentUser());
  }, []);

  useEffect(() => {
    setLoading(false);

    window.addEventListener('authChange', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [handleAuthChange]);

  return { user, loading };
};
