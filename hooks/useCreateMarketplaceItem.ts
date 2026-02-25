
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// Importação do serviço de marketplace validado
import { ServiçoPublicaçãoMarketplace } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoMarketplace.js';
// Mantendo outros serviços que o hook possa precisar
import { postService } from '../ServiçosFrontend/ServiçoDePosts/postService'; // Usado para upload de mídia
import { MarketplaceItem } from '../types';

export const useCreateMarketplaceItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { type?: 'paid' | 'organic' } | null;
  const isPaid = state?.type === 'paid';

  // Estados do formulário (title, price, etc.)
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Eletrônicos');
  const [locationVal, setLocationVal] = useState('');
  const [description, setDescription] = useState('');
  
  // Estados de mídia
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [additionalMedia, setAdditionalMedia] = useState<{file: File, url: string, type: 'image' | 'video'}[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ... (Handlers de mídia como handleCoverChange, handleGalleryChange permanecem os mesmos)
  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedCoverFile(file);
      setCoverImage(URL.createObjectURL(file));
    }
  };
  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => { /* ... */ };
  const removeGalleryItem = (index: number) => { /* ... */ };

  const handleBack = () => navigate(-1);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value.replace(/\D/g, "");
      if (value === "") { setPrice(""); return; }
      const numericValue = parseFloat(value) / 100;
      setPrice(numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !coverImage || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // Passo 1: Preparar os dados para o serviço.
      // A lógica de upload permanece por enquanto, mas o objetivo é que o serviço lide com isso.
      const coverImageUrl = selectedCoverFile ? await postService.uploadMedia(selectedCoverFile, 'marketplace') : coverImage || '';
      const additionalMediaUrls = await Promise.all(
        additionalMedia.map(item => postService.uploadMedia(item.file, 'marketplace'))
      );

      const rawPrice = price.replace(/\./g, '').replace(',', '.');

      const itemData = {
        title: title,
        price: parseFloat(rawPrice),
        category: category,
        description: description,
        location: locationVal,
        images: [coverImageUrl, ...additionalMediaUrls].filter(Boolean), // Filtra URLs nulas/vazias
        // O serviço irá extrair o 'authToken' e associar o vendedor (usuário logado)
      };

      // Passo 2: Chamar o serviço de publicação do marketplace.
      // A chamada é mais limpa e direta.
      const newItem = await ServiçoPublicaçãoMarketplace.create(itemData);
      console.log('Item de marketplace criado com sucesso:', newItem);

      // Passo 3: Redirecionar o usuário.
      navigate('/marketplace');

    } catch (err: any) {
      console.error("Erro ao publicar item no marketplace:", err);
      setError(err.message || "Falha ao publicar o item. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isPaid, title, setTitle, price, handlePriceChange, category, setCategory, locationVal, setLocationVal,
    description, setDescription, coverImage, additionalMedia, isSubmitting, error, handleCoverChange, handleGalleryChange,
    removeGalleryItem, handleBack, handleSubmit, navigate
  };
};
