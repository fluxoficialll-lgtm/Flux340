
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { preferenceService } from '../ServiçosFrontend/ServiçoDePreferências/preferenceService.js';

export const LANGUAGES = [
    { id: 'pt', label: 'Português', flag: '🇧🇷', nativeName: 'Brasil' },
    { id: 'en', label: 'English', flag: '🇺🇸', nativeName: 'United States' },
    { id: 'es', label: 'Español', flag: '🇪🇸', nativeName: 'España' }
];

export const useLanguageSettings = () => {
    const navigate = useNavigate();
    const user = authService.getCurrentUser();
    
    // O estado do idioma atual, inicializado com o valor do usuário ou localStorage
    const [currentLangId, setCurrentLangId] = useState(() => {
        return user?.language || localStorage.getItem('app_language') || 'pt';
    });

    const handleLanguageSelect = async (langId: string) => {
        if (user?.email) {
            try {
                await preferenceService.updateLanguage(user.email, langId);
                // Atualiza o estado local para refletir a mudança imediatamente na UI
                setCurrentLangId(langId);
                // Em um app real, aqui você iria recarregar as traduções com i18next
                // Por enquanto, apenas navegamos de volta
                navigate(-1);
            } catch (error) {
                console.error("Falha ao atualizar o idioma:", error);
                // Opcional: exibir um alerta de erro para o usuário
            }
        }
    };

    const handleBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate('/settings');
        }
    };

    return {
        currentLangId,
        handleLanguageSelect,
        handleBack,
        languages: LANGUAGES
    };
};
