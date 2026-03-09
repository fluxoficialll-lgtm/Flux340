import React from 'react';
import IconeArquivoMP4 from '../../../Icones/Icone.ArquivoMP4';
import IconeArquivoTXT from '../../../Icones/Icone.ArquivoTXT';
import IconeArquivoFotos from '../../../Icones/Icone.Arquivo.Fotos';

interface CanalItemProps {
    channel: { id: string; name: string; };
    visualizacao: 'lista' | 'grade';
}

const CanalItem: React.FC<CanalItemProps> = ({ channel, visualizacao }) => {
    
    const getIcon = () => {
        const nomeLower = channel.name.toLowerCase();
        if (nomeLower.includes('vídeo') || nomeLower.includes('mp4')) {
            return <IconeArquivoMP4 />;
        }
        if (nomeLower.includes('texto') || nomeLower.includes('txt')) {
            return <IconeArquivoTXT />;
        }
        // Torna o ícone de fotos o padrão para garantir que 3 ícones sejam exibidos
        return <IconeArquivoFotos />;
    };

    return (
        <div className={`bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-all duration-200 cursor-pointer flex items-center ${
            visualizacao === 'lista' ? 'mb-2' : ''
        }`}>
            <div className="mr-4">
                {getIcon()}
            </div>
            <div className='flex flex-col'>
                <span className='font-bold'>{channel.name}</span>
            </div>
        </div>
    );
};

export default CanalItem;
