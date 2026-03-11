
import { useState, useEffect, useCallback } from 'react';
import profileService from '../ServiçosFrontend/ServiçoDeAutenticação/Criação.Perfil.Flux.js';
import { MetricasListaSeguidores } from '../ServiçosFrontend/SistemaDeMétricas/Métricas.Lista.Seguidores.js';
import ServiçoPublicaçãoFeed from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoFeed.js';
import { marketplaceService } from '../ServiçosFrontend/ServiçoDeMarketplace/marketplaceService.js';

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
    isFollowing?: boolean;
    posts?: any[];
    products?: any[];
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
            const [userProfileData, userPosts, userProducts] = await Promise.all([
                profileService.getUserProfile(userId),
                ServiçoPublicaçãoFeed.getFeed('user', { userId }),
                marketplaceService.getItemsByUserId(userId)
            ]);
            
            const profileWithData = {
                ...userProfileData,
                isFollowing: Math.random() > 0.5, // Mock
                posts: userPosts,
                products: userProducts
            };

            setProfile(profileWithData);

        } catch (err: any) {
            console.error("Erro ao buscar dados do perfil do usuário:", err);
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

            await MetricasListaSeguidores.toggleFollow(profile.id);
            
        } catch (error) {
            console.error("Erro ao seguir/deixar de seguir usuário:", error);
            fetchUserData(); 
        }
    }, [profile, fetchUserData]);

    return { profile, isLoading, error, handleFollow };
};
