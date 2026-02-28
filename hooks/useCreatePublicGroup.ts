
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ServiçoCriaçãoGrupoPublico from '../ServiçosFrontend/ServiçoDeGrupos/Criação.Grupo.Publico.js';

export const useCreatePublicGroup = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [rawImage, setRawImage] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCropOpen, setIsCropOpen] = useState(false);

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

  const handleCroppedImage = async (image: string) => {
    setIsCropOpen(false);
    setCoverImage(image);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!groupName) return;

    setIsCreating(true);
    try {
        let coverImageBlob: Blob | null = null;
        if (coverImage) {
            coverImageBlob = await fetch(coverImage).then(res => res.blob());
        }

        await ServiçoCriaçãoGrupoPublico.criar({
            name: groupName,
            description: description,
            coverImageBlob: coverImageBlob,
        });

        navigate('/groups');
    } catch (error) {
        console.error("Failed to create group:", error);
        alert((error as Error).message);
    } finally {
        setIsCreating(false);
    }
  };

  const handleBack = () => navigate('/create-group');

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
    handleBack,
    handleSubmit,
    navigate
  };
};
