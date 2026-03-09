
import React from 'react';

const IconeBase = ({ format, color }: { format: string, color: string }) => (
  <svg width="100" height="120" viewBox="0 0 100 120">
    <rect width="100" height="120" fill={color} rx="5" />
    <text x="50" y="60" textAnchor="middle" dy=".3em" fontSize="20" fontWeight="bold" fill="white">{format}</text>
  </svg>
);

export const IconeVideoMP4 = () => <IconeBase format="MP4" color="#F44336" />;
export const IconeVideoAVI = () => <IconeBase format="AVI" color="#3F51B5" />;
export const IconeVideoMKV = () => <IconeBase format="MKV" color="#009688" />;
export const IconeVideoMOV = () => <IconeBase format="MOV" color="#FF5722" />;
