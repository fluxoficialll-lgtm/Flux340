
import { useState, useEffect, useCallback } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';

export const HookPerfilTerceiro = (userId) => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProfile = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const data = await authService.getProfile(userId);
            const { name, nickname, bio, photo_url, website, is_private } = data;
            setProfile({ name, nickname, bio, photo_url, website, is_private });
        } catch (err) {
            setError(err.message || 'Erro ao carregar o perfil');
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, refetch: fetchProfile };
};
