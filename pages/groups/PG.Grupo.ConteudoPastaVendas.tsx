
import React, { useState } from 'react';
import { useGroupPlatformData } from '../../hooks/useGroupPlatformData';
import { MainHeader } from '../../Componentes/layout/MainHeader';
import { Footer } from '../../Componentes/layout/Footer';
import { FaVideo, FaFileLines } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';

// Componente para o Acordeão
const AccordionItem: React.FC<{ title: string; children: React.ReactNode; isOpen: boolean; onClick: () => void }> = ({ title, children, isOpen, onClick }) => {
    return (
        <div className="border-b border-gray-700">
            <button onClick={onClick} className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 transition duration-200 flex justify-between items-center">
                <span className="font-semibold text-lg">{title}</span>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <div className="p-4 bg-gray-900">{children}</div>}
        </div>
    );
};

export const PGGrupoConteudoPastaVendas: React.FC = () => {
    const { groupData, loading, error } = useGroupPlatformData();
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggleSection = (sectionId: string) => {
        setOpenSection(openSection === sectionId ? null : sectionId);
    };

    const filteredSections = groupData?.sections?.map(section => ({
        ...section,
        folders: section.folders.map(folder => ({
            ...folder,
            channels: folder.channels.filter(channel =>
                channel.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(folder => folder.channels.length > 0)
    })).filter(section => section.folders.length > 0);


    const renderContent = () => {
        if (loading) return <div className="text-center p-10"><div className="loader"></div>Carregando...</div>;
        if (error) return <div className="text-center p-10 text-red-400">Erro ao carregar conteúdo: {error}</div>;
        if (!groupData) return <div className="text-center p-10">Nenhum dado de grupo encontrado.</div>;

        return (
            <div className="w-full max-w-5xl mx-auto px-4">
                <div 
                    className="bg-cover bg-center rounded-lg p-8 md:p-12 mb-8"
                    style={{ backgroundImage: `url(${groupData.coverImageUrl || '/path/to/default/cover.jpg'})` }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 shadow-lg">{groupData.name}</h1>
                    <p className="text-lg text-gray-200 shadow-md">{groupData.description}</p>
                </div>

                <div className="relative mb-8">
                    <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar conteúdo..."
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <main>
                    {filteredSections?.map(section => (
                        <AccordionItem 
                            key={section.id} 
                            title={section.title}
                            isOpen={openSection === section.id}
                            onClick={() => handleToggleSection(section.id)}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {section.folders.map(folder =>
                                    folder.channels.map(channel => (
                                        <div key={channel.id} className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-200 cursor-pointer flex items-center">
                                            {channel.type === 'video' 
                                                ? <FaVideo size={24} className="mr-4 text-red-500"/> 
                                                : <FaFileLines size={24} className="mr-4 text-blue-500"/>}
                                            <div className='flex flex-col'>
                                                <span className='font-bold'>{channel.name}</span>
                                                <span className='text-sm text-gray-400'>{folder.name}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </AccordionItem>
                    ))}
                </main>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white font-sans">
            <MainHeader />
            <main className="flex-grow pt-24 pb-20">
                {renderContent()}
            </main>
            <Footer />
        </div>
    );
};
