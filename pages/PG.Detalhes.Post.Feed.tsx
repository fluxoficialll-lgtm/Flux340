
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ContainerFeed } from '../Componentes/ComponentesDeFeed/Container.Feed';
import { Post, Comment, ReplyingTo } from '../types';
import { ComentarioItem } from '../Componentes/ComponenteDeInterfaceDeUsuario/comments/Card.Comentario.Feed';

export const PGDetalhesPostFeed: React.FC = () => {
  const navigate = useNavigate();
  const [commentText, setCommentText] = useState('');
  const [replyingTo, setReplyingTo] = useState<ReplyingTo | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock Data
  const post: Post = {
    id: '1',
    authorId: 'user1',
    author: {
        username: 'flux',
        avatarUrl: 'https://placehold.co/40x40/00c2ff/white?text=F',
    },
    text: 'Este é um post estático de exemplo. Os comentários agora estão integrados diretamente na página para uma melhor experiência do usuário.',
    mediaUrl: 'https://via.placeholder.com/500x300',
    mediaType: 'image',
    likes: 120,
    commentsCount: 2,
    views: 1500,
    likedBy: [],
    timestamp: new Date(),
    type: 'post',
  };

  const mockComments: Comment[] = [
    {
        id: 'c1', userId: 'user2', username: 'beatriz_design', 
        text: 'Uau, que edição incrível! Qual software usaste?',
        timestamp: Date.now() - 1000 * 60 * 5,
        likes: 15, avatar: 'https://placehold.co/40x40/ff6600/white?text=B', 
        replies: [
            {
                id: 'c3', userId: 'user1', username: 'flux_creative', 
                text: 'Obrigado! Usei o DaVinci Resolve para a cor e o Premiere Pro para a montagem.',
                timestamp: Date.now() - 1000 * 60 * 3,
                likes: 8, avatar: 'https://placehold.co/40x40/00c2ff/white?text=F',
                replyToUsername: 'beatriz_design'
            }
        ]
    },
    {
        id: 'c2', userId: 'user3', username: 'ricardo_fotografia', 
        text: 'A transição aos 0:05 ficou muito suave. Grande trabalho!',
        timestamp: Date.now() - 1000 * 60 * 10,
        likes: 4, avatar: 'https://placehold.co/40x40/33cc33/white?text=R'
    },
];

  // Action Handlers
  const handleAction = () => {}; // Generic no-op for most actions

  const handleReplyClick = (commentId: string, username: string) => {
    setReplyingTo({ commentId, username });
    inputRef.current?.focus();
  };

  useEffect(() => {
    // Scroll to comments section if navigating with a hash
    if (window.location.hash === '#comments') {
      document.getElementById('comments-section')?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col font-['Inter'] bg-[#0c0f14] text-white">
      <header className="flex items-center justify-between p-4 bg-[#0c0f14]/80 backdrop-blur-lg fixed w-full top-0 z-40 border-b border-white/10 h-[65px]">
        <button onClick={() => navigate('/feed')} className="text-[#00c2ff] text-xl p-2 hover:bg-white/5 rounded-full transition-all">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <span className="text-xs font-black uppercase tracking-[2px]">Publicação</span>
        <div className="w-10"></div>
      </header>

      {/* Add pb to avoid content being hidden by the fixed footer */}
      <main className="pt-[65px] pb-[100px] w-full max-w-[500px] mx-auto flex-grow overflow-y-auto no-scrollbar">
        <div className="px-3">
          <ContainerFeed 
              post={post} 
              onLike={handleAction}
              onDelete={handleAction}
              onUserClick={handleAction}
              onCommentClick={() => document.getElementById('comment-input')?.focus() }
              onShare={handleAction}
              onVote={handleAction}
          />
        </div>

        <div id="comments-section" className="mt-4 border-t border-white/10 pt-4 px-3">
            <h3 className="font-bold text-sm mb-4 px-1 text-gray-400 uppercase tracking-wider">Comentários</h3>
            {mockComments.length > 0 ? (
                mockComments.map(comment => (
                    <ComentarioItem 
                        key={comment.id} 
                        comment={comment} 
                        onReplyClick={handleReplyClick}
                        onLike={handleAction}
                        onDelete={handleAction}
                        onUserClick={handleAction}
                        currentUserId="static_user"
                    />
                ))
            ) : (
                <div className="text-center text-gray-500 py-10">
                    <p className="font-bold">Sem comentários ainda</p>
                    <p className="text-xs">Seja o primeiro a comentar!</p>
                </div>
            )}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 w-full max-w-[500px] mx-auto bg-[#0c0f14] p-3 border-t border-white/10 space-y-2 z-40">
        {replyingTo && (
            <div className="text-xs text-gray-400 flex justify-between items-center px-2">
                <span>Respondendo a <span className="text-[#00c2ff]">@{replyingTo.username}</span></span>
                <button onClick={() => setReplyingTo(null)} className="font-bold hover:text-white">Cancelar</button>
            </div>
        )}
        <div className="flex items-center gap-2">
            <img src={post.author.avatarUrl} alt="avatar" className="w-8 h-8 rounded-full" />
            <input
                id="comment-input"
                ref={inputRef}
                type="text"
                placeholder="Adicionar um comentário..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAction()}
                className="w-full bg-black h-10 rounded-full text-white text-sm px-4 outline-none focus:ring-2 focus:ring-[#00c2ff]/50 border border-white/10"
            />
            <button onClick={handleAction} className="text-[#00c2ff] text-sm font-bold hover:text-white disabled:opacity-50" disabled={!commentText.trim()}>Publicar</button>
        </div>
      </footer>
    </div>
  );
};
