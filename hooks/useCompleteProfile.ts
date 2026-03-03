
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { fileService } from '../ServiçosFrontend/ServiçoDeArquivos/fileService.js';
import { UserProfile } from '../types';
import ServicoAuditoriaCriarPerfil from '../ServiçosFrontend/ServicoLogs/Servico.Auditoria.Criar.Perfil.js';
import type { DadosFormularioPerfil, ErrosCompletarPerfil } from '@/tipos/CompleteProfile.types';

export const useCompleteProfile = () => {
    const navigate = useNavigate();
    const auditoria = ServicoAuditoriaCriarPerfil;

    // Estado unificado para os dados do perfil
    const [dadosPerfil, setDadosPerfil] = useState<DadosFormularioPerfil>({
        name: '',
        nickname: '',
        bio: '',
        perfilPrivado: false,
    });

    // Estados da interface e de controle
    const [previaImagem, setPreviaImagem] = useState<string | null>(null);
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [errors, setErrors] = useState<ErrosCompletarPerfil>({});
    const [cortarAberto, setCortarAberto] = useState(false);
    const [imagemOriginal, setImagemOriginal] = useState<string>('');

    useEffect(() => {
        auditoria.iniciarProcesso();
        const user = authService.getCurrentUser();
        
        auditoria.decisaoRedirecionamento(user);
        if (!user) {
            navigate('/');
        } else if (user.profile_completed) {
            navigate('/feed');
        }
    }, [navigate]);

    // Função genérica para atualizar campos do formulário
    const updateField = useCallback((key: keyof DadosFormularioPerfil, value: string | boolean) => {
        let valorFinal = value;
        if (key === 'nickname' && typeof value === 'string') {
            const valorLimpo = value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
            valorFinal = valorLimpo;
            setErrors(prev => ({ ...prev, nomeUsuario: undefined })); // Limpa o erro ao digitar
        }
        
        setDadosPerfil(prev => ({ ...prev, [key]: valorFinal }));
        auditoria.alteracaoFormulario(key, valorFinal);
    }, [auditoria]);


    const aoMudarImagem = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            auditoria.selecaoDeImagem(file.name);
            const reader = new FileReader();
            reader.onload = (ev) => {
                setImagemOriginal(ev.target?.result as string);
                setCortarAberto(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const aoSalvarImagemCortada = (base64Cortada: string) => {
        auditoria.imagemCortada();
        setPreviaImagem(base64Cortada);
        fetch(base64Cortada)
          .then(res => res.blob())
          .then(blob => {
              const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
              setArquivoSelecionado(file);
          });
    };

    const aoSubmeter = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!dadosPerfil.nickname?.trim()) {
            setErrors({ nomeUsuario: 'Nome de usuário é obrigatório.' });
            return;
        }

        setCarregando(true);

        const dadosParaApi: UserProfile = {
            name: dadosPerfil.name || '',
            nickname: dadosPerfil.nickname || '',
            bio: dadosPerfil.bio || '',
            photoUrl: '', // Será preenchido após o upload
            website: '', // Não está no formulário, então fica vazio
            isPrivate: dadosPerfil.perfilPrivado,
        };

        auditoria.tentativaDeSubmissao(dadosParaApi);

        try {
            if (arquivoSelecionado) {
                dadosParaApi.photoUrl = await fileService.uploadFile(arquivoSelecionado);
            }

            const usuarioAtualizado = await authService.completeProfile(dadosParaApi);
            
            auditoria.sucessoNaConclusao({ success: true });
            auditoria.estadoAposSalvar(usuarioAtualizado);
            auditoria.decisaoRedirecionamento(usuarioAtualizado);

            if (usuarioAtualizado?.profile_completed) {
                navigate('/feed');
            } else {
                setErrors({ formulario: "Não foi possível confirmar a conclusão do seu perfil. Verifique os logs." });
            }

        } catch (err: any) {
            auditoria.falhaNaConclusao(err, dadosParaApi);
            console.error("Falha ao completar o perfil no hook 'useCompleteProfile':", err);
            
            if (err.message && err.message.includes('NAME_TAKEN')) {
                setErrors({ nomeUsuario: 'Este nome de usuário já está em uso.' });
            } else {
                setErrors({ formulario: err.message || 'Ocorreu um erro ao finalizar o perfil. Tente novamente.' });
            }
        } finally {
            setCarregando(false);
        }
    };
    
    const aoSair = () => {
        auditoria.logout();
        authService.logout();
        navigate('/');
    };

    return {
        dadosPerfil, 
        updateField,
        previaImagem, 
        carregando, 
        errors,
        cortarAberto, 
        setCortarAberto, 
        imagemOriginal,
        aoMudarImagem, 
        aoSalvarImagemCortada,
        aoSubmeter,
        aoSair
    };
};
