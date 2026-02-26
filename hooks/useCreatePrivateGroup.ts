import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiçoCriaçãoGrupoPrivado } from '../ServiçosFrontend/ServiçoDeGrupos/Criação.Grupo.Privado.js';

export const useCreatePrivateGroup = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Estado para o cropper de imagem
  const [isCropOpen, setIsCropOpen] = useState(false);
  const [rawImage, setRawImage] = useState<string>('');

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
    // Converte o base64 de volta para um arquivo para upload
    fetch(croppedBase64)
      .then(res => res.blob())
      .then(blob => {
          const file = new File([blob], "group_cover.jpg", { type: "image/jpeg" });
          setSelectedFile(file);
      });
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
      const groupData = { name: groupName, description };
      await ServiçoCriaçãoGrupoPrivado.criar(groupData, selectedFile, coverImage);
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