
import React from 'react';

const IconeBase = ({ format, color }: { format: string, color: string }) => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <rect width="100" height="120" fill={color} rx="5" />
    <text x="50" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="white">{format}</text>
  </svg>
);

export const IconeFotoPNG = () => <IconeBase format="PNG" color="#4CAF50" />;
export const IconeFotoJPG = () => <IconeBase format="JPG" color="#2196F3" />;
export const IconeFotoJPEG = () => <IconeBase format="JPEG" color="#FFC107" />;
export const IconeFotoWEBP = () => <IconeBase format="WEBP" color="#9C27B0" />;
export const IconeFotoGIF = () => <IconeBase format="GIF" color="#E91E63" />;
export const IconeFotoICO = () => <IconeBase format="ICO" color="#00BCD4" />;
export const IconeFotoRAW = () => <IconeBase format="RAW" color="#795548" />;
