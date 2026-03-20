import { useState, useEffect, useCallback } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Usuario } from '../../types/Saida/Types.Estrutura.Usuario';

export const HookPerfilProprio = () => {
    const [profile, setProfile] = useState<Usuario | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Estado reativo para autenticação
    const [authState, setAuthState] = useState(authService.getState());
    const userId = authState.user?.id;

    // Se inscreve para receber atualizações do estado de autenticação
    useEffect(() => {
        const unsubscribe = authService.subscribe(setAuthState);
        return () => unsubscribe(); // Limpa a inscrição ao desmontar
    }, []);

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            setError("Usuário não autenticado.");
            setProfile(null); // Garante que nenhum perfil antigo seja exibido
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            // Acessa o perfil que já deve estar no estado de autenticação
            const userProfile = authState.user;
            if (userProfile) {
                setProfile(userProfile);
            } else {
                // Como fallback, se o usuário não estiver no estado, busca na API
                const data: Usuario = await authService.getProfile(userId);
                setProfile(data);
            }
        } catch (err) {
            if (err instanceof Error) {
              setError(err.message || 'Erro ao carregar o perfil');
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId, authState.user]); // A dependência do usuário garante a re-execução no login

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, refetch: fetchProfile };
};
