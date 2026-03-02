
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { fileService } from '../ServiçosFrontend/ServiçoDeArquivos/fileService.js';
import { UserProfile } from '../types';
import ServicoAuditoriaCriarPerfil from '../ServiçosFrontend/ServicoLogs/Servico.Auditoria.Criar.Perfil.js';
import type { DadosFormularioPerfil } from '@/tipos/CompleteProfile.types';

export const useCompleteProfile = () => {
    const navigate = useNavigate();
    const auditoria = ServicoAuditoriaCriarPerfil;

    const [dadosFormulario, setDadosFormulario] = useState<DadosFormularioPerfil>({
        name: '',
        nickname: '',
        bio: '',
    });
    const [perfilPrivado, setPerfilPrivado] = useState(false);

    const [previaImagem, setPreviaImagem] = useState<string | null>(null);
    const [arquivoSelecionado, setArquivoSelecionado] = useState<File | null>(null);
    const [carregando, setCarregando] = useState(false);
    const [erroNomeUsuario, setErroNomeUsuario] = useState('');

    const [cortarAberto, setCortarAberto] = useState(false);
    const [imagemOriginal, setImagemOriginal] = useState<string>('');

    useEffect(() => {
        auditoria.iniciarProcesso();
        const user = authService.getCurrentUser();
        
        auditoria.decisaoRedirecionamento(user);
        if (!user) {
            navigate('/');
        } else if (user.profile_completed) { // CORRIGIDO
            navigate('/feed');
        }
    }, [navigate]);

    const aoMudarInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let valorFinal = value;

        if (name === 'nickname') {
            const valorLimpo = value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
            valorFinal = valorLimpo;
            setErroNomeUsuario('');
        }
        
        setDadosFormulario(prev => ({ ...prev, [name]: valorFinal }));
        auditoria.alteracaoFormulario(name, valorFinal);
    };
    
    const aoMudarPrivacidade = (privado: boolean) => {
        setPerfilPrivado(privado);
    };

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
        setErroNomeUsuario('');

        if (!dadosFormulario.nickname?.trim()) {
            setErroNomeUsuario('Nome de usuário é obrigatório.');
            return;
        }

        setCarregando(true);

        const dadosPerfil: UserProfile = {
            name: dadosFormulario.name || '',
            nickname: dadosFormulario.nickname || '',
            bio: dadosFormulario.bio || '',
            photoUrl: '',
            website: '',
            isPrivate: perfilPrivado,
        };

        auditoria.tentativaDeSubmissao(dadosPerfil);

        try {
            if (arquivoSelecionado) {
                dadosPerfil.photoUrl = await fileService.uploadFile(arquivoSelecionado);
            }

            const usuarioAtualizado = await authService.completeProfile(dadosPerfil);
            
            auditoria.sucessoNaConclusao({ success: true });
            auditoria.estadoAposSalvar(usuarioAtualizado);
            auditoria.decisaoRedirecionamento(usuarioAtualizado);

            if (usuarioAtualizado?.profile_completed) { // CORRIGIDO
                navigate('/feed');
            } else {
                alert("Não foi possível confirmar a conclusão do seu perfil. Verifique os logs.");
            }

        } catch (err: any) {
            auditoria.falhaNaConclusao(err, dadosPerfil);
            console.error("Falha ao completar o perfil no hook 'useCompleteProfile':", err);
            
            if (err.message && err.message.includes('NAME_TAKEN')) {
                setErroNomeUsuario('Este nome de usuário já está em uso.');
            } else {
                alert(err.message || 'Ocorreu um erro ao finalizar o perfil. Tente novamente.');
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
        dadosFormulario, 
        perfilPrivado, 
        previaImagem, 
        carregando, 
        erroNomeUsuario, 
        cortarAberto, 
        setCortarAberto, 
        imagemOriginal, 
        aoMudarInput, 
        aoMudarImagem, 
        aoSalvarImagemCortada, 
        aoMudarPrivacidade, 
        aoSubmeter,
        aoSair
    };
};
