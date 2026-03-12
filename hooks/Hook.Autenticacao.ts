
import { useState, useEffect, useCallback } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { User } from '../tipos/types.Usuario'; // Caminho corrigido para o tipo User

export const HookAutenticacao = () => {
  const [user, setUser] = useState<User | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  const handleAuthChange = useCallback(() => {
    console.log('[HookAutenticacao] Detectada mudança de autenticação. Atualizando o usuário.');
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
