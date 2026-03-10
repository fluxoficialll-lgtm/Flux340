
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';
import CardConfiguracaoNotificacoes, { NotificationSettings } from '../../../Componentes/ComponentesDeGroups/Componentes/ComponentesDeConfiguracoesDeGrupo/Card.Configuracao.Notificacoes';

// --- Página Principal ---
export const PGGrupoConfiguracoesNotificacoesGerais: React.FC = () => {
    const navigate = useNavigate();
    
    // Estado inicial para as configurações de notificação (pode vir de uma API no futuro)
    const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
        masterMute: false,
        mentionsAndReplies: true,
        newMessages: false,
        newMembers: true,
        groupAnnouncements: true, // Esta opção pode ser controlada separadamente se necessário
    });

    // Função para lidar com as alterações vindas do Card
    const handleSettingsChange = (newSettings: Partial<NotificationSettings>) => {
        const updatedSettings = { ...notificationSettings, ...newSettings };
        
        // Lógica de Negócio: se masterMute for ligado, desligar as outras (exceto anúncios)
        if (newSettings.masterMute === true) {
            updatedSettings.mentionsAndReplies = false;
            updatedSettings.newMessages = false;
            updatedSettings.newMembers = false;
        }

        console.log("Novas configurações de notificação:", updatedSettings);
        setNotificationSettings(updatedSettings);
        // Aqui você chamaria a API para salvar as novas configurações
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Notificações Gerais" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <p className="text-gray-400 text-center mb-8">Controle como e quando você recebe notificações para este grupo.</p>

                <CardConfiguracaoNotificacoes 
                    settings={notificationSettings} 
                    onSettingsChange={handleSettingsChange} 
                />
                
                <div className="mt-8 bg-black/20 border border-white/10 rounded-2xl p-6">
                     <div className="flex items-start gap-4">
                        <i className={`fa-solid fa-bullhorn text-xl text-gray-400 w-6 text-center mt-1`}></i>
                        <div>
                            <h3 className={`font-semibold text-white`}>Anúncios do Grupo</h3>
                            <p className="text-sm text-gray-500 max-w-md">Notificações de administradores para anúncios importantes. Não podem ser desativadas.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
