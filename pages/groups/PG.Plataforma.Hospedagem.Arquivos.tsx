
import React, { useState } from 'react';
import { useGroupPlatformData } from '../../hooks/useGroupPlatformData';
import { Footer } from '../../Componentes/layout/Footer';
import { FaVideo, FaFileLines, FaFolder } from 'react-icons/fa6';
import PastaCard from '../../Componentes/ComponentesDeGroups/Componentes/ComponentesModoHub/Card.Pasta';
import BotaoAlternadorOrganizacao from '../../Componentes/ComponentesDeGroups/Componentes/ComponentesModoHub/Botao.Alternador.Organizacao';
import BotaoCriar from '../../Componentes/ComponentesDeGroups/Componentes/ComponentesModoHub/Botao.Criar';
import CardGrupoInformacoes from '../../Componentes/ComponentesDeGroups/Componentes/ComponentesModoHub/Card.Grupo.Informacoes';
import CabecalhoNavegacao from '../../Componentes/cabeçalhos/Cabecalho.Navegacao';
import CardContainerPesquisa from '../../Componentes/ComponentesDeGroups/Componentes/ComponentesModoHub/Card.Container.Pesquisa';
import CardSessaoTitulo from '../../Componentes/ComponentesDeGroups/Componentes/ComponentesModoHub/Card.Sessao.Titulo';

type TipoVisualizacao = 'lista' | 'grade';

export const PGPlataformaHospedagemArquivos: React.FC = () => {
    const { groupData, loading, error, setGroupData } = useGroupPlatformData();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null);
    const [visualizacao, setVisualizacao] = useState<TipoVisualizacao>('grade');

    const handleFolderClick = (folder: any) => {
        setSelectedFolder(folder);
    };

    const handleBackToFolders = () => {
        setSelectedFolder(null);
    };

    const handleCriarSessao = () => {
        const title = prompt('Digite o nome da nova seção:');
        if (title && groupData) {
            const newSection = {
                id: `section${Date.now()}`,
                title,
                folders: [],
            };
            setGroupData({
                ...groupData,
                sections: [...groupData.sections, newSection],
            });
        }
    };

    const handleCriarPasta = () => {
        if (!groupData || groupData.sections.length === 0) {
            alert('Crie uma seção primeiro!');
            return;
        }

        const sectionChoices = groupData.sections.map((s, i) => `${i + 1}: ${s.title}`).join('\n');
        const sectionIndexStr = prompt(`Digite o número da seção para adicionar a pasta:\n${sectionChoices}`);
        
        if (!sectionIndexStr) return;

        const sectionIndex = parseInt(sectionIndexStr, 10) - 1;

        if (isNaN(sectionIndex) || sectionIndex < 0 || sectionIndex >= groupData.sections.length) {
            alert('Seleção de seção inválida.');
            return;
        }

        const name = prompt('Digite o nome da nova pasta:');
        if (name) {
            const newFolder = {
                id: `folder${Date.now()}`,
                name,
                channels: [],
            };

            const updatedSections = groupData.sections.map((section, index) => {
                if (index === sectionIndex) {
                    return {
                        ...section,
                        folders: [...section.folders, newFolder],
                    };
                }
                return section;
            });

            setGroupData({
                ...groupData,
                sections: updatedSections,
            });
        }
    };

    const allSections = groupData?.sections || [];
    const filteredSections = !searchTerm
        ? allSections
        : allSections
            .map(section => ({
                ...section,
                folders: section.folders.filter(folder =>
                    folder.name.toLowerCase().includes(searchTerm.toLowerCase())
                ),
            }))
            .filter(section => section.folders.length > 0);

    const renderChannelItem = (channel: any) => (
        <div key={channel.id} className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-200 cursor-pointer flex items-center ${
            visualizacao === 'lista' ? 'mb-2' : ''
        }`}>
            {channel.type === 'video' 
                ? <FaVideo size={24} className="mr-4 text-red-500"/> 
                : <FaFileLines size={24} className="mr-4 text-blue-500"/>}
            <div className='flex flex-col'>
                <span className='font-bold'>{channel.name}</span>
            </div>
        </div>
    );

    const renderFoldersView = () => (
        <div>
            {filteredSections.map(section => (
                <div key={section.id} className="mb-10">
                    <CardSessaoTitulo titulo={section.title} />
                    <div className={`${visualizacao === 'grade' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6' : 'flex flex-col gap-2'}`}>
                        {section.folders.map(folder =>
                            visualizacao === 'grade' ? (
                                <PastaCard
                                    key={folder.id}
                                    nomePasta={folder.name}
                                    onClick={() => handleFolderClick(folder)}
                                />
                            ) : (
                                <div key={folder.id} onClick={() => handleFolderClick(folder)} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-200 cursor-pointer flex items-center">
                                    <FaFolder size={24} className="mr-4 text-yellow-500"/>
                                    <span className='font-bold'>{folder.name}</span>
                                </div>
                            )
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderChannelsView = () => (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-3xl font-bold">{selectedFolder.name}</h3>
            </div>
            <div className={`${visualizacao === 'grade' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'flex flex-col gap-2'}`}>
                {selectedFolder.channels
                    .filter((channel: any) => !searchTerm || channel.name.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map(renderChannelItem)}
            </div>
        </div>
    );

    const renderContent = () => {
        if (loading) return <div className="text-center p-10 pt-[89px]"><div className="loader"></div>Carregando...</div>;
        if (error) return <div className="text-center p-10 pt-[89px] text-red-400">Erro ao carregar conteúdo: {error}</div>;
        if (!groupData) return <div className="text-center p-10 pt-[89px]">Nenhum dado de grupo encontrado.</div>;

        return (
            <div className="w-full max-w-5xl mx-auto px-4">
                 {!selectedFolder && (
                    <div className="mb-8">
                        <CardGrupoInformacoes 
                            nome={groupData.name}
                            descricao={groupData.description}
                            imagemCapaUrl={groupData.coverImageUrl}
                        />
                    </div>
                )}

                <div className="flex justify-between items-center mb-8">
                    <CardContainerPesquisa 
                        placeholder={selectedFolder ? "Buscar conteúdos..." : "Buscar pastas..."}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="ml-4">
                        <BotaoAlternadorOrganizacao visualizacaoAtual={visualizacao} onMudarVisualizacao={setVisualizacao} />
                    </div>
                </div>

                <main>
                    {selectedFolder ? renderChannelsView() : renderFoldersView()}
                </main>

                <BotaoCriar onCriarSessao={handleCriarSessao} onCriarPasta={handleCriarPasta} />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <CabecalhoNavegacao titulo={selectedFolder ? selectedFolder.name : (groupData?.name || 'Arquivos')} onBack={selectedFolder ? handleBackToFolders : undefined} />
            <main className="flex-grow pt-[85px] pb-20">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};
