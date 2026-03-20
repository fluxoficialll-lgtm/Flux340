
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import authService from './authService.js';
import { Usuario } from '../../../types/Saida/Types.Estrutura.Usuario';

// Define a forma dos dados do contexto
interface AuthContextType {
  user: Usuario | null;
  loading: boolean;
}

// Cria o contexto com um valor padrão indefinido
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Cria o componente AuthProvider
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Usuario | null>(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // O estado inicial é definido de forma síncrona acima, então podemos definir o loading como falso.
    // Este hook agora serve principalmente para ouvir mudanças subsequentes.
    setLoading(false);

    const handleAuthChange = () => {
      console.log('[AuthProvider] Mudança de autenticação detectada. Atualizando o usuário.');
      setUser(authService.getCurrentUser());
    };

    window.addEventListener('authChange', handleAuthChange);
    console.log('[AuthProvider] Listener de autenticação adicionado.');

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
      console.log('[AuthProvider] Listener de autenticação removido.');
    };
  }, []);

  const value = { user, loading };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Cria um hook personalizado para facilitar o consumo do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
