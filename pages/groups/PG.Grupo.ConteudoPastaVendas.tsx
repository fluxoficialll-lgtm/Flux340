
import React, { useState } from 'react';
import { useGroupPlatformData } from '../../hooks/useGroupPlatformData';
import { MainHeader } from '../../Componentes/layout/MainHeader';
import { Footer } from '../../Componentes/layout/Footer';
import { FaVideo, FaFileLines } from 'react-icons/fa6';

// Componente para o Acordeão
const AccordionItem: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-700">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 transition duration-200 flex justify-between items-center">
                <span className="font-semibold">{title}</span>
                <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && <div className="p-4 bg-gray-900">{children}</div>}
        </div>
    );
};

export const PGGrupoConteudoPastaVendas: React.FC = () => {
  const { groupData, loading, error } = useGroupPlatformData();

  const renderContent = () => {
    if (loading) return <div className="text-center p-10">Carregando conteúdo...</div>;
    if (error) return <div className="text-center p-10 text-red-500">Erro: {error}</div>;
    if (!groupData) return <div className="text-center p-10">Nenhum dado encontrado.</div>;

    return (
      <div className="p-4 md:p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{groupData.name}</h1>
          <p className="text-md text-gray-400">{groupData.description}</p>
        </header>

        <main>
          {groupData.sections?.map(section => (
            <AccordionItem key={section.id} title={section.title}>
              {section.folders.map(folder => (
                <div key={folder.id} className="mb-3">
                  <h3 className="font-bold text-lg mb-2 text-cyan-400">{folder.name}</h3>
                  <ul>
                    {folder.channels.map(channel => (
                      <li key={channel.id} className="flex items-center p-2 hover:bg-gray-800 rounded-md cursor-pointer">
                        {channel.type === 'video' ? <FaVideo className="mr-3 text-red-500"/> : <FaFileLines className="mr-3 text-blue-500"/>}
                        <span>{channel.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </AccordionItem>
          ))}
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <MainHeader />
      <main className="flex-grow pt-20 pb-20">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};
