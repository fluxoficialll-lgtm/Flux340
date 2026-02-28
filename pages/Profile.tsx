
import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // Importa o hook para ler parâmetros da URL

import { useUserProfile } from '../hooks/useUserProfile'; // Nosso novo hook

import { CabecalhoPerfil } from '../Componentes/ComponentesPerfilProprio/CabecalhoPerfil';
import { CartaoDeInformacoesDoPerfil } from '../Componentes/ComponentesPerfilProprio/CartaoDeInformacoesDoPerfil';
import { CardCategoriasPerfil } from '../Componentes/ComponentesPerfilProprio/Card.Categorias.Perfil';
import { Footer } from '../Componentes/layout/Footer';
import { ModalListaDeSeguidores } from '../Componentes/ComponentesPerfilProprio/ModalListaDeSeguidores';
import { AvatarPreviewModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/AvatarPreviewModal';
import { LoadingScreen } from '../Componentes/ComponenteDeInterfaceDeUsuario/LoadingScreen'; // Um componente de loading

// Importando as grades
import { GradeDePostagens } from '../Componentes/ComponentesPerfilProprio/Grade.Postagens';
import { GradeDeProdutos } from '../Componentes/ComponentesPerfilProprio/Grade.Produtos';
import { GradeDeFotos } from '../Componentes/ComponentesPerfilProprio/Grade.Fotos';
import { GradeDeReels } from '../Componentes/ComponentesPerfilProprio/Grade.Reels';

export const Profile = () => {
    const { id: userId } = useParams<{ id: string }>(); // Pega o ID do usuário da URL
    const { profile, isLoading, error, handleFollow } = useUserProfile(userId);

    const [activeTab, setActiveTab] = useState('posts');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalUsers, setModalUsers] = useState([]);

    // Dados mock para as grades, pois o foco era o cartão de perfil
    const mockPosts = [{ id: '1', type: 'photo', src: 'https://source.unsplash.com/random/500x500?sig=1' }];
    const mockProducts = [{ id: '1', name: 'Produto', price: 'R$ 99', image: 'https://source.unsplash.com/random/400x400?sig=10' }];
    const mockPhotos = [{ id: '1', src: 'https://source.unsplash.com/random/500x500?sig=20' }];
    const mockReels = [{ id: '1', thumbnail: 'https://source.unsplash.com/random/270x480?sig=30' }];

    const handleFollowersClick = () => {
        // TODO: Buscar a lista real de seguidores
        setModalTitle('Seguidores');
        setModalUsers([]); 
        setIsModalOpen(true);
    };

    const handleFollowingClick = () => {
        // TODO: Buscar a lista real de quem o usuário segue
        setModalTitle('Seguindo');
        setModalUsers([]);
        setIsModalOpen(true);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <p>Erro ao carregar o perfil: {error}</p>
            </div>
        );
    }

    if (!profile) {
        return (
            <div className="flex items-center justify-center h-screen bg-black text-white">
                <p>Perfil não encontrado.</p>
            </div>
        );
    }

    return (
        <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">
            <style>{`
                main { flex-grow: 1; overflow-y: auto; padding-top: 80px; padding-bottom: 100px; }
            `}</style>

            <CabecalhoPerfil username={profile.nickname} />

            <main className="flex-grow w-full overflow-y-auto no-scrollbar">
                <div style={{width:'100%', maxWidth:'500px', margin:'0 auto', paddingTop:'10px'}}>
                    <CartaoDeInformacoesDoPerfil 
                        avatar={profile.avatar}
                        nickname={profile.nickname}
                        username={`@${profile.username}`}
                        bio={profile.bio}
                        website={profile.website}
                        stats={profile.stats}
                        isFollowing={profile.isFollowing}
                        onFollowClick={handleFollow}
                        onFollowersClick={handleFollowersClick}
                        onFollowingClick={handleFollowingClick}
                        // TODO: Conectar a funcionalidade de ver o avatar
                        onAvatarClick={() => {}}
                    />
                </div>

                <div className="profile-tabs-container mt-4">
                    <CardCategoriasPerfil 
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        hasProducts={mockProducts.length > 0}
                    />
                </div>

                <div style={{width:'100%', maxWidth:'500px', margin:'0 auto', paddingBottom: '100px'}}>
                    <div className="tab-content mt-4">
                        {activeTab === 'posts' && <GradeDePostagens posts={mockPosts} />}
                        {activeTab === 'products' && <GradeDeProdutos products={mockProducts} />}
                        {activeTab === 'fotos' && <GradeDeFotos photos={mockPhotos} />}
                        {activeTab === 'reels' && <GradeDeReels reels={mockReels} />}
                    </div>
                </div>
            </main>

            <Footer />

            <ModalListaDeSeguidores 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                users={modalUsers} 
                title={modalTitle} 
            />

            {/* TODO: Conectar o modal de preview do avatar */}
            <AvatarPreviewModal isOpen={false} imageSrc="" username="" />
        </div>
    );
};
