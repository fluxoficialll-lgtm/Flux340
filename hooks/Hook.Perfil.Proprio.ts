
import { useState, useEffect, useCallback, useMemo } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';

export const HookPerfilProprio = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const loggedInUser = useMemo(() => authService.getCurrentUser(), []);
    const userId = loggedInUser?.id;

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            setError("Usuário não autenticado.");
            return;
        }

        setIsLoading(true);
        try {
            const data = await authService.getProfile(userId);
            setProfile(data);
        } catch (err) {
            if (err instanceof Error) {
              setError(err.message || 'Erro ao carregar o perfil');
            }
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, refetch: fetchProfile };
};
