import React from 'react';

interface ProfileInfoCardProps {
    avatar: string;
    nickname: string;
    username: string;
    bio: string;
    website: string;
    stats: {
        posts: number;
        followers: number;
        following: number;
    };
}

export const CartaoDeInformacoesDoPerfil: React.FC<ProfileInfoCardProps> = ({ avatar, nickname, username, bio, website, stats }) => {
    return (
        <div className="info-card p-4 bg-gray-800 rounded-lg shadow-lg">
            <div className="flex items-center">
                <img src={avatar} alt="Avatar" className="w-20 h-20 rounded-full mr-4" />
                <div>
                    <h2 className="text-xl font-bold">{nickname}</h2>
                    <p className="text-gray-400">{username}</p>
                </div>
            </div>
            <p className="mt-4">{bio}</p>
            <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline mt-2 inline-block">{website}</a>
            <div className="flex justify-around mt-4 text-center">
                <div>
                    <p className="font-bold">{stats.posts}</p>
                    <p className="text-gray-400">Posts</p>
                </div>
                <div>
                    <p className="font-bold">{stats.followers}</p>
                    <p className="text-gray-400">Seguidores</p>
                </div>
                <div>
                    <p className="font-bold">{stats.following}</p>
                    <p className="text-gray-400">Seguindo</p>
                </div>
            </div>
        </div>
    );
};
