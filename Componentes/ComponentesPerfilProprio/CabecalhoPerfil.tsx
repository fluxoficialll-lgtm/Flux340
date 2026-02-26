
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MainHeader } from '../layout/MainHeader';
import { Settings, Trophy } from 'lucide-react';

export const CabecalhoPerfil = () => {
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const handleRankingClick = () => {
        navigate('/ranking-followers');
    };

    return (
        <MainHeader
            leftContent={
                <button onClick={handleRankingClick} className="p-2 rounded-full hover:bg-white/10">
                    <Trophy size={24} color="#00c2ff" />
                </button>
            }
            rightContent={
                <button onClick={handleSettingsClick} className="p-2 rounded-full hover:bg-white/10">
                    <Settings size={24} color="#00c2ff" />
                </button>
            }
        />
    );
};