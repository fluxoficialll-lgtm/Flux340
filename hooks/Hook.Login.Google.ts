
import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { trackingService } from '../ServiçosFrontend/ServiçoDeRastreamento/ServiçoDeRastreamento.js';

export const useGoogleLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [processando, setProcessando] = useState(false);
    const [erro, setErro] = useState<any>(null);

    // Captura parâmetros de URL para tracking de afiliados
    useEffect(() => {
        try {
            trackingService.captureUrlParams();
        } catch (error) {
            console.error("Falha ao capturar parâmetros de URL para rastreamento:", error);
        }
    }, [location]);

    const handleRedirect = useCallback((user: any) => {
        setProcessando(false);
        const targetPath = user.profile_completed ? '/feed' : '/complete-profile';
        navigate(targetPath, { replace: true });
    }, [navigate]);

    const submeterLoginGoogle = useCallback(async (credentialResponse: any) => {
        if (!credentialResponse || !credentialResponse.credential) {
            setErro(new Error("Credencial do Google inválida."));
            return;
        }

        setProcessando(true);
        setErro(null);

        try {
            // Obtém a referência de afiliado do serviço de rastreamento
            const referredBy = trackingService.getAffiliateRef() || undefined;
            const data = await authService.loginWithGoogle(credentialResponse.credential, referredBy);

            if (data && data.user) {
                handleRedirect(data.user);
            }

        } catch (err) {
            setErro(err);
        } finally {
            setProcessando(false);
        }
    }, [handleRedirect]);

    return {
        processando,
        erro,
        submeterLoginGoogle,
    };
};
