
import React, { useState } from 'react';
import { Reel } from '../../../tipos/index';
import { ReelPlayer } from './ReelPlayer';
import { ReelActions } from './ReelActions';
import { ReelInfo } from './ReelInfo';

interface ReelItemProps {
    reel: Reel;
    isActive: boolean;
    isOwner: boolean;
    onLike: () => void;
    onComment: () => void;
    onShare: () => void;
}

export const ReelItem: React.FC<ReelItemProps> = ({ 
    reel, isActive, isOwner, onLike, onComment, onShare 
}) => {
    const [isMuted, setIsMuted] = useState(!isActive);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsMuted(!isMuted);
    };
    
    return (
        <div className="reel relative w-full h-full bg-black flex justify-center items-center">
            {/* CORREÇÃO: Passando o objeto reel completo novamente */}
            <ReelPlayer 
                reel={reel}
                isActive={isActive}
                isMuted={isMuted}
                onToggleMute={toggleMute}
                reportWatchTime={() => {}} // Função vazia para evitar erros
                onVideoClick={toggleMute} // Simplificado para alternar mudo
            />

            <ReelActions 
                reel={reel}
                isOwner={isOwner}
                isMuted={isMuted}
                onLike={onLike}
                onComment={onComment}
                onShare={onShare}
                onToggleMute={toggleMute}
            />

            <ReelInfo 
                author={reel.author}
                description={reel.description}
                music={reel.music}
            />
        </div>
    );
};
