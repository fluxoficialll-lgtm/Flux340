
import API_Servico_Metodo_Google from '../APIs/API.Servico.Metodo.Google';

// Supondo que você tenha interfaces definidas em algum lugar, como em @/types
interface User {
    id: string;
    [key: string]: any;
}

interface LoginResponse {
    token: string;
    user: User;
}

export const metodoGoogle = {
    /**
     * Intermedia a chamada de login com o Google para a camada de API.
     * @param googleCredential - A credencial (token) fornecida pelo Google.
     * @param referredBy - Opcional: ID do usuário que indicou.
     * @returns Retorna os dados da resposta da API.
     */
    async login(googleCredential: string, referredBy?: string): Promise<LoginResponse> {
        try {
            // Corrigido para passar os argumentos diretamente para a função da API
            const { data } = await API_Servico_Metodo_Google.loginComGoogle(googleCredential, referredBy);
            
            return data;

        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Falha na autenticação com o Google.';
            throw new Error(errorMessage);
        }
    },
};
