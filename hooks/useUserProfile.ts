
import { useState, useEffect, useCallback } from 'react';
// Caminho corrigido e importação ajustada para o serviço unificado
import profileService from '../ServiçosFrontend/ServiçoDeAutenticação/Criação.Perfil.Flux.js';
import { MetricasListaSeguidores } from '../ServiçosFrontend/SistemaDeMétricas/Métricas.Lista.Seguidores.js';

// A interface que o nosso backend realmente retorna
export interface UserProfileWithStats {
    id: string;
    username: string;
    nickname: string;
    bio: string;
    avatar: string;
    website: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
    isFollowing?: boolean; // Adicionado para controlar o estado de "seguir"
}

interface UseUserProfileData {
    profile: UserProfileWithStats | null;
    isLoading: boolean;
    error: string | null;
    handleFollow: () => Promise<void>;
}

export const useUserProfile = (userId: string | undefined): UseUserProfileData => {
    const [profile, setProfile] = useState<UserProfileWithStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUserData = useCallback(async () => {
        if (!userId) {
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            // Agora usando o serviço unificado e real
            const userProfileData = await profileService.getUserProfile(userId);
            
            // Simular o "isFollowing" por enquanto, idealmente isso viria do backend
            const profileWithMockedFollow = {
                ...userProfileData,
                isFollowing: Math.random() > 0.5, // Mock
            };

            setProfile(profileWithMockedFollow);

        } catch (err: any) {
            console.error("Erro ao buscar perfil do usuário:", err);
            setError(err.message || 'Falha ao carregar o perfil.');
            setProfile(null);
        } finally {
            setIsLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    const handleFollow = useCallback(async () => {
        if (!profile) return;

        try {
            // Otimisticamente atualiza a UI
            setProfile(prevProfile => {
                if (!prevProfile) return null;
                const isNowFollowing = !prevProfile.isFollowing;
                const newFollowersCount = isNowFollowing 
                    ? prevProfile.stats.followers + 1 
                    : prevProfile.stats.followers - 1;

                return {
                    ...prevProfile,
                    isFollowing: isNowFollowing,
                    stats: { ...prevProfile.stats, followers: newFollowersCount }
                };
            });

            // Chama a API para persistir a mudança
            await MetricasListaSeguidores.toggleFollow(profile.id);
            
        } catch (error) {
            console.error("Erro ao seguir/deixar de seguir usuário:", error);
            // Reverte a UI em caso de erro
            fetchUserData(); 
        }
    }, [profile, fetchUserData]);

    return { profile, isLoading, error, handleFollow };
};
