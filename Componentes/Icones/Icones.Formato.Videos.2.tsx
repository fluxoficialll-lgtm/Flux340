
import React from 'react';

const IconeBase = ({ format, color }: { format: string, color: string }) => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <rect width="100" height="120" fill={color} rx="5" />
    <text x="50" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="white">{format}</text>
  </svg>
);

export const IconeVideoWMV = () => <IconeBase format="WMV" color="#673AB7" />;
export const IconeVideoFLV = () => <IconeBase format="FLV" color="#CDDC39" />;
export const IconeVideoWEBM = () => <IconeBase format="WEBM" color="#03A9F4" />;
export const IconeVideoMPEG = () => <IconeBase format="MPEG" color="#FFEB3B" />;
