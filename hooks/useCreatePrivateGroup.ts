
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiçoCriaçãoGrupoPrivado from '../ServiçosFrontend/ServiçoDeGrupos/Criação.Grupo.Privado.js';
import { DadosGrupoPrivado, ErrosCriacaoGrupoPrivado } from '../tipos';

export const useCreatePrivateGroup = () => {
  const navigate = useNavigate();

  // Estado unificado para os dados do formulário
  const [dadosGrupo, setDadosGrupo] = useState<DadosGrupoPrivado>({ 
    nomeGrupo: '',
    descricao: '',
    arquivoCapa: null 
  });

  // Estados da UI
  const [imagemCapaPreview, setImagemCapaPreview] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<ErrosCriacaoGrupoPrivado>({});

  // Função genérica para atualizar os campos do formulário
  const updateField = useCallback((field: keyof DadosGrupoPrivado, value: any) => {
    setDadosGrupo(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            setRawImage(e.target?.result as string);
            setIsCropOpen(true);
        };
        reader.readAsDataURL(file);
    }
  };

  // Converte a imagem cortada (base64) para um File e atualiza o estado
  const handleCroppedImage = async (base64Image: string) => {
    setIsCropOpen(false);
    setImagemCapaPreview(base64Image);
    const blob = await fetch(base64Image).then(res => res.blob());
    const file = new File([blob], "cover.png", { type: "image/png" });
    updateField('arquivoCapa', file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!dadosGrupo.nomeGrupo.trim()) {
      setErrors({ nomeGrupo: 'O nome do grupo é obrigatório.' });
      return;
    }
    setErrors({});
    setIsCreating(true);

    try {
        await ServiçoCriaçãoGrupoPrivado.criar({
            name: dadosGrupo.nomeGrupo,
            description: dadosGrupo.descricao,
            coverImageBlob: dadosGrupo.arquivoCapa,
        });
        navigate('/groups');
    } catch (error) {
        console.error("Falha ao criar o grupo privado:", error);
        setErrors({ geral: (error as Error).message || 'Ocorreu uma falha ao criar o grupo privado.' });
    } finally {
        setIsCreating(false);
    }
  };

  const handleBack = () => navigate('/create-group');

  return {
    dadosGrupo,
    updateField,
    imagemCapaPreview,
    isCreating,
    isCropOpen,
    setIsCropOpen,
    rawImage,
    errors,
    handleCoverChange,
    handleCroppedImage,
    handleBack,
    handleSubmit,
    navigate
  };
};
