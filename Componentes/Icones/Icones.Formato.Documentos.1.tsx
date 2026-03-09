
import React from 'react';

const IconeBase = ({ format, color }: { format: string, color: string }) => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <rect width="100" height="120" fill={color} rx="5" />
    <text x="50" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="white">{format}</text>
  </svg>
);

export const IconeDocumentoPDF = () => <IconeBase format="PDF" color="#B71C1C" />;
export const IconeDocumentoDOC = () => <IconeBase format="DOC" color="#1A237E" />;
export const IconeDocumentoDOCX = () => <IconeBase format="DOCX" color="#0D47A1" />;
export const IconeDocumentoODT = () => <IconeBase format="ODT" color="#006064" />;
