
import React from 'react';
import { User } from '../../../types/User';
import { Stat } from './Stat';
import { UserName } from '../../ComponenteDeInterfaceDeUsuario/user/UserName';
import { UserAvatar } from '../../ComponenteDeInterfaceDeUsuario/user/UserAvatar';

interface Props {
    user: User;
    postCount: number;
    isCurrentUser: boolean;
    onEdit: () => void;
    onFollow: () => void;
    onUnfollow: () => void;
    onFollowersClick: () => void;
    onFollowingClick: () => void;
    isFollowing: boolean;
}

export const ProfileInfoCard: React.FC<Props> = ({ 
    user, postCount, isCurrentUser, onEdit, onFollow, onUnfollow, onFollowersClick, onFollowingClick, isFollowing 
}) => {
    if (!user) {
        return null; // Ou um spinner de carregamento
    }

    return (
        <div className="profile-info-card">
            <div className="avatar-container">
                <UserAvatar src={user.avatar} size={80} />
            </div>
            <div className="user-details">
                <UserName username={user.username} isVerified={user.isVerified} />
                {user.bio && <p className="bio">{user.bio}</p>}
            </div>
            <div className="stats-container">
                <Stat value={postCount} label="Posts" />
                <Stat value={user.followersCount || 0} label="Seguidores" onClick={onFollowersClick} />
                <Stat value={user.followingCount || 0} label="Seguindo" onClick={onFollowingClick} />
            </div>
            <div className="profile-actions">
                {isCurrentUser ? (
                    <button onClick={onEdit} className="btn-edit">Editar Perfil</button>
                ) : (
                    isFollowing ? (
                        <button onClick={onUnfollow} className="btn-unfollow">Deixar de Seguir</button>
                    ) : (
                        <button onClick={onFollow} className="btn-follow">Seguir</button>
                    )
                )}
            </div>
        </div>
    );
};
