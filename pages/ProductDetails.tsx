
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductDetails } from '../hooks/useProductDetails';
import { useModal } from '../Componentes/ModalSystem';

// Modular Components
import { ProductHeader } from '../Componentes/ComponentesDeMarketplace/Componentes/details/ProductHeader';
import { ProductMediaGallery } from '../Componentes/ComponentesDeMarketplace/Componentes/details/ProductMediaGallery';
import { ProductInfo } from '../Componentes/ComponentesDeMarketplace/Componentes/details/ProductInfo';
import { ProductSellerCard } from '../Componentes/ComponentesDeMarketplace/Componentes/details/ProductSellerCard';
import { ProductDescription } from '../Componentes/ComponentesDeMarketplace/Componentes/details/ProductDescription';
import { ProductBottomBar } from '../Componentes/ComponentesDeMarketplace/Componentes/details/ProductBottomBar';
import { ProductLightbox } from '../Componentes/ComponentesDeMarketplace/Componentes/details/ProductLightbox';
import { CommentSheet } from '../Componentes/ui/comments/CommentSheet';

export const ProductDetails: React.FC = () => {
  const navigate = useNavigate();
  const { showConfirm } = useModal();
  const {
    item, loading, isSeller, questions, commentText, setCommentText,
    isCommentModalOpen, setIsCommentModalOpen, replyingTo, setReplyingTo,
    zoomedMedia, setZoomedMedia, currentUser,
    handleChat, handleSendQuestion, handleDeleteQuestion, handleLikeQuestion, 
    handleDeleteItem, navigateToStore, mediaItems
  } = useProductDetails();

  const requestDeleteItem = async () => {
    if (await showConfirm("Excluir Anúncio", "Tem certeza que deseja excluir este anúncio?", "Excluir", "Cancelar")) {
      handleDeleteItem();
    }
  };

  const requestDeleteQuestion = async (commentId: string) => {
    if (await showConfirm("Excluir pergunta", "Deseja excluir sua pergunta?", "Excluir", "Cancelar")) {
      handleDeleteQuestion(commentId);
    }
  };

  if (loading || !item) {
    return <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0c0f14] text-white font-['Inter'] flex flex-col relative pb-[90px]">
      <style>{`
        .product-container { padding: 0; position: relative; z-index: 10; width: 100%; max-width: 600px; margin: 0 auto; }
        .details-wrapper { background: #0c0f14; border-top-left-radius: 20px; border-top-right-radius: 20px; margin-top: -20px; position: relative; z-index: 5; padding: 25px 20px; box-shadow: 0 -10px 30px rgba(0,0,0,0.5); }
        /* Outros estilos permanecem os mesmos... */
      `}</style>

      <ProductHeader />

      <div className="product-container">
        <ProductMediaGallery 
          mediaItems={mediaItems} 
          onMediaClick={setZoomedMedia} 
        />

        <div className="details-wrapper">
          <ProductInfo 
            title={item.title}
            price={item.price}
            location={item.location}
            category={item.category}
            timestamp={item.timestamp}
          />

          <ProductSellerCard 
            sellerName={item.sellerName || 'Vendedor'}
            sellerAvatar={item.sellerAvatar}
            onClick={navigateToStore}
          />

          <ProductDescription description={item.description} />

          <button className="qa-trigger-btn" onClick={() => setIsCommentModalOpen(true)}>
            <span className="font-bold text-sm"><i className="fa-regular fa-comments mr-2 text-[#00c2ff]"></i> Perguntas ({questions.length})</span>
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>
      </div>

      <ProductBottomBar 
        isSeller={isSeller}
        onDelete={requestDeleteItem}
        onChat={handleChat}
      />

      <ProductLightbox 
        media={zoomedMedia}
        onClose={() => setZoomedMedia(null)}
      />

      <CommentSheet 
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        title={`Perguntas (${questions.length})`}
        comments={questions}
        commentText={commentText}
        onCommentTextChange={setCommentText}
        onSend={handleSendQuestion}
        onLike={handleLikeQuestion}
        onDelete={requestDeleteQuestion}
        onUserClick={(u) => navigate(`/user/${u.replace('@', '')}`)}
        currentUserId={currentUser?.id}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        onReplyClick={(cid, user) => setReplyingTo({ id: cid, username: user })}
        placeholder={isSeller ? "Responda a dúvida do cliente..." : "Escreva sua dúvida para o vendedor..."}
      />
    </div>
  );
};
