
import { API_BASE_URL } from '../config/apiConfig';

const ServicoConversas = {
    obterConversas: async () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
            throw new Error('Nenhum token de autenticação encontrado.');
        }

        const response = await fetch(`${API_BASE_URL}/conversas`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            // Lida com respostas de erro do servidor (ex: 404, 500)
            throw new Error('Falha ao buscar conversas. O servidor respondeu com status: ' + response.status);
        }

        return response.json();
    },
};

export default ServicoConversas;
