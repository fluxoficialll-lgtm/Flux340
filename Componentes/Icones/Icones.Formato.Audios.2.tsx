
import React from 'react';

const IconeBase = ({ format, color }: { format: string, color: string }) => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <rect width="100" height="120" fill={color} rx="5" />
    <text x="50" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="white">{format}</text>
  </svg>
);

export const IconeAudioOGG = () => <IconeBase format="OGG" color="#F57C00" />;
export const IconeAudioWMA = () => <IconeBase format="WMA" color="#0091EA" />;
export const IconeAudioM4A = () => <IconeBase format="M4A" color="#FFD600" />;
export const IconeAudioAMR = () => <IconeBase format="AMR" color="#76FF03" />;
