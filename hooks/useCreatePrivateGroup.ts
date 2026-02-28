
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiçoCriaçãoGrupoPrivado from '../ServiçosFrontend/ServiçoDeGrupos/Criação.Grupo.Privado.js';

export const useCreatePrivateGroup = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const [rawImage, setRawImage] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);

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
    setCoverImage(croppedBase64);
  };

  const handleBack = () => {
      if (window.history.state && window.history.state.idx > 0) {
          navigate(-1);
      } else {
          navigate('/create-group'); // Rota de fallback
      }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) return;

    setIsCreating(true);
    
    try {
        let coverImageBlob: Blob | null = null;
        if (coverImage) {
            coverImageBlob = await fetch(coverImage).then(res => res.blob());
        }

        await ServiçoCriaçãoGrupoPrivado.criar({
            name: groupName,
            description: description,
            coverImageBlob: coverImageBlob,
        });

      navigate('/groups');
    } catch (error) {
      console.error(error); // Log do erro para depuração
      alert((error as Error).message || "Erro ao criar grupo privado.");
    } finally {
      setIsCreating(false);
    }
  };

  return {
    groupName,
    setGroupName,
    description,
    setDescription,
    coverImage,
    isCreating,
    isCropOpen,
    setIsCropOpen,
    rawImage,
    handleCoverChange,
    handleCroppedImage,
    handleSubmit,
    handleBack,
    navigate
  };
};
