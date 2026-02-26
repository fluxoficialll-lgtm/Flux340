
import React from 'react';
import { Stat } from '../../ComponentesPerfilProprio/Stat';

interface VisitorInfoCardProps {
    avatar?: string;
    nickname: string;
    username: string;
    bio: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
    isMe: boolean;
    isBlocked: boolean;
    relationStatus: 'none' | 'following' | 'requested';
    isFollowLoading: boolean;
    canMessage: boolean;
    onFollowClick: () => void;
    onMessageClick: () => void;
    onAvatarClick: () => void;
    onFollowersClick?: () => void;
    onFollowingClick?: () => void;
}

export const VisitorInfoCard: React.FC<VisitorInfoCardProps> = ({
    avatar, nickname, username, bio, stats, isMe, isBlocked,
    relationStatus, isFollowLoading, canMessage, onFollowClick, onMessageClick, onAvatarClick,
    onFollowersClick, onFollowingClick
}) => {
    if (isBlocked) return null;

    return (
        <div className="profile-card-box">
            {avatar ? (
                <img src={avatar} className="profile-avatar" onClick={onAvatarClick} alt={nickname} />
            ) : (
                <div className="profile-placeholder"><i className="fa-solid fa-user"></i></div>
            )}
            
            <span className="profile-nickname">{nickname}</span>
            <span className="profile-handle">{username}</span>
            
            <div className="profile-stats-container">
                <Stat value={stats.posts} label="Posts" />
                <Stat value={stats.followers} label="Seguidores" onClick={onFollowersClick} />
                <Stat value={stats.following} label="Seguindo" onClick={onFollowingClick} />
            </div>

            <p className="profile-bio">{bio}</p>

            {!isMe && (
                <div className="profile-actions">
                    <button 
                        id="followButton" 
                        className={relationStatus === 'following' ? 'is-following' : (relationStatus === 'requested' ? 'request-sent' : '')} 
                        onClick={onFollowClick} 
                        disabled={isFollowLoading}
                    >
                        {isFollowLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : 
                         (relationStatus === 'following' ? 'Seguindo' : 
                          (relationStatus === 'requested' ? 'Solicitado' : 'Seguir'))}
                    </button>
                    {canMessage && (
                        <button id="messageButton" onClick={onMessageClick}>
                            <i className="fa-solid fa-comment-dots mr-2"></i> Mensagem
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
