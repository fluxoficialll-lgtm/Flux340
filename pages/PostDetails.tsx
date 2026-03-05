
import React, { useState } from 'react';
import { useModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/ModalSystem';
import { usePostDetails } from '../hooks/usePostDetails';
import { ContainerFeed } from '../Componentes/ComponentesDeFeed/Container.Feed';
import { PainelComentariosFeed } from '../Componentes/ComponenteDeInterfaceDeUsuario/comments/Card.Comentario.Feed';

export const PostDetails: React.FC = () => {
  const { showConfirm } = useModal();
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const {
    post, comments, commentText, setCommentText, replyingTo, setReplyingTo, currentUserId,
    handleLike, handleSendComment, handleDeleteComment, handleCommentLike, handleVote, navigate, currentUser
  } = usePostDetails();

  const requestDeleteComment = async (commentId: string) => {
    if (await showConfirm("Excluir comentário", "Deseja excluir este comentário?", "Excluir", "Cancelar")) {
      handleDeleteComment(commentId);
    }
  };

  const handleReplyClick = (id: string, username: string) => {
    setIsCommentModalOpen(true);
    setReplyingTo({ id, username });
  };

  if (!post) {
    return <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">Carregando...</div>;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col font-['Inter'] overflow-hidden bg-[#0c0f14] text-white">
      <header className="flex items-center justify-between p-4 bg-[#0c0f14] fixed w-full top-0 z-50 border-b border-white/10 h-[65px]">
        <button onClick={() => navigate(-1)} className="text-[#00c2ff] text-xl p-2 hover:bg-white/5 rounded-full transition-all">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-xs font-black uppercase tracking-[2px]">Publicação</span>
        <div className="w-10"></div>
      </header>

      <main className="pt-[75px] pb-5 w-full max-w-[500px] mx-auto flex-grow overflow-y-auto no-scrollbar px-3">
        <ContainerFeed
          post={post}
          currentUserId={currentUserId}
          onLike={handleLike}
          onDelete={() => { /* Implementar se necessário */ }}
          onUserClick={(u) => navigate(`/user/${u.replace('@', '')}`)}
          onCommentClick={() => setIsCommentModalOpen(true)}
          onShare={async (p) => {
            const url = `${window.location.origin}/#/post/${p.id}`;
            try {
              if (navigator.share) { await navigator.share({ url }); }
              else { navigator.clipboard.writeText(url); alert('Link copiado!'); }
            } catch (error) { console.error('Error sharing', error); }
          }}
          onVote={handleVote}
          onCtaClick={(l) => l?.startsWith('http') ? window.open(l, '_blank') : navigate(l || '')}
        />
      </main>

      <PainelComentariosFeed
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postAuthor={post.username}
        comments={comments}
        commentText={commentText}
        onCommentTextChange={setCommentText}
        onSend={handleSendComment}
        onLike={handleCommentLike}
        onDelete={requestDeleteComment}
        onUserClick={(u) => navigate(`/user/${u.replace('@', '')}`)}
        currentUserId={currentUserId}
        replyingTo={replyingTo}
        onCancelReply={() => setReplyingTo(null)}
        onReplyClick={handleReplyClick}
        currentUserAvatar={currentUser?.avatar}
      />
    </div>
  );
};
