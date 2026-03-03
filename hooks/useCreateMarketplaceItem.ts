
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ServiçoPublicaçãoMarketplace } from '../ServiçosFrontend/ServiçosDePublicações/ServiçoPublicaçãoMarketplace.js';
import { fileService } from '../ServiçosFrontend/ServiçoDeArquivos/fileService.js';
import { DadosItemMarketplace, TipoMidiaMarketplace, ErrosCriacaoMarketplace } from '../tipos/CriacaoMarketplace.types';

export const useCreateMarketplaceItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { type?: 'paid' | 'organic' } | null;

  // Estado unificado para os dados do item
  const [dadosItem, setDadosItem] = useState<DadosItemMarketplace>({
    titulo: '',
    preco: '',
    categoria: 'Eletrônicos',
    localizacao: '',
    descricao: '',
    arquivoCapa: null,
    arquivosAdicionais: [],
    isAnuncioPago: state?.type === 'paid',
  });

  // Estados da interface e de controle
  const [imagemCapaPreview, setImagemCapaPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrosCriacaoMarketplace>({});

  // Função genérica para atualizar os dados do item
  const updateField = useCallback((key: keyof DadosItemMarketplace, value: any) => {
    setDadosItem(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateField('arquivoCapa', file);
      setImagemCapaPreview(URL.createObjectURL(file));
      setErrors(prev => ({ ...prev, imagemCapa: undefined }));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value === "") {
      updateField('preco', "");
      return;
    }
    const numericValue = parseFloat(value) / 100;
    updateField('preco', numericValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
    setErrors(prev => ({ ...prev, preco: undefined }));
  };

  const handleBack = () => navigate(-1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validação
    if (!dadosItem.titulo) {
      setErrors({ titulo: "O título é obrigatório." });
      return;
    }
    if (!dadosItem.preco) {
      setErrors({ preco: "O preço é obrigatório." });
      return;
    }
    if (!dadosItem.arquivoCapa) {
      setErrors({ imagemCapa: "A imagem de capa é obrigatória." });
      return;
    }

    setIsSubmitting(true);

    try {
      const coverImageUrl = await fileService.uploadFile(dadosItem.arquivoCapa);
      const additionalMediaUrls = await Promise.all(
        dadosItem.arquivosAdicionais.map(item => fileService.uploadFile(item.arquivo))
      );

      const rawPrice = dadosItem.preco.replace(/\./g, '').replace(',', '.');

      const itemData = {
        title: dadosItem.titulo,
        price: parseFloat(rawPrice),
        category: dadosItem.categoria,
        description: dadosItem.descricao,
        location: dadosItem.localizacao,
        images: [coverImageUrl, ...additionalMediaUrls].filter(Boolean),
      };

      await ServiçoPublicaçãoMarketplace.create(itemData);
      navigate('/marketplace');

    } catch (err: any) {
      console.error("Erro ao publicar item no marketplace:", err);
      setErrors({ geral: err.message || "Falha ao publicar o item. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... outras funções como handleGalleryChange, removeGalleryItem ...

  return {
    dadosItem, updateField, imagemCapaPreview, isSubmitting, errors,
    handleCoverChange, handlePriceChange, handleBack, handleSubmit,
  };
};
