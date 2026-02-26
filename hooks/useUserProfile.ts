
import { useState, useEffect, useCallback } from 'react';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { MetricasListaSeguidores } from '../ServiçosFrontend/SistemaDeMétricas/Métricas.Lista.Seguidores.js';
import { UserProfile } from '../types';

interface UserProfileData {
    profile: UserProfile | null;
    isLoading: boolean;
    handleFollow: (userId: string) => Promise<void>;
}

export const useUserProfile = (username?: string, email?: string): UserProfileData => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserData = useCallback(async () => {
        if (!username) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const user = await authService.fetchUserByHandle(username, email);
            if (user) {
                setProfile(user);
            }
        } catch (error) {
            console.error("Erro ao buscar perfil do usuário:", error);
            setProfile(null);
        } finally {
            setIsLoading(false);
        }
    }, [username, email]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleFollow = useCallback(async (userId: string) => {
        try {
            await MetricasListaSeguidores.toggleFollow(userId);
            // Re-fetch user data to update the follower count and isFollowing status
            await fetchUserData();
        } catch (error) {
            console.error("Erro ao seguir/deixar de seguir usuário:", error);
        }
    }, [fetchUserData]);

    return { profile, isLoading, handleFollow };
};
