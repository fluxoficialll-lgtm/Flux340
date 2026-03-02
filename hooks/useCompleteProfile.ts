
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { fileService } from '../ServiçosFrontend/ServiçoDeArquivos/fileService.js';
import { UserProfile } from '../types';
import ServicoAuditoriaCriarPerfil from '../ServiçosFrontend/ServicoLogs/Servico.Auditoria.Criar.Perfil.js';

export const useCompleteProfile = () => {
    const navigate = useNavigate();
    const auditoria = ServicoAuditoriaCriarPerfil;

    const [formData, setFormData] = useState<Partial<UserProfile>>({
        name: '',
        nickname: '',
        bio: '',
    });
    const [isPrivate, setIsPrivate] = useState(false);

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');

    const [isCropOpen, setIsCropOpen] = useState(false);
    const [rawImage, setRawImage] = useState<string>('');

    useEffect(() => {
        auditoria.iniciarProcesso();
        const user = authService.getCurrentUser();
        
        auditoria.decisaoRedirecionamento(user);
        if (!user) {
            navigate('/');
        } else if (user.isProfileCompleted) {
            navigate('/feed');
        }
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        let finalValue = value;

        if (name === 'nickname') {
            const cleanValue = value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
            finalValue = cleanValue;
            setUsernameError('');
        }
        
        setFormData(prev => ({ ...prev, [name]: finalValue }));
        auditoria.alteracaoFormulario(name, finalValue);
    };
    
    const handlePrivacyChange = (isPrivate: boolean) => {
        setIsPrivate(isPrivate);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            auditoria.selecaoDeImagem(file.name);
            const reader = new FileReader();
            reader.onload = (ev) => {
                setRawImage(ev.target?.result as string);
                setIsCropOpen(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCroppedImage = (croppedBase64: string) => {
        auditoria.imagemCortada();
        setImagePreview(croppedBase64);
        fetch(croppedBase64)
          .then(res => res.blob())
          .then(blob => {
              const file = new File([blob], "avatar.jpg", { type: "image/jpeg" });
              setSelectedFile(file);
          });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUsernameError('');

        if (!formData.nickname?.trim()) {
            setUsernameError('Nome de usuário é obrigatório.');
            return;
        }

        setLoading(true);

        const profileData: UserProfile = {
            name: formData.name || '',
            nickname: formData.nickname || '',
            bio: formData.bio || '',
            photoUrl: '',
            website: '',
            isPrivate,
            cpf: '',
            phone: ''
        };

        auditoria.tentativaDeSubmissao(profileData);

        try {
            if (selectedFile) {
                profileData.photoUrl = await fileService.uploadFile(selectedFile);
            }

            const userAtualizado = await authService.completeProfile(profileData);
            
            auditoria.sucessoNaConclusao({ success: true });
            auditoria.estadoAposSalvar(userAtualizado);
            auditoria.decisaoRedirecionamento(userAtualizado);

            if (userAtualizado?.isProfileCompleted) {
                navigate('/feed');
            } else {
                alert("Não foi possível confirmar a conclusão do seu perfil. Verifique os logs.");
            }

        } catch (err: any) {
            auditoria.falhaNaConclusao(err, profileData);
            console.error("Falha ao completar o perfil no hook 'useCompleteProfile':", err);
            
            if (err.message && err.message.includes('NAME_TAKEN')) {
                setUsernameError('Este nome de usuário já está em uso.');
            } else {
                alert(err.message || 'Ocorreu um erro ao finalizar o perfil. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    const handleLogout = () => {
        auditoria.logout();
        authService.logout();
        navigate('/');
    };

    return {
        formData, 
        isPrivate, 
        imagePreview, 
        loading, 
        usernameError, 
        isCropOpen, 
        setIsCropOpen, 
        rawImage, 
        handleChange, 
        handleImageChange, 
        handleCroppedImage, 
        handlePrivacyChange, 
        handleSubmit,
        handleLogout
    };
};
