
import React from 'react';

interface Reel {
    id: string;
    thumbnail: string;
}

interface ReelsGridProps {
    reels: Reel[];
    onReelClick: (reel: Reel) => void; // Adicionando a prop de clique
}

export const GradeDeReels: React.FC<ReelsGridProps> = ({ reels, onReelClick }) => {
    if (!reels || reels.length === 0) {
        return <div className="no-content">Sem reels para exibir.</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-1">
            {reels.map((reel) => (
                <div 
                    key={reel.id}
                    className="aspect-[9/16] bg-gray-800 cursor-pointer relative"
                    onClick={() => onReelClick(reel)} // Adicionando o evento de clique
                >
                    <img 
                        src={reel.thumbnail} 
                        alt={`Reel ${reel.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute bottom-1 left-1 text-white text-xs">
                        <i className="fa-solid fa-play mr-1"></i>
                        {/* Adicionar contador de visualizações se disponível */}
                    </div>
                </div>
            ))}
        </div>
    );
};
