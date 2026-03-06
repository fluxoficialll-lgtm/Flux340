
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CardDescricaoMarkplace } from '../Componentes/ComponentesDeMarketplace/Card.Descricao.Markplace';
import { useComentariosMarketplace } from '../hooks/useComentariosMarketplace';
import { CardComentarioMarketplace } from '../Componentes/ComponenteDeInterfaceDeUsuario/comments/Card.Comentario.Marketplace';

const mockProduct = {
  id: 'prod123',
  name: 'Curso Completo de Edição de Vídeo com DaVinci Resolve',
  price: 'R$ 249,90',
  seller: {
    name: 'Flux Creative',
    avatar: 'https://placehold.co/40x40/00c2ff/white?text=F',
    rating: 4.9,
    reviews: 234
  },
  images: [
    'https://via.placeholder.com/800x600/1a1a1a/fff?text=Capa+do+Curso',
    'https://via.placeholder.com/800x600/2a2a2a/fff?text=Módulo+1:+Interface',
    'https://via.placeholder.com/800x600/3a3a3a/fff?text=Módulo+2:+Edição',
    'https://via.placeholder.com/800x600/4a4a4a/fff?text=Módulo+3:+Color+Grading'
  ],
  description: `Leve suas habilidades de edição para o próximo nível com nosso curso completo de DaVinci Resolve. Aprenda desde a interface básica até técnicas avançadas de color grading, edição de áudio e efeitos visuais. Este curso é perfeito para iniciantes e editores intermediários que desejam dominar o software padrão da indústria.\n\nO que você vai aprender:\n- Navegação e organização de projetos\n- Ferramentas de corte e montagem\n- Tratamento e correção de cor profissional\n- Mixagem de áudio e sound design\n- Exportação para diferentes plataformas`,
};

export const PGDetalhesProdutos: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(mockProduct.images[0]);
  const { comentarios, isLoading, error, carregarComentarios, postarComentario } = useComentariosMarketplace(id || 'prod123');
  const [novoComentario, setNovoComentario] = useState('');

  const handlePostarComentario = async () => {
    if (novoComentario.trim()) {
        await postarComentario(novoComentario);
        setNovoComentario('');
    }
  };

  return (
    <div className="min-h-[100dvh] font-['Inter'] bg-[#0c0f14] text-white">
      <header className="flex items-center justify-between p-4 bg-[#0c0f14]/80 backdrop-blur-lg fixed w-full top-0 z-40 border-b border-white/10 h-[65px]">
        <button onClick={() => navigate(-1)} className="text-[#00c2ff] text-xl p-2 hover:bg-white/5 rounded-full transition-all">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-xs font-black uppercase tracking-[2px]">Produto</span>
        <div className="w-10"></div>
      </header>

      <main className="pt-[65px] w-full max-w-[1000px] mx-auto flex-grow px-4 pb-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mt-6 animate-fade-in">
          <div className="md:w-1/2 flex flex-col gap-3">
            <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                <img src={selectedImage} alt="Product main image" className="w-full h-full object-cover transition-all duration-300" />
            </div>
            <div className="grid grid-cols-4 gap-3">
                {mockProduct.images.map((img, index) => (
                    <button 
                        key={index} 
                        onClick={() => setSelectedImage(img)}
                        className={`aspect-video w-full bg-black rounded-lg overflow-hidden border-2 transition-all ${selectedImage === img ? 'border-[#00c2ff]' : 'border-transparent hover:border-white/50'}`}>
                        <img src={img} alt={`Product thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
          </div>

          <div className="md:w-1/2 flex flex-col pt-2">
            <h1 className="text-2xl lg:text-3xl font-bold text-white leading-tight">{mockProduct.name}</h1>
            <div className="flex items-center gap-3 my-4">
                <img src={mockProduct.seller.avatar} alt={mockProduct.seller.name} className="w-10 h-10 rounded-full" />
                <div>
                    <p className="font-semibold text-white">{mockProduct.seller.name}</p>
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        <span><span className='font-bold text-white'>{mockProduct.seller.rating}</span> ({mockProduct.seller.reviews} avaliações)</span>
                    </div>
                </div>
            </div>
            <div className="text-4xl font-extrabold text-white my-4">{mockProduct.price}</div>
            <div className="flex flex-col gap-3">
                 <button className="w-full bg-[#00c2ff] text-black font-bold py-3 rounded-lg text-sm hover:bg-white transition-all">Comprar agora</button>
                 <button className="w-full bg-white/10 text-white font-bold py-3 rounded-lg text-sm hover:bg-white/20 transition-all">Adicionar ao carrinho</button>
            </div>
          </div>
        </div>
        <CardDescricaoMarkplace title="Descrição" description={mockProduct.description} />
        
        <div className="bg-white/5 rounded-2xl p-6 mt-8 w-full">
            <h2 className="font-bold text-lg mb-4 text-white">Perguntas e Respostas</h2>
            <div className="flex gap-3 mb-6">
                <input 
                    type="text" 
                    value={novoComentario}
                    onChange={(e) => setNovoComentario(e.target.value)}
                    placeholder="Escreva sua pergunta..." 
                    className="flex-grow bg-black/20 border border-white/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00c2ff] transition-all"
                />
                <button onClick={handlePostarComentario} className="bg-[#00c2ff] text-black font-bold px-6 py-2 rounded-lg text-sm hover:bg-white transition-all" disabled={isLoading}>
                    {isLoading ? 'Enviando...' : 'Enviar'}
                </button>
            </div>
            {error && <p className="text-red-500 text-sm mb-4">{error.geral}</p>}
            <div className="flex flex-col gap-4">
                {isLoading && comentarios.length === 0 && <p className="text-gray-400">Carregando comentários...</p>}
                {!isLoading && comentarios.length === 0 && <p className="text-gray-400">Nenhuma pergunta ainda. Seja o primeiro a perguntar!</p>}
                {comentarios.map(comentario => (
                    <CardComentarioMarketplace key={comentario.id} comentario={comentario} />
                ))}
            </div>
        </div>
      </main>
    </div>
  );
};
