
import React from 'react';
import { Post } from '../../types/Post';
import { PostHeader } from './PostHeader';
import { PostText } from './PostText';
import { PollPost } from './PollPost';
import { PostActions } from './PostActions';
import { LazyMedia } from '../ComponenteDeInterfaceDeUsuario/LazyMedia';

interface Props {
    post: Post;
    currentUserId?: string;
    onLike: (postId: string) => void;
    onDelete: (postId: string, e: React.MouseEvent) => void;
    onUserClick: (username: string) => void;
    onCommentClick: (postId: string) => void;
    onShare: (post: Post) => void;
    onVote: (postId: string, optionId: number) => void;
    onCtaClick?: (link?: string) => void;
}

export const ContainerFeed: React.FC<Props> = React.memo(({ 
    post, currentUserId, onLike, onDelete, onUserClick, onCommentClick, onShare, onVote, onCtaClick 
}) => {
    
    const isOwner = post.authorId === currentUserId;
    const userHasVoted = post.poll?.options.some(o => o.voters.includes(currentUserId || ''));
    
    // Simplificando a verificação se o usuário curtiu o post.
    const userHasLiked = post.likedBy?.includes(currentUserId || '') || false;

    const handleMediaClick = () => {
        // Navega para a página de detalhes ao clicar na mídia do post
        onCommentClick(post.id);
    };

    return (
        <div className="feed-item bg-[#1a1e26] rounded-xl shadow-lg mb-4 overflow-hidden" id={`post-${post.id}`}>
            <PostHeader 
                post={post} 
                isOwner={isOwner} 
                onDelete={(e) => onDelete(post.id, e)} 
                onUserClick={() => onUserClick(post.author.username)} 
            />

            <div className="post-content" onClick={handleMediaClick}>
                <PostText text={post.text} />
                
                {post.mediaUrl && (
                    <div className="media-container cursor-pointer">
                        <LazyMedia 
                            src={post.mediaUrl}
                            alt="Post media"
                            mediaType={post.mediaType}
                        />
                    </div>
                )}
                
                {post.type === 'poll' && post.poll && (
                    <PollPost 
                        poll={post.poll} 
                        onVote={(optionId) => onVote(post.id, optionId)} 
                        userHasVoted={userHasVoted} 
                        currentUserId={currentUserId}
                    />
                )}
            </div>

            <PostActions 
                likes={post.likes}
                comments={post.commentsCount}
                views={post.views || 0}
                liked={userHasLiked}
                onLike={() => onLike(post.id)}
                onCommentClick={() => onCommentClick(post.id)}
                onShare={() => onShare(post)}
            />
        </div>
    );
});
