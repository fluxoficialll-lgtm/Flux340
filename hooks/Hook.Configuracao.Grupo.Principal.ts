
import { useState, useEffect, useCallback } from 'react';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js';
import { useUsuarioSessao } from './Hook.Usuario.Sessao';

// Hook interno para verificar o modo de simulação, removendo a necessidade de importação externa.
const useIsSimulacaoAtiva = () => {
    const [isSimulating, setIsSimulating] = useState(false);

    useEffect(() => {
        // Verifica o estado inicial na montagem do componente.
        const simulating = localStorage.getItem('isSimulating') === 'true';
        setIsSimulating(simulating);
    }, []);

    return isSimulating;
};


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
    const isSimulacaoAtiva = useIsSimulacaoAtiva(); // Usa o hook interno

    const fetchGroupDetails = useCallback(async () => {
        if (!groupId) {
            setLoading(false);
            return;
        }

        setLoading(true);

        if (isSimulacaoAtiva) {
            // No modo de simulação, usamos dados mocados.
            const mockGroupData = {
                id: groupId,
                ownerId: user?.id || 'simulated-owner-id',
                name: 'Grupo Simulado',
                description: 'Esta é uma descrição simulada do grupo.',
                isSalesPlatformEnabled: true,
                isVip: false
            };
            setGroup(mockGroupData);
            setIsOwner(true); // Em simulação, o usuário é sempre o proprietário.
            setLoading(false);
        } else {
            // Lógica original para ambiente de produção
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
            } finally {
                setLoading(false);
            }
        }
    }, [groupId, user?.id, isSimulacaoAtiva]);

    useEffect(() => {
        fetchGroupDetails();
    }, [fetchGroupDetails]);

    const refreshGroup = () => {
        fetchGroupDetails();
    };

    return { group, loading, isOwner, refreshGroup };
};
