
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ServiçoPublicaçãoMarketplace } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoMarketplace.js';
import { fileService } from '../ServiçosFrontend/ServiçoDeArquivos/fileService.js';
import { MarketplaceItem } from '../types';

export const useCreateMarketplaceItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { type?: 'paid' | 'organic' } | null;
  const isPaid = state?.type === 'paid';

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Eletrônicos');
  const [locationVal, setLocationVal] = useState('');
  const [description, setDescription] = useState('');
  
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null);
  const [additionalMedia, setAdditionalMedia] = useState<{file: File, url: string, type: 'image' | 'video'}[]>([]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      const coverImageUrl = selectedCoverFile ? await fileService.uploadFile(selectedCoverFile) : coverImage || '';
      const additionalMediaUrls = await Promise.all(
        additionalMedia.map(item => fileService.uploadFile(item.file))
      );

      const rawPrice = price.replace(/\./g, '').replace(',', '.');

      const itemData = {
        title: title,
        price: parseFloat(rawPrice),
        category: category,
        description: description,
        location: locationVal,
        images: [coverImageUrl, ...additionalMediaUrls].filter(Boolean), 
      };

      const newItem = await ServiçoPublicaçãoMarketplace.create(itemData);
      console.log('Item de marketplace criado com sucesso:', newItem);

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
