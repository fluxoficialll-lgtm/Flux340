
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiçoCriaçãoGrupoPublico } from '../ServiçosFrontend/ServiçoDeGrupos/Criação.Grupo.Publico.js';

export const useCreatePublicGroup = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
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
    const blob = await fetch(image).then(res => res.blob());
    const file = new File([blob], "cover.png", { type: "image/png" });
    setSelectedCoverFile(file);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!groupName) return;

    setIsCreating(true);
    try {
        await ServiçoCriaçãoGrupoPublico.criar({
            groupName,
            description,
            coverImage: coverImage || undefined,
            selectedCoverFile
        });

        navigate('/groups');
    } catch (error) {
        console.error("Failed to create group:", error);
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
