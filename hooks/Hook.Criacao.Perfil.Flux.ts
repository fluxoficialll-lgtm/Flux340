
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { DadosEntradaRegistro, ErrosRegistro } from '../tipos';
import { ErroSenha } from '../tipos';

export const useHookCriacaoPerfilFlux = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [dados, setDados] = useState<DadosEntradaRegistro>({
        email: '',
        senha: '',
        confirmacaoSenha: '',
        termosAceitos: false,
        indicadoPor: undefined,
    });

    const [errors, setErrors] = useState<ErrosRegistro>({});
    const [loading, setLoading] = useState(false);
    const [isValid, setIsValid] = useState(false);

    const updateField = (key: keyof DadosEntradaRegistro, value: string | boolean) => {
        setDados((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const ref = params.get('ref');
        if (ref) {
            updateField('indicadoPor', ref);
        }
    }, [location]);

    useEffect(() => {
        const newErrors: ErrosRegistro = {};
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (dados.email && !emailRegex.test(dados.email)) {
            newErrors.email = ErroSenha.FORMATO_INVALIDO;
        }
        if (dados.senha && dados.senha.length < 6) {
            newErrors.senha = ErroSenha.SENHA_MUITO_CURTA;
        }
        if (dados.confirmacaoSenha && dados.senha !== dados.confirmacaoSenha) {
            newErrors.confirmacao = ErroSenha.SENHAS_NAO_CONFEREM;
        }

        setErrors(newErrors);

        const allFilled = dados.email && dados.senha && dados.confirmacaoSenha && dados.termosAceitos;
        setIsValid(!!allFilled && Object.keys(newErrors).length === 0);

    }, [dados]);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValid) return;

        setLoading(true);
        setErrors({});

        try {
            await authService.register({
                email: dados.email,
                password: dados.senha,
                referredBy: dados.indicadoPor,
            });
            
            navigate('/verify-email');

        } catch (err: any) {
            setErrors(prev => ({ ...prev, formulario: err.message || 'Ocorreu um erro no cadastro.' }));
        } finally {
            setLoading(false);
        }
    }, [isValid, dados, navigate]);

    return {
        dados,
        updateField,
        errors,
        loading,
        isValid,
        handleSubmit,
    };
};
