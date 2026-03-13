
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js'; 
import { trackingService } from '../ServiçosFrontend/ServiçoDeRastreamento/ServiçoDeRastreamento.js';

export const HookLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [carregando, setCarregando] = useState(true);
    const [processando, setProcessando] = useState(false);
    const [erro, setErro] = useState('');
    const [mostrarFormEmail, setMostrarFormEmail] = useState(false);

    const [email, definirEmail] = useState('');
    const [senha, definirSenha] = useState('');

    useEffect(() => {
        try {
            trackingService.captureUrlParams();
        } catch (error) {
            console.error("Falha ao capturar parâmetros de URL para rastreamento:", error);
        }
    }, [location]);

    const handleRedirect = useCallback((user: any, isNewUser: boolean = false) => {
        setProcessando(false);
        if (isNewUser || (user && !user.isProfileCompleted)) {
            navigate('/complete-profile', { replace: true });
            return;
        }
        const pendingRedirect = sessionStorage.getItem('redirect_after_login') || (location.state as any)?.from?.pathname;
        if (pendingRedirect && pendingRedirect !== '/' && !pendingRedirect.includes('login')) {
            sessionStorage.removeItem('redirect_after_login');
            navigate(pendingRedirect, { replace: true });
        } else {
            navigate('/feed', { replace: true });
        }
    }, [navigate, location]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = authService.getCurrentUser();
            if (user && authService.isAuthenticated()) {
                handleRedirect(user);
            } else {
                setCarregando(false);
            }
        }
    }, [handleRedirect]);

    const submeterLoginGoogle = useCallback(async (credentialResponse: any) => {
        setProcessando(true);
        setErro('');
        try {
            if (!credentialResponse || !credentialResponse.credential) {
                throw new Error("Login com Google falhou.");
            }
            const referredBy = trackingService.getAffiliateRef() || undefined;
            const result = await authService.loginWithGoogle(credentialResponse.credential, referredBy);
            if (result && result.user) {
                const isNew = result.nextStep === '/complete-profile' || !result.user.isProfileCompleted;
                handleRedirect(result.user, isNew);
            }
        } catch (err: any) {
            setErro(err.message || 'Falha ao autenticar com Google.');
            setProcessando(false);
        }
    }, [handleRedirect]);

    const submeterLoginEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !senha || processando) return;
        setProcessando(true);
        setErro('');
        try {
            const result = await authService.login(email, senha);
            if (result && result.user) {
                const isNew = result.nextStep === '/complete-profile' || !result.user.isProfileCompleted;
                handleRedirect(result.user, isNew);
            }
        } catch (err: any) {
            setErro(err.message || 'Credenciais inválidas.');
            setProcessando(false);
        }
    };

    return {
        carregando,
        processando,
        erro,
        mostrarFormEmail,
        setMostrarFormEmail,
        email,
        definirEmail,
        senha,
        definirSenha,
        submeterLoginEmail,
        submeterLoginGoogle,
    };
};
