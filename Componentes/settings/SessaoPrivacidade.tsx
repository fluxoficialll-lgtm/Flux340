
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemConfiguracao } from './ItemConfiguracao';

interface SessaoPrivacidadeProps {
    isPrivate: boolean;
    onTogglePrivacy: () => void;
    isAdultContent: boolean;
    onToggleAdult: () => void;
}

export const SessaoPrivacidade: React.FC<SessaoPrivacidadeProps> = ({ 
    isPrivate, 
    onTogglePrivacy, 
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
            <h2>Privacidade e Segurança</h2>
            
            <ItemConfiguracao 
                icon="fa-lock" 
                label="Conta Privada" 
                onClick={onTogglePrivacy}
                rightElement={renderSwitch(isPrivate, onTogglePrivacy)}
            />

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
        </div>
    );
};
