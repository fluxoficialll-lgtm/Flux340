
import React from 'react';

// Importando todos os ícones de formatos de foto
import { IconeFotoJPG, IconeFotoPNG, IconeFotoGIF, IconeFotoWEBP, IconeFotoICO, IconeFotoRAW } from './Icones.Formato.Fotos.1';
import { IconeFotoBMP, IconeFotoTIFF, IconeFotoSVG, IconeFotoHEIF } from './Icones.Formato.Fotos.2';
import { IconeFotoPSD, IconeFotoAI } from './Icones.Formato.Fotos.3';

// Importando todos os ícones de formatos de vídeo
import { IconeVideoMP4, IconeVideoAVI, IconeVideoMKV, IconeVideoMOV } from './Icones.Formato.Videos.1';
import { IconeVideoWMV, IconeVideoFLV, IconeVideoWEBM, IconeVideoMPEG } from './Icones.Formato.Videos.2';
import { IconeVideo3GP } from './Icones.Formato.Videos.3';

// Importando todos os ícones de formatos de áudio
import { IconeAudioMP3, IconeAudioWAV, IconeAudioAAC, IconeAudioFLAC } from './Icones.Formato.Audios.1';
import { IconeAudioOGG, IconeAudioWMA, IconeAudioM4A, IconeAudioAMR } from './Icones.Formato.Audios.2';

// Importando todos os ícones de formatos de texto
import { IconeTextoTXT, IconeTextoMD, IconeTextoHTML, IconeTextoXML } from './Icones.Formato.Textos.1';
import { IconeTextoJSON, IconeTextoCSV, IconeTextoYAML } from './Icones.Formato.Textos.2';

// Importando todos os ícones de formatos de documento
import { IconeDocumentoPDF, IconeDocumentoDOC, IconeDocumentoDOCX, IconeDocumentoODT } from './Icones.Formato.Documentos.1';
import { IconeDocumentoRTF, IconeDocumentoEPUB } from './Icones.Formato.Documentos.2';

// Um ícone padrão para tipos de arquivo não reconhecidos
import { FaFile } from 'react-icons/fa';

const IconeSeletor = ({ nomeArquivo }: { nomeArquivo: string }) => {
    const extensao = nomeArquivo.split('.').pop()?.toUpperCase();

    switch (extensao) {
        // Fotos
        case 'JPG':
        case 'JPEG':
            return <IconeFotoJPG />;
        case 'PNG':
            return <IconeFotoPNG />;
        case 'GIF':
            return <IconeFotoGIF />;
        case 'BMP':
            return <IconeFotoBMP />;
        case 'WEBP':
            return <IconeFotoWEBP />;
        case 'SVG':
            return <IconeFotoSVG />;
        case 'ICO':
            return <IconeFotoICO />;
        case 'TIFF':
            return <IconeFotoTIFF />;
        case 'RAW':
            return <IconeFotoRAW />;
        case 'HEIF':
            return <IconeFotoHEIF />;
        case 'PSD':
            return <IconeFotoPSD />;
        case 'AI':
            return <IconeFotoAI />;

        // Vídeos
        case 'MP4':
            return <IconeVideoMP4 />;
        case 'AVI':
            return <IconeVideoAVI />;
        case 'MKV':
            return <IconeVideoMKV />;
        case 'MOV':
            return <IconeVideoMOV />;
        case 'WMV':
            return <IconeVideoWMV />;
        case 'FLV':
            return <IconeVideoFLV />;
        case 'WEBM':
            return <IconeVideoWEBM />;
        case 'MPEG':
            return <IconeVideoMPEG />;
        case '3GP':
            return <IconeVideo3GP />;

        // Áudios
        case 'MP3':
            return <IconeAudioMP3 />;
        case 'WAV':
            return <IconeAudioWAV />;
        case 'AAC':
            return <IconeAudioAAC />;
        case 'FLAC':
            return <IconeAudioFLAC />;
        case 'OGG':
            return <IconeAudioOGG />;
        case 'WMA':
            return <IconeAudioWMA />;
        case 'M4A':
            return <IconeAudioM4A />;
        case 'AMR':
            return <IconeAudioAMR />;

        // Textos
        case 'TXT':
            return <IconeTextoTXT />;
        case 'MD':
            return <IconeTextoMD />;
        case 'HTML':
            return <IconeTextoHTML />;
        case 'XML':
            return <IconeTextoXML />;
        case 'JSON':
            return <IconeTextoJSON />;
        case 'CSV':
            return <IconeTextoCSV />;
        case 'YAML':
            return <IconeTextoYAML />;

        // Documentos
        case 'PDF':
            return <IconeDocumentoPDF />;
        case 'DOC':
            return <IconeDocumentoDOC />;
        case 'DOCX':
            return <IconeDocumentoDOCX />;
        case 'ODT':
            return <IconeDocumentoODT />;
        case 'RTF':
            return <IconeDocumentoRTF />;
        case 'EPUB':
            return <IconeDocumentoEPUB />;

        default:
            return <FaFile size={48} className="text-gray-500" />;
    }
};

export default IconeSeletor;
