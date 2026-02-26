import React from 'react';

interface ProfileReelsGridProps {
    reels: any[];
}

export const GradeDeReelsDoPerfil: React.FC<ProfileReelsGridProps> = ({ reels }) => {
    if (!reels || reels.length === 0) {
        return <div className="no-content">Sem reels.</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-1">
            {reels.map(reel => (
                <div key={reel.id} className="aspect-w-9 aspect-h-16 bg-gray-700 rounded-lg overflow-hidden">
                    <img src={reel.thumbnail} alt="Reel thumbnail" className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    );
};
