
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import ServiçoCriaçãoGrupoPago from '../ServiçosFrontend/ServiçoDeGrupos/Criação.Grupo.Pago.js';
import { CurrencyType, DadosGrupoVip, TipoMidiaVip, ErrosCriacaoGrupoVip, ConfiguracaoAcesso } from '../tipos';

export const useCreateVipGroup = () => {
    const navigate = useNavigate();

    // Estado unificado para os dados do grupo VIP
    const [dadosGrupo, setDadosGrupo] = useState<DadosGrupoVip>({
        nomeGrupo: '',
        descricao: '',
        arquivoCapa: null,
        itensMidiaVip: [],
        textoPortaVip: '',
        textoBotaoVip: '',
        preco: '',
        moeda: 'BRL',
        tipoAcesso: 'lifetime',
        configuracaoAcesso: null,
        idProvedorSelecionado: null,
        pixelId: '',
        pixelToken: '',
    });

    // Estados da interface e de controle
    const [imagemCapaPreview, setImagemCapaPreview] = useState<string | undefined>(undefined);
    const [isCreating, setIsCreating] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadCurrent, setUploadCurrent] = useState(0);
    const [uploadTotal, setUploadTotal] = useState(0);
    const [errors, setErrors] = useState<ErrosCriacaoGrupoVip>({});
    const [hasProvider, setHasProvider] = useState(false);
    
    // Estados de modais e UI
    const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
    const [isPixelModalOpen, setIsPixelModalOpen] = useState(false);
    const [isAccessModalOpen, setIsAccessModalOpen] = useState(false);
    const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [rawImage, setRawImage] = useState<string>('');

    // Função genérica para atualizar os dados do grupo
    const updateField = useCallback((key: keyof DadosGrupoVip, value: any) => {
        setDadosGrupo(prev => ({ ...prev, [key]: value }));
    }, []);

    useEffect(() => {
        const user = authService.getCurrentUser();
        const connected = !!user?.paymentConfig?.isConnected || !!Object.values(user?.paymentConfigs || {}).some(c => c.isConnected);
        setHasProvider(connected);

        let providerId: string | null = null;
        if (user?.paymentConfig?.isConnected) {
            providerId = user.paymentConfig.providerId;
        } else if (user?.paymentConfigs) {
            const firstConnected = Object.values(user.paymentConfigs).find(c => c.isConnected);
            if (firstConnected) providerId = firstConnected.providerId;
        }
        updateField('idProvedorSelecionado', providerId);
    }, [updateField]);

    const allowedCurrencies = useMemo(() => ['BRL', 'USD', 'EUR'], []);

    const handleProviderSelect = (pid: string) => {
        updateField('idProvedorSelecionado', pid);
        const supported = ['BRL', 'USD', 'EUR'];
        if (!supported.includes(dadosGrupo.moeda)) {
            updateField('moeda', 'BRL');
        }
    };

    const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                setRawImage(ev.target?.result as string);
                setIsCropOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCroppedImage = (croppedBase64: string) => {
        setImagemCapaPreview(croppedBase64);
        fetch(croppedBase64)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], "group_cover.jpg", { type: "image/jpeg" });
                updateField('arquivoCapa', file);
            });
    };
    
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value === "") {
            updateField('preco', "");
            return;
        }
        const numericValue = parseFloat(value) / 100;
        updateField('preco', numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
    };

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (isCreating || isUploading) return;

        if (!dadosGrupo.idProvedorSelecionado) {
            setErrors({ provedor: "Selecione um provedor de pagamento para continuar." });
            setIsProviderModalOpen(true);
            return;
        }

        const rawPrice = dadosGrupo.preco.replace(/\./g, '').replace(',', '.');
        const numericPrice = parseFloat(rawPrice);
        if (isNaN(numericPrice) || numericPrice < 6.00) {
            setErrors({ preco: "O preço mínimo para criar um grupo VIP é R$ 6,00." });
            return;
        }

        setIsCreating(true);
        setIsUploading(true);

        const onProgress = (progress: number, current: number, total: number) => {
            setUploadProgress(progress);
            setUploadCurrent(current);
            setUploadTotal(total);
        };

        try {
            await ServiçoCriaçãoGrupoPago.criar({
                ...dadosGrupo,
                numericPrice,
            }, onProgress);

            setTimeout(() => {
                setIsUploading(false);
                navigate('/groups', { replace: true });
            }, 800);

        } catch (e) {
            console.error("Erro ao criar grupo VIP:", e);
            setErrors({ geral: (e as Error).message || "Erro ao criar grupo VIP." });
            setIsCreating(false);
            setIsUploading(false);
        }
    }, [dadosGrupo, isCreating, isUploading, navigate]);
    
    // ... (outras funções como moveVipMediaItem, removeMediaItem, etc. adaptadas para usar updateField)
    const handleBack = () => navigate('/create-group', { replace: true });

    return {
        dadosGrupo, updateField,
        imagemCapaPreview, isCreating, isUploading, uploadProgress, uploadCurrent, uploadTotal, errors, hasProvider,
        isProviderModalOpen, setIsProviderModalOpen, isPixelModalOpen, setIsPixelModalOpen, isAccessModalOpen, setIsAccessModalOpen,
        isCurrencyModalOpen, setIsCurrencyModalOpen, isCropOpen, setIsCropOpen, rawImage,
        allowedCurrencies, handleProviderSelect, handleCoverChange, handleCroppedImage, handlePriceChange, handleSubmit, handleBack
        // ... (retornar outras funções necessárias para a UI)
    };
};
