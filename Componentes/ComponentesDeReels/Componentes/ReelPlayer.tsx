
import React, { useRef, useState, useEffect } from 'react';
import { Reel } from '../../../tipos/index'; // Usando o tipo Reel da simulação

interface ReelPlayerProps {
    reel: Reel;
    isActive: boolean;
    isMuted: boolean;
    onToggleMute: (e: React.MouseEvent) => void;
    // Funções de relatório e clique não são críticas para a simulação inicial
    reportWatchTime: (id: string) => void;
    onVideoClick: () => void;
}

export const ReelPlayer: React.FC<ReelPlayerProps> = ({ 
    reel, isActive, isMuted, onToggleMute, onVideoClick 
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);
    const [hasError, setHasError] = useState(false);

    // CORREÇÃO: Acessando reel.videoUrl em vez de reel.video
    const videoSrc = reel.videoUrl;

    useEffect(() => {
        const videoElement = videoRef.current;
        if (!videoElement) return;

        if (isActive) {
            // Autoplay com som (se o navegador permitir)
            videoElement.play().then(() => {
                setIsPlaying(true);
            }).catch(error => {
                // Navegador bloqueou o autoplay, tenta com mudo
                if (error.name === 'NotAllowedError') {
                    videoElement.muted = true;
                    videoElement.play().catch(e => console.error("Falha ao tocar o vídeo mesmo mudo", e));
                }
            });
        } else {
            // Pausa e reseta o vídeo se não estiver ativo
            videoElement.pause();
            videoElement.currentTime = 0;
            setIsPlaying(false);
        }

        return () => {
            if (videoElement) {
                videoElement.pause();
            }
        };
    }, [isActive, videoSrc]); // Depende apenas da ativação e da fonte do vídeo

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.muted = isMuted;
        }
    }, [isMuted]);

    const handleCanPlay = () => {
        setIsBuffering(false);
        if (isActive && videoRef.current) {
            videoRef.current.play();
        }
    };

    if (hasError || !videoSrc) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-black text-white">
                <i className="fa-solid fa-exclamation-triangle mr-2"></i> Conteúdo Indisponível
            </div>
        );
    }

    return (
        <div className="w-full h-full relative" onClick={onVideoClick}>
            {isBuffering && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <i className="fa-solid fa-circle-notch fa-spin text-3xl text-white/80"></i>
                </div>
            )}
            
            <video
                ref={videoRef}
                src={videoSrc}
                loop
                playsInline
                className="w-full h-full object-cover"
                onCanPlay={handleCanPlay}
                onWaiting={() => setIsBuffering(true)}
                onError={() => setHasError(true)}
            />
        </div>
    );
};
