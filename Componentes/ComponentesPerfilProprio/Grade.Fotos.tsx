
import React from 'react';

interface Photo {
    id: string;
    src: string;
}

interface PhotoGridProps {
    photos: Photo[];
    onPhotoClick: (photo: Photo) => void; // Adicionando a prop de clique
}

export const GradeDeFotos: React.FC<PhotoGridProps> = ({ photos, onPhotoClick }) => {
    if (!photos || photos.length === 0) {
        return <div className="no-content">Sem fotos para exibir.</div>;
    }

    return (
        <div className="grid grid-cols-3 gap-1">
            {photos.map((photo) => (
                <div 
                    key={photo.id} 
                    className="aspect-square bg-gray-800 cursor-pointer" 
                    onClick={() => onPhotoClick(photo)} // Adicionando o evento de clique
                >
                    <img 
                        src={photo.src} 
                        alt={`Foto ${photo.id}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                </div>
            ))}
        </div>
    );
};
