
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js';

// Interface para as configurações de notificação, conforme a API
interface GroupNotificationSettings {
    notifyOnNewMember: boolean;          // Notificar quando um novo membro entrar
    notifyOnMemberLeave: boolean;        // Notificar quando um membro sair
    notifyOnNewPost: boolean;            // Notificar sobre novas postagens (geral)
    notifyOnMention: boolean;            // Notificar quando for mencionado (se aplica ao admin/moderador)
    notifyOnVipSubscription: boolean;    // Notificar sobre novas assinaturas VIP
    notifyAdminOnReport: boolean;        // Notificar admins sobre novas denúncias
}

export const useGroupNotificationSettings = () => {
    const { groupId } = useParams<{ groupId: string }>();
    const [settings, setSettings] = useState<GroupNotificationSettings | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Busca as configurações de notificação do grupo
    const fetchSettings = useCallback(async () => {
        if (!groupId) return;
        setLoading(true);
        setError(null);
        try {
            const response = await groupSystem.getNotificationSettings(groupId);
            setSettings(response);
        } catch (err) {
            setError("Não foi possível carregar as configurações de notificação.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [groupId]);

    // Efeito para buscar as configurações na montagem
    useEffect(() => {
        fetchSettings();
    }, [fetchSettings]);

    // Atualiza as configurações de notificação
    const updateSettings = useCallback(async (newSettings: Partial<GroupNotificationSettings>) => {
        if (!groupId) return;
        setLoading(true);
        try {
            await groupSystem.updateNotificationSettings(groupId, newSettings);
            // Atualiza o estado local com as novas configurações para refletir na UI
            setSettings(prev => prev ? { ...prev, ...newSettings } : null);
        } catch (err) {
            setError("Falha ao atualizar as configurações de notificação.");
            console.error(err);
            // Reverte para o estado anterior em caso de erro
            fetchSettings(); 
            throw err;
        }
    }, [groupId, fetchSettings]);

    return {
        settings,
        loading,
        error,
        refetchSettings: fetchSettings,
        updateSettings,
    };
};
