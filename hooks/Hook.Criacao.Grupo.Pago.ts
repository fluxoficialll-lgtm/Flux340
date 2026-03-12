
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';

// Hook para a criação de Grupos VIP
export const useVIPGroupCreation = () => {
    const navigate = useNavigate();
    const [groupName, setGroupName] = useState('');
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createVIPGroup = async () => {
        const user = authService.getCurrentUser();
        if (!user) {
            setError("Você precisa estar logado para criar um grupo.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // Lógica de criação de grupo VIP (simulada)
            console.log(`Criando grupo VIP "${groupName}" com preço ${price}`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simula chamada de API
            navigate('/groups'); // Redireciona para a lista de grupos após sucesso
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
        } finally {
            setLoading(false);
        }
    };

    return {
        groupName,
        setGroupName,
        price,
        setPrice,
        loading,
        error,
        createVIPGroup,
    };
};
