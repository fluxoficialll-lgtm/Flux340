
import React, { useRef } from 'react';
import { useUserProfile } from '../hooks/useUserProfile';
import { ContainerFeed } from '../Componentes/ComponentesDeFeed/Container.Feed';
import { AvatarPreviewModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/AvatarPreviewModal';
import { Footer } from '../Componentes/layout/Footer';
import { VisitorHeader } from '../Componentes/ComponentesDeUserProfile/Componentes/VisitorHeader';
import { VisitorInfoCard } from '../Componentes/ComponentesDeUserProfile/Componentes/VisitorInfoCard';
import { VisitorBlockedState, VisitorPrivateState } from '../Componentes/ComponentesDeUserProfile/Componentes/VisitorStates';
import { ModalListaDeSeguidores } from '../Componentes/ComponentesPerfilProprio/ModalListaDeSeguidores';

// 1. Importações corrigidas e padronizadas
import { CardCategoriasPerfil } from '../Componentes/ComponentesPerfilProprio/Card.Categorias.Perfil';
import { GradeDePostagens } from '../Componentes/ComponentesPerfilProprio/Grade.Postagens';
import { GradeDeProdutos } from '../Componentes/ComponentesPerfilProprio/Grade.Produtos';
import { GradeDeFotos } from '../Componentes/ComponentesPerfilProprio/Grade.Fotos';
import { GradeDeReels } from '../Componentes/ComponentesPerfilProprio/Grade.Reels';

export const UserProfile: React.FC = () => {
  const {
    isLoading, isMe, isBlocked, isPrivate, isFollowLoading, userData, userPosts, userProducts,
    activeTab, setActiveTab, relationStatus, canMessage, isContentVisible, targetUserEmail,
    handleFollowClick, handleToggleBlock, handleLike, handleVote, navigate, handleMessageClick,
    isModalOpen, modalTitle, modalUsers, handleFollowersClick, handleFollowingClick, handleCloseModal, 
    isPreviewOpen, setIsPreviewOpen
  } = useUserProfile();

  const scrollRef = useRef<HTMLDivElement>(null);

  if (isLoading || !userData) {
    return <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white"><i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i></div>;
  }

  // 2. Filtrando o conteúdo uma vez para reutilização
  const textPosts = userPosts.filter(p => p.type !== 'video' && p.type !== 'photo');
  const photoPosts = userPosts.filter(p => p.type === 'photo');
  const videoPosts = userPosts.filter(p => p.type === 'video');

  const renderContent = () => {
      if (!isContentVisible) return <VisitorPrivateState />;

      // 3. Renderização condicional unificada
      switch (activeTab) {
          case 'posts':
              return <GradeDePostagens posts={textPosts} />;
          case 'products':
              return <GradeDeProdutos products={userProducts} onProductClick={(p) => navigate(`/marketplace/product/${p.id}`)} />;
          case 'fotos':
              return <GradeDeFotos photos={photoPosts} onPhotoClick={(p) => navigate(`/post/${p.id}`)} />;
          case 'reels':
              return <GradeDeReels reels={videoPosts} onReelClick={(p) => navigate(`/reels/${p.id}`, { state: { authorId: targetUserEmail } })} />;
          default:
              return <div className="no-content">Nenhum conteúdo.</div>;
      }
  };

  return (
    <div className="h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
      <style>{`
          main { flex-grow: 1; overflow-y: auto; padding-top: 80px; padding-bottom: 100px; scroll-behavior: smooth; }
          .no-content { text-align: center; color: #666; padding: 40px 0; font-size: 14px; width: 100%; }
      `}</style>

      <VisitorHeader 
        onBack={() => navigate(-1)}
        onLogoClick={() => scrollRef.current?.scrollTo({top: 0, behavior: 'smooth'})}
        isMe={isMe}
        isBlocked={isBlocked}
        onToggleBlock={handleToggleBlock}
        onReport={() => alert('Denunciar usuário')}
        username={userData.username}
      />

      <main ref={scrollRef} className="no-scrollbar">
        <div style={{width:'100%', maxWidth:'500px', margin:'0 auto'}}>
          {isBlocked ? (
            <VisitorBlockedState />
          ) : (
            <>
              <VisitorInfoCard 
                avatar={userData.avatar}
                nickname={userData.nickname}
                username={userData.username}
                bio={userData.bio}
                stats={userData.stats}
                isMe={isMe}
                isBlocked={isBlocked}
                relationStatus={relationStatus}
                isFollowLoading={isFollowLoading}
                canMessage={canMessage}
                onFollowClick={handleFollowClick}
                onMessageClick={handleMessageClick}
                onAvatarClick={() => setIsPreviewOpen(true)}
                onFollowersClick={handleFollowersClick}
                onFollowingClick={handleFollowingClick}
              />
              <div className="mt-4">
                <CardCategoriasPerfil 
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  hasProducts={userProducts.length > 0}
                />
              </div>
              <div className="tab-content mt-4 px-2 pb-10">
                {renderContent()}
              </div>
            </>
          )}
        </div>
      </main>

      <Footer />

      <ModalListaDeSeguidores 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        users={modalUsers} 
        title={modalTitle} 
      />

      <AvatarPreviewModal 
        isOpen={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)} 
        imageSrc={userData?.avatar || ''} 
        username={userData?.nickname || ''} 
      />
    </div>
  );
};
