import { useState, useEffect, useCallback } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { servicoPerfilUsuario } from '../ServiçosFrontend/ServiçosDePerfil/Servico.Perfil.Usuario';
import { Usuario } from '../../types/Saida/Types.Estrutura.Usuario';

export const HookPerfilProprio = () => {
    const [profile, setProfile] = useState<Usuario | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Observa o estado de autenticação para saber quando o usuário está logado.
    const [authState, setAuthState] = useState(authService.getState());
    const isAuthenticated = !!authState.user;

    useEffect(() => {
        const unsubscribe = authService.subscribe(setAuthState);
        return () => unsubscribe();
    }, []);

    const fetchProfile = useCallback(async () => {
        // A busca só é acionada se o usuário estiver autenticado.
        if (!isAuthenticated) {
            setIsLoading(false);
            setError("Usuário não autenticado.");
            setProfile(null);
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            // O método getOwnProfile não requer mais um ID, pois a API identifica o usuário pelo token.
            const data = await servicoPerfilUsuario.getOwnProfile();
            if (data) {
                setProfile(data);
            } else {
                throw new Error('Não foi possível carregar o perfil a partir do serviço.');
            }
        } catch (err) {
            if (err instanceof Error) {
              setError(err.message || 'Erro ao carregar o perfil');
            }
            setProfile(null);
        } finally {
            setIsLoading(false);
        }
    }, [isAuthenticated]); // A dependência agora é o estado de autenticação.

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return { profile, isLoading, error, refetch: fetchProfile };
};
