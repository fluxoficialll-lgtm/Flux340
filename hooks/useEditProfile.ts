import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { fileService } from '../ServiçosFrontend/ServiçoDeArquivos/fileService.js';
import { ErroSenha, PerfilDoUsuario } from '@/tipos';

export const useEditProfile = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<PerfilDoUsuario>({
      nome: '',
      apelido: '',
      bio: '',
      website: '', 
      isPrivado: false,
      urlDaFoto: undefined,
  });
  
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState('');

  // Crop states
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string>('');

  useEffect(() => {
      const user = authService.getCurrentUser();
      if (!user) {
          navigate('/');
          return;
      }

      if (user.profile) {
          setFormData({
              nome: user.profile.name || '',
              apelido: user.profile.nickname || '',
              bio: user.profile.bio || '',
              website: user.profile.website || '',
              isPrivado: user.profile.isPrivate || false,
              urlDaFoto: user.profile.photoUrl,
          });
          if (user.profile.photoUrl) {
              setImagePreview(user.profile.photoUrl);
          }
      }
      setFetching(false);
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      
      if (name === 'nome') {
          const cleanValue = value.toLowerCase().replace(/[^a-z0-9_.]/g, '');
          setFormData(prev => ({ ...prev, [name]: cleanValue }));
          setUsernameError('');
      } else {
          setFormData(prev => ({ ...prev, [name]: value }));
      }
  };

  const handleTogglePrivacy = () => {
      setFormData(prev => ({ ...prev, isPrivado: !prev.isPrivado }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      setError('');
      setUsernameError('');

      if (!formData.nome.trim()) {
          setUsernameError('Nome de usuário é obrigatório');
          return;
      }

      setLoading(true);

      try {
          let finalPhotoUrl = formData.urlDaFoto;

          if (selectedFile) {
              finalPhotoUrl = await fileService.uploadFile(selectedFile);
          }

          const updatedProfile = { 
            name: formData.nome,
            nickname: formData.apelido,
            bio: formData.bio,
            website: formData.website,
            isPrivate: formData.isPrivado,
            photoUrl: finalPhotoUrl 
          };

          await authService.completeProfile(updatedProfile);
          
          alert('Perfil atualizado com sucesso!');
          navigate('/profile', { replace: true });
      } catch (err: any) {
          if (err.message === ErroSenha.NOME_DE_USUARIO_JA_EM_USO) {
              setUsernameError('Este nome de usuário já está em uso.');
          } else {
              setError(err.message || 'Erro ao atualizar perfil.');
          }
      } finally {
          setLoading(false);
      }
  };

  const handleBack = () => {
      if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
      } else {
          navigate('/profile');
      }
  };

  return {
    formData, setFormData, imagePreview, loading, fetching, error, usernameError,
    isCropOpen, setIsCropOpen, rawImage, handleChange, handleImageChange, 
    handleCroppedImage, handleSubmit, handleBack
  };
};
