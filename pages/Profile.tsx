
import React, { useState } from 'react';

import { CabecalhoPerfil } from '../Componentes/ComponentesPerfilProprio/CabecalhoPerfil';
import { CartaoDeInformacoesDoPerfil } from '../Componentes/ComponentesPerfilProprio/CartaoDeInformacoesDoPerfil';
import { CardCategoriasPerfil } from '../Componentes/ComponentesPerfilProprio/Card.Categorias.Perfil';
import { Footer } from '../Componentes/layout/Footer';
import { ModalListaDeSeguidores } from '../Componentes/ComponentesPerfilProprio/ModalListaDeSeguidores';
import { AvatarPreviewModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/AvatarPreviewModal';

// Importando as novas grades padronizadas
import { GradeDePostagens } from '../Componentes/ComponentesPerfilProprio/Grade.Postagens';
import { GradeDeProdutos } from '../Componentes/ComponentesPerfilProprio/Grade.Produtos';
import { GradeDeFotos } from '../Componentes/ComponentesPerfilProprio/Grade.Fotos';
import { GradeDeReels } from '../Componentes/ComponentesPerfilProprio/Grade.Reels';

export const Profile = () => {
    // 1. Estado dinâmico para a aba ativa
    const [activeTab, setActiveTab] = useState('posts');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalUsers, setModalUsers] = useState([]);

    // 2. Dados mock mais completos para cada grade
    const mockPosts = [
        { id: '1', type: 'photo', src: 'https://source.unsplash.com/random/500x500?sig=1' },
        { id: '2', type: 'video', thumbnail: 'https://source.unsplash.com/random/500x500?sig=2' },
        { id: '3', type: 'text', content: 'Este é um exemplo de um post apenas com texto, mostrando como ele pode aparecer na grade.' },
        { id: '4', type: 'photo', src: 'https://source.unsplash.com/random/500x500?sig=3' },
        { id: '5', type: 'photo', src: 'https://source.unsplash.com/random/500x500?sig=4' },
        { id: '6', type: 'video', thumbnail: 'https://source.unsplash.com/random/500x500?sig=5' },
    ];

    const mockProducts = [
        { id: '1', name: 'Produto Incrível', price: 'R$ 99,90', image: 'https://source.unsplash.com/random/400x400?sig=10' },
        { id: '2', name: 'Item Fantástico', price: 'R$ 149,00', image: 'https://source.unsplash.com/random/400x400?sig=11' },
        { id: '3', name: 'Super Gadget', price: 'R$ 299,90', image: 'https://source.unsplash.com/random/400x400?sig=12' },
    ];

    const mockPhotos = [
        { id: '1', src: 'https://source.unsplash.com/random/500x500?sig=20' },
        { id: '2', src: 'https://source.unsplash.com/random/500x500?sig=21' },
        { id: '3', src: 'https://source.unsplash.com/random/500x500?sig=22' },
        { id: '4', src: 'https://source.unsplash.com/random/500x500?sig=23' },
        { id: '5', src: 'https://source.unsplash.com/random/500x500?sig=24' },
    ];

    const mockReels = [
        { id: '1', thumbnail: 'https://source.unsplash.com/random/270x480?sig=30' },
        { id: '2', thumbnail: 'https://source.unsplash.com/random/270x480?sig=31' },
        { id: '3', thumbnail: 'https://source.unsplash.com/random/270x480?sig=32' },
        { id: '4', thumbnail: 'https://source.unsplash.com/random/270x480?sig=33' },
    ];

    const mockFollowers = [{ id: '1', nickname: 'Seguidor 1', username: '@seguidor1', avatar: 'https://via.placeholder.com/150' }];
    const mockFollowing = [{ id: '1', nickname: 'Seguindo 1', username: '@seguindo1', avatar: 'https://via.placeholder.com/150' }];

    const handleFollowersClick = () => {
        setModalTitle('Seguidores');
        setModalUsers(mockFollowers);
        setIsModalOpen(true);
    };

    const handleFollowingClick = () => {
        setModalTitle('Seguindo');
        setModalUsers(mockFollowing);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <div className="h-[100dvh] bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">

            <style>{`
                main { flex-grow: 1; overflow-y: auto; padding-top: 80px; padding-bottom: 100px; }
                .no-content { text-align: center; color: #666; padding: 30px 0; font-size: 14px; width: 100%; }
            `}</style>

            <CabecalhoPerfil />

            <main className="flex-grow w-full overflow-y-auto no-scrollbar">
                <div style={{width:'100%', maxWidth:'500px', margin:'0 auto', paddingTop:'10px'}}>
                    <CartaoDeInformacoesDoPerfil 
                        avatar="https://source.unsplash.com/random/150x150"
                        nickname="Usuário Padrão"
                        username="@usuario.padrao"
                        bio="Explorando o mundo, um pixel de cada vez."
                        website="https://meusite.com"
                        stats={{ posts: mockPosts.length, followers: 134, following: 89 }}
                        onFollowersClick={handleFollowersClick}
                        onFollowingClick={handleFollowingClick}
                    />
                </div>

                <div className="profile-tabs-container mt-4">
                    {/* 3. Passando a função para o componente de categorias */}
                    <CardCategoriasPerfil 
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        hasProducts={mockProducts.length > 0}
                    />
                </div>

                <div style={{width:'100%', maxWidth:'500px', margin:'0 auto', paddingBottom: '100px'}}>
                    {/* 4. Renderização condicional da grade correta */}
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
                onClose={handleCloseModal} 
                users={modalUsers} 
                title={modalTitle} 
            />

            <AvatarPreviewModal isOpen={false} imageSrc="" username="Usuário" />
        </div>
    );
};
