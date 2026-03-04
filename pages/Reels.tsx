
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useReels } from '../hooks/useReels';
import { ReelItem } from '../Componentes/ComponentesDeReels/Componentes/ReelItem';

// Estilos foram movidos para um arquivo CSS ou mantidos no escopo se necessário.

export const Reels: React.FC = () => {
  const navigate = useNavigate();
  const {
    reels,
    isLoading,
    error,
    currentUser,
    handleLike,
    handleCommentClick,
    handleShare,
    // Outros handlers e estados do hook original não são usados na versão simplificada
  } = useReels();

  // RENDERIZAÇÃO DO ESTADO DE CARREGAMENTO
  if (isLoading) {
    return (
      <div className="reels-page flex items-center justify-center">
        <div className="text-center animate-pulse">
          <i className="fa-solid fa-circle-notch fa-spin text-3xl text-[#00c2ff] mb-4"></i>
          <p className="text-sm font-semibold text-gray-400">Carregando Reels...</p>
        </div>
      </div>
    );
  }

  // RENDERIZAÇÃO DO ESTADO DE ERRO
  if (error) {
    return (
      <div className="reels-page flex items-center justify-center">
        <div className="text-center text-red-400">
          <i className="fa-solid fa-circle-exclamation text-3xl mb-4"></i>
          <p className="font-bold">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-6 text-sm text-gray-400 hover:text-white">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="reels-page">
      {/* --- ESTILOS INLINE PARA SIMPLICIDADE --- */}
      <style>{`
        .reels-page { position: relative; background: #000; height: 100dvh; width: 100%; overflow: hidden; }
        #reelsContent { height: 100%; width: 100%; overflow-y: scroll; scroll-snap-type: y mandatory; scroll-behavior: smooth; }
        #reelsContent::-webkit-scrollbar { display: none; }
        .reel-container-wrapper { height: 100%; width: 100%; scroll-snap-align: start; scroll-snap-stop: always; position: relative; }
      `}</style>

      {/* Cabeçalho e navegação simplificados */}
      <div className="fixed top-5 left-1/2 -translate-x-1/2 z-20 flex gap-4 bg-black/30 backdrop-blur-md px-4 py-1 rounded-full">
          <button className="text-white/60 font-semibold" onClick={() => navigate('/feed')}>Feed</button>
          <button className="text-white font-bold">Reels</button>
      </div>

      <div id="reelsContent">
        {reels.length === 0 ? (
            <div className="flex items-center justify-center h-full flex-col gap-4 text-white">
                <i className="fa-solid fa-video-slash text-4xl text-gray-600"></i>
                <p className="text-gray-500">Nenhum Reel para exibir.</p>
                <button onClick={() => navigate('/create-reel')} className="px-4 py-2 bg-[#00c2ff] text-black rounded-lg font-bold shadow-[0_4px_10px_rgba(0,194,255,0.3)]">
                  Criar um Reel
                </button>
            </div>
        ) : (
            reels.map((reel, index) => (
                <div key={reel.id} className="reel-container-wrapper">
                    <ReelItem 
                        reel={reel}
                        isActive={true} // Simplificado: todos os reels são considerados ativos para exibição
                        onLike={() => handleLike(reel.id)}
                        onComment={() => handleCommentClick(reel.id)}
                        onShare={() => handleShare(reel.id)}
                        isOwner={reel.author.handle === currentUser?.handle}
                        // As props complexas foram removidas para corresponder ao hook simplificado
                        // getDisplayName e getUserAvatar não são mais necessários, pois os dados já estão no objeto `reel.author`
                    />
                </div>
            ))
        )}
      </div>

      {/* O Painel de Comentários pode ser adicionado aqui depois, se necessário */}
    </div>
  );
};
