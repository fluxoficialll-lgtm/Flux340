
import API_Servico_Metodo_Email_Senha from '../APIs/API.Servico.Metodo.Email.Senha';

// Supondo que você tenha interfaces definidas em algum lugar, como em @/types
interface User {
    id: string;
    [key: string]: any;
}

interface LoginResponse {
    token: string;
    user: User;
}

export const metodoEmailSenha = {
    /**
     * Intermedia a chamada de login com email e senha para a camada de API.
     * @param email - O email do usuário.
     * @param password - A senha do usuário.
     * @returns Retorna os dados da resposta da API.
     */
    async login(email: string, password: string): Promise<LoginResponse> {
        try {
            const { data } = await API_Servico_Metodo_Email_Senha.login(email, password);
            return data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
            throw new Error(errorMessage);
        }
    },
};
