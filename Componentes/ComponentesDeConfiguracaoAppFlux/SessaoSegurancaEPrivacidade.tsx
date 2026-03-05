
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemConfiguracao } from './ItemConfiguracao';

interface SessaoSegurancaEPrivacidadeProps {
    isAdultContent: boolean;
    onToggleAdult: () => void;
}

export const SessaoSegurancaEPrivacidade: React.FC<SessaoSegurancaEPrivacidadeProps> = ({ 
    isAdultContent, 
    onToggleAdult 
}) => {
    const navigate = useNavigate();

    const renderSwitch = (checked: boolean, onChange: () => void) => (
        <label className="switch" onClick={(e) => e.stopPropagation()}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
        </label>
    );

    return (
        <div className="settings-group">
            <h2>Configurações de segurança e privacidade</h2>
            
            <ItemConfiguracao 
                icon="fa-triangle-exclamation" 
                label="Habilitar Conteúdo +18" 
                onClick={onToggleAdult}
                rightElement={renderSwitch(isAdultContent, onToggleAdult)}
            />

            <ItemConfiguracao 
                icon="fa-shield-alt" 
                label="Segurança e Login" 
                onClick={() => navigate('/security-login')} 
            />

            <ItemConfiguracao 
                icon="fa-user-slash" 
                label="Gerenciar Bloqueios" 
                onClick={() => navigate('/blocked-users')} 
            />

            <ItemConfiguracao 
                icon="fa-file-alt" 
                label="Termos e Privacidade" 
                onClick={() => navigate('/terms')} 
            />

            <ItemConfiguracao 
                icon="fa-headset" 
                label="Ajuda e Suporte" 
                onClick={() => navigate('/help')} 
            />
        </div>
    );
};
