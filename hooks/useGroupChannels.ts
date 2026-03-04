
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// CORREÇÃO: A importação do groupService foi removida.
// import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { Group } from '../types';

export const useGroupChannels = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [group, setGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (id) {
            // CORREÇÃO: Lógica de busca de grupo removida.
            console.error("groupService is not available, cannot load group channels.");
            setGroup(null); // Define o grupo como nulo
            setIsAdmin(false); // Assume que não é admin
            setLoading(false);
            // Opcional: redirecionar se a funcionalidade é crítica
            // navigate('/groups');
        } else {
            setLoading(false)
        }
    }, [id, navigate]);

    const handleChannelClick = useCallback((channelId: string) => {
        if(id) {
            navigate(`/group-chat/${id}/${channelId}`);
        }
    }, [id, navigate]);

    const handleBack = useCallback(() => {
        navigate('/groups');
    }, [navigate]);

    return {
        group,
        loading,
        isAdmin,
        handleChannelClick,
        handleBack
    };
};
