
import React from 'react';

const IconeBase = ({ format, color }: { format: string, color: string }) => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <rect width="100" height="120" fill={color} rx="5" />
    <text x="50" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="white">{format}</text>
  </svg>
);

export const IconeFotoBMP = () => <IconeBase format="BMP" color="#E91E63" />;
export const IconeFotoTIFF = () => <IconeBase format="TIFF" color="#00BCD4" />;
export const IconeFotoSVG = () => <IconeBase format="SVG" color="#FF9800" />;
export const IconeFotoHEIF = () => <IconeBase format="HEIF" color="#795548" />;
