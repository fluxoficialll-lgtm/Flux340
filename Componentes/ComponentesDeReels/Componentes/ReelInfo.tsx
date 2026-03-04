
import React from 'react';
import { ReelAuthor, ReelMusic } from '../../../tipos/index'; // Ajuste para os novos tipos de simulação
import { UserBadge } from '../../ComponenteDeInterfaceDeUsuario/user/UserBadge';
import { AvatarPreviewModal } from '../../ComponenteDeInterfaceDeUsuario/AvatarPreviewModal';

interface ReelInfoProps {
    author: ReelAuthor;
    description: string;
    music: ReelMusic;
    // Adicione outras props conforme necessário
}

export const ReelInfo: React.FC<ReelInfoProps> = ({ 
    author, description, music 
}) => {
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);

    const handleAvatarClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (author.avatar) {
            setIsPreviewOpen(true);
        } else {
            // Lógica de clique de usuário se não houver avatar
            console.log('Clicou no usuário sem avatar:', author.handle);
        }
    };

    // Simplificamos a renderização para focar na simulação
    return (
        <div className="reel-info-overlay absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent z-10 text-white">
             <style>{`
                .reel-info-overlay {
                    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
                }
                .author-line {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 8px;
                }
                .author-name {
                    font-weight: 700;
                    font-size: 1rem; /* 16px */
                }
                .reel-description {
                    font-size: 0.875rem; /* 14px */
                    line-height: 1.4;
                    margin-bottom: 8px;
                }
                .reel-music {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.875rem; /* 14px */
                    font-weight: 500;
                }
             `}</style>
            {/* Linha do Autor */}
            <div className="author-line">
                <UserBadge 
                    avatarUrl={author.avatar}
                    nickname={author.name}
                    handle={author.handle}
                    avatarSize="sm"
                    showHandle={false} // Apenas o nome é suficiente aqui
                    onAvatarClick={handleAvatarClick}
                />
            </div>

            {/* Descrição e Música */}
            <p className="reel-description">{description}</p>
            <div className="reel-music">
                <i className="fa-solid fa-music"></i>
                <span>{music.title}</span>
            </div>

            <AvatarPreviewModal 
                isOpen={isPreviewOpen} 
                onClose={() => setIsPreviewOpen(false)} 
                imageSrc={author.avatar || ''} 
                username={author.name} 
            />
        </div>
    );
};
