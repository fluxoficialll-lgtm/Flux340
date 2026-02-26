import React from 'react';

import { CabecalhoPerfil } from '../Componentes/ComponentesPerfilProprio/CabecalhoPerfil';
import { CartaoDeInformacoesDoPerfil } from '../Componentes/ComponentesPerfilProprio/CartaoDeInformacoesDoPerfil';
import { NavegacaoPorAbasDoPerfil } from '../Componentes/ComponentesPerfilProprio/NavegacaoPorAbasDoPerfil';
import { GradeDeReelsDoPerfil } from '../Componentes/ComponentesPerfilProprio/GradeDeReelsDoPerfil';
import { GradeDeProdutosDoPerfil } from '../Componentes/ComponentesPerfilProprio/GradeDeProdutosDoPerfil';
import { ContainerFeed } from '../Componentes/ComponentesDeFeed/Container.Feed';
import { Footer } from '../Componentes/layout/Footer';
import { ModalListaDeSeguidores } from '../Componentes/ComponentesPerfilProprio/ModalListaDeSeguidores';
import { AvatarPreviewModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/AvatarPreviewModal';

export const Profile = () => {
    const activeTab = 'posts';

    const mockPosts = [
        { id: '1', type: 'text' },
        { id: '2', type: 'photo' },
        { id: '3', type: 'video' }
    ];

    const mockProducts = [{ id: '1', name: 'Produto 1', price: 'R$10', image: 'https://via.placeholder.com/150' }, { id: '2', name: 'Produto 2', price: 'R$20', image: 'https://via.placeholder.com/150' }];

    const mockUsers = [
        { id: '1', nickname: 'Usuário 1', username: '@usuario1', avatar: 'https://via.placeholder.com/150' },
        { id: '2', nickname: 'Usuário 2', username: '@usuario2', avatar: 'https://via.placeholder.com/150' }
    ];

    return (
        <div className="profile-page h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col overflow-hidden">

            <style>{`
                main { flex-grow: 1; overflow-y: auto; padding-top: 80px; padding-bottom: 100px; }
                .no-content { text-align: center; color: #666; padding: 30px 0; font-size: 14px; width: 100%; }
            `}</style>

            <CabecalhoPerfil />

            <main className="flex-grow w-full overflow-y-auto no-scrollbar">
                <div style={{width:'100%', maxWidth:'500px', margin:'0 auto', paddingTop:'10px', paddingBottom: '100px'}}>

                    <CartaoDeInformacoesDoPerfil 
                        avatar="https://via.placeholder.com/150"
                        nickname="Usuário"
                        username="@usuario"
                        bio="Sem biografia definida."
                        website="https://site.com"
                        stats={{
                            posts: 10,
                            followers: 100,
                            following: 50
                        }}
                    />

                    <div className="profile-tabs-container">
                        <NavegacaoPorAbasDoPerfil 
                            activeTab={activeTab}
                            setActiveTab={() => {}}
                            hasProducts={true}
                        />

                        <div className="tab-content">

                            {activeTab === 'posts' && (
                                <div className="post-list animate-fade-in px-3">
                                    {mockPosts.length > 0 ? 
                                        mockPosts.map(post => (
                                            <ContainerFeed key={post.id} post={post} />
                                        )) : <div className="no-content">Sem posts.</div>}
                                </div>
                            )}

                            {activeTab === 'products' && (
                                <GradeDeProdutosDoPerfil 
                                    products={mockProducts}
                                />
                            )}

                            {activeTab === 'fotos' && (
                                <div className="post-list animate-fade-in px-3">
                                    {mockPosts.length > 0 ? 
                                        mockPosts.map(post => (
                                            <ContainerFeed key={post.id} post={post} />
                                        )) : <div className="no-content">Sem fotos.</div>}
                                </div>
                            )}

                            {activeTab === 'reels' && (
                                <GradeDeReelsDoPerfil 
                                    reels={mockPosts}
                                />
                            )}

                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <ModalListaDeSeguidores 
                isOpen={false} 
                onClose={() => {}} 
                users={mockUsers} 
                title="Seguidores" 
            />

            <AvatarPreviewModal 
                isOpen={false}
                imageSrc=""
                username="Usuário"
            />
        </div>
    );
};