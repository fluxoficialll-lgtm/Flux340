
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemConfiguracao } from './ItemConfiguracao';
import authService from '../../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { ModalDeSelecaoDeIdioma, IDIOMAS } from './ModalDeSelecaoDeIdioma';
import { preferenceService } from '../../ServiçosFrontend/ServiçoDePreferências/preferenceService.js';

interface SessaoContaProps {
    isPrivate: boolean;
    onTogglePrivacy: () => void;
}

export const SessaoConta: React.FC<SessaoContaProps> = ({ isPrivate, onTogglePrivacy }) => {
    const navigate = useNavigate();
    const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
    
    const user = authService.getCurrentUser();
    const [currentLangId, setCurrentLangId] = useState(user?.language || localStorage.getItem('app_language') || 'pt');

    const currentLangLabel = IDIOMAS.find(l => l.id === currentLangId)?.label || 'Português';

    const handleLanguageSelect = async (langId: string) => {
        if (user?.email) {
            await preferenceService.updateLanguage(user.email, langId);
            setCurrentLangId(langId);
        }
        setIsLanguageModalOpen(false);
    };

    const renderSwitch = (checked: boolean, onChange: () => void) => (
        <label className="switch" onClick={(e) => e.stopPropagation()}>
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="slider"></span>
        </label>
    );

    return (
        <>
            <div className="settings-group">
                <h2>Configurações de conta</h2>
                <ItemConfiguracao 
                    icon="fa-user-edit" 
                    label="Editar Perfil" 
                    onClick={() => navigate('/profile/edit')} 
                />
                <ItemConfiguracao 
                    icon="fa-lock" 
                    label="Conta Privada" 
                    onClick={onTogglePrivacy}
                    rightElement={renderSwitch(isPrivate, onTogglePrivacy)}
                />
                <ItemConfiguracao 
                    icon="fa-language" 
                    label="Idioma" 
                    onClick={() => setIsLanguageModalOpen(true)} 
                    rightElement={
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-gray-500 uppercase">{currentLangLabel}</span>
                            <i className="fas fa-chevron-right text-gray-600 text-xs"></i>
                        </div>
                    }
                />
                <ItemConfiguracao 
                    icon="fa-bell" 
                    label="Configurações de Notificação" 
                    onClick={() => navigate('/pg-configuracao-notificacao')} 
                />
            </div>

            <ModalDeSelecaoDeIdioma
                isOpen={isLanguageModalOpen}
                onClose={() => setIsLanguageModalOpen(false)}
                currentLanguage={currentLangId}
                onSelect={handleLanguageSelect}
            />
        </>
    );
};
