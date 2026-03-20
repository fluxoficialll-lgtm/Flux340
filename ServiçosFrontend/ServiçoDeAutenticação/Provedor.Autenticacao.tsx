
import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react';
import authService from './authService';
import { Usuario } from '../../../types/Saida/Types.Estrutura.Usuario';

// --- Types & Interfaces ---
interface AuthState {
    user: Usuario | null;
    loading: boolean;
    error: Error | null;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

// --- Dumb Provider Component ---
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authState, setAuthState] = useState<AuthState>(() => authService.getState());

    useEffect(() => {
        // A subscrição retorna a função de limpeza (unsubscribe)
        const unsubscribe = authService.subscribe(setAuthState);
        return unsubscribe;
    }, []);

    const value = useMemo(() => authState, [authState]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// --- Custom Hook ---
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
};
