
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Group } from '../tipos/types.Grupo'; // Reutilizando a tipagem de Grupo

// Definindo uma interface mais detalhada para o conteúdo da plataforma
interface PlatformGroupContent extends Group {
    sections: Array<{
        id: string;
        title: string;
        folders: Array<{
            id: string;
            name: string;
            channels: Array<{
                id: string;
                name: string;
                type: 'text' | 'video';
            }>;
        }>;
    }>;
}

export const useGroupPlatformData = () => {
    const { id } = useParams<{ id: string }>();
    const [groupData, setGroupData] = useState<PlatformGroupContent | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGroupData = async () => {
            if (!id) {
                setError("ID do grupo não fornecido.");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                // Usando o endpoint de simulação para a plataforma de vendas
                const response = await fetch(`/api/groups/platform/${id}`);
                if (!response.ok) {
                    throw new Error(`Falha ao buscar dados do grupo: ${response.statusText}`);
                }
                const data = await response.json();
                setGroupData(data);
            } catch (e: any) {
                console.error("Erro ao buscar dados da plataforma do grupo:", e);
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGroupData();
    }, [id]);

    return { groupData, loading, error, groupId: id };
};
