
import React from 'react';

// Fotos
import { IconeFotoJPG, IconeFotoPNG, IconeFotoGIF, IconeFotoWEBP, IconeFotoICO, IconeFotoRAW } from '../../../Componentes/Icones/Icones.Formato.Fotos.1';
import { IconeFotoBMP, IconeFotoTIFF, IconeFotoSVG, IconeFotoHEIF } from '../../../Componentes/Icones/Icones.Formato.Fotos.2';
import { IconeFotoPSD, IconeFotoAI } from '../../../Componentes/Icones/Icones.Formato.Fotos.3';

// Vídeos
import { IconeVideoMP4, IconeVideoAVI, IconeVideoMKV, IconeVideoMOV } from '../../../Componentes/Icones/Icones.Formato.Videos.1';
import { IconeVideoWMV, IconeVideoFLV, IconeVideoWEBM, IconeVideoMPEG } from '../../../Componentes/Icones/Icones.Formato.Videos.2';
import { IconeVideo3GP } from '../../../Componentes/Icones/Icones.Formato.Videos.3';

// Áudios
import { IconeAudioMP3, IconeAudioWAV, IconeAudioAAC, IconeAudioFLAC } from '../../../Componentes/Icones/Icones.Formato.Audios.1';
import { IconeAudioOGG, IconeAudioWMA, IconeAudioM4A, IconeAudioAMR } from '../../../Componentes/Icones/Icones.Formato.Audios.2';

// Textos
import { IconeTextoTXT, IconeTextoMD, IconeTextoHTML, IconeTextoXML } from '../../../Componentes/Icones/Icones.Formato.Textos.1';
import { IconeTextoJSON, IconeTextoCSV, IconeTextoYAML } from '../../../Componentes/Icones/Icones.Formato.Textos.2';

// Documentos
import { IconeDocumentoPDF, IconeDocumentoDOC, IconeDocumentoDOCX, IconeDocumentoODT } from '../../../Componentes/Icones/Icones.Formato.Documentos.1';
import { IconeDocumentoRTF, IconeDocumentoEPUB } from '../../../Componentes/Icones/Icones.Formato.Documentos.2';

interface IconeSimulado {
    nome: string;
    componente: React.ComponentType<any>;
}

// --- SIMULAÇÃO DE MOSTRUÁRIO DE ÍCONES DE ARQUIVO ---

export const MostruarioDeIconesSimulados: Record<string, IconeSimulado[]> = {
  fotos: [
    { nome: 'JPG', componente: IconeFotoJPG },
    { nome: 'PNG', componente: IconeFotoPNG },
    { nome: 'GIF', componente: IconeFotoGIF },
    { nome: 'WEBP', componente: IconeFotoWEBP },
    { nome: 'ICO', componente: IconeFotoICO },
    { nome: 'RAW', componente: IconeFotoRAW },
    { nome: 'BMP', componente: IconeFotoBMP },
    { nome: 'TIFF', componente: IconeFotoTIFF },
    { nome: 'SVG', componente: IconeFotoSVG },
    { nome: 'HEIF', componente: IconeFotoHEIF },
    { nome: 'PSD', componente: IconeFotoPSD },
    { nome: 'AI', componente: IconeFotoAI },
  ],
  videos: [
    { nome: 'MP4', componente: IconeVideoMP4 },
    { nome: 'AVI', componente: IconeVideoAVI },
    { nome: 'MKV', componente: IconeVideoMKV },
    { nome: 'MOV', componente: IconeVideoMOV },
    { nome: 'WMV', componente: IconeVideoWMV },
    { nome: 'FLV', componente: IconeVideoFLV },
    { nome: 'WEBM', componente: IconeVideoWEBM },
    { nome: 'MPEG', componente: IconeVideoMPEG },
    { nome: '3GP', componente: IconeVideo3GP },
  ],
  audios: [
    { nome: 'MP3', componente: IconeAudioMP3 },
    { nome: 'WAV', componente: IconeAudioWAV },
    { nome: 'AAC', componente: IconeAudioAAC },
    { nome: 'FLAC', componente: IconeAudioFLAC },
    { nome: 'OGG', componente: IconeAudioOGG },
    { nome: 'WMA', componente: IconeAudioWMA },
    { nome: 'M4A', componente: IconeAudioM4A },
    { nome: 'AMR', componente: IconeAudioAMR },
  ],
  textos: [
    { nome: 'TXT', componente: IconeTextoTXT },
    { nome: 'MD', componente: IconeTextoMD },
    { nome: 'HTML', componente: IconeTextoHTML },
    { nome: 'XML', componente: IconeTextoXML },
    { nome: 'JSON', componente: IconeTextoJSON },
    { nome: 'CSV', componente: IconeTextoCSV },
    { nome: 'YAML', componente: IconeTextoYAML },
  ],
  documentos: [
    { nome: 'PDF', componente: IconeDocumentoPDF },
    { nome: 'DOC', componente: IconeDocumentoDOC },
    { nome: 'DOCX', componente: IconeDocumentoDOCX },
    { nome: 'ODT', componente: IconeDocumentoODT },
    { nome: 'RTF', componente: IconeDocumentoRTF },
    { nome: 'EPUB', componente: IconeDocumentoEPUB },
  ],
};
