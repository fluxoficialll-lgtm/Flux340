
import React from 'react';

const IconeBase = ({ format, color }: { format: string, color: string }) => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <rect width="100" height="120" fill={color} rx="5" />
    <text x="50" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="white">{format}</text>
  </svg>
);

export const IconeFotoHEIC = () => <IconeBase format="HEIC" color="#607D8B" />;
export const IconeFotoAI = () => <IconeBase format="AI" color="#FF9800" />;
export const IconeFotoPSD = () => <IconeBase format="PSD" color="#2196F3" />;
