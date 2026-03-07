
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
            // Mock de dados para desenvolvimento
            const mockData: PlatformGroupContent = {
                id: id,
                name: "Nome do Grupo",
                description: "Descrição do Grupo.",
                coverImageUrl: "/path/to/default/cover.jpg",
                createdBy: "user1",
                createdAt: new Date(),
                members: [],
                tags: [],
                sections: [
                    {
                        id: 'section1',
                        title: 'Minha Seção de Exemplo',
                        folders: [
                            {
                                id: 'folder1',
                                name: 'Minha Pasta de Exemplo',
                                channels: [
                                    { id: 'chan1', name: 'Canal de Vídeo Exemplo', type: 'video' },
                                    { id: 'chan2', name: 'Canal de Texto Exemplo', type: 'text' },
                                ]
                            },
                            {
                                id: 'folder2',
                                name: 'Outra Pasta',
                                channels: []
                            }
                        ]
                    }
                ]
            };

            setGroupData(mockData);
            setLoading(false);
        };

        fetchGroupData();
    }, [id]);

    return { groupData, loading, error, groupId: id };
};
