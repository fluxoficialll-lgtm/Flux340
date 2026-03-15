
import { useState, useEffect, useCallback } from 'react';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js';
import { useUsuarioSessao } from './Hook.Usuario.Sessao';

// Assumindo que a interface do grupo tem essa estrutura
interface Group {
    id: string;
    ownerId: string; // ID do proprietário do grupo
    isSalesPlatformEnabled?: boolean;
    isVip?: boolean;
}

export const HookConfiguracaoGrupoPrincipal = (groupId: string | undefined) => {
    const { user } = useUsuarioSessao();
    const [group, setGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);

    const fetchGroupDetails = useCallback(async () => {
        if (!groupId) return;

        setLoading(true);
        try {
            const groupData = await groupSystem.getGroupDetails(groupId);
            setGroup(groupData);
            if (user && groupData.ownerId === user.id) {
                setIsOwner(true);
            } else {
                setIsOwner(false);
            }
        } catch (error) {
            console.error("Erro ao buscar detalhes do grupo:", error);
            setGroup(null);
        }
        setLoading(false);
    }, [groupId, user]);

    useEffect(() => {
        fetchGroupDetails();
    }, [fetchGroupDetails]);

    const refreshGroup = () => {
        fetchGroupDetails();
    };

    return { group, loading, isOwner, refreshGroup };
};
