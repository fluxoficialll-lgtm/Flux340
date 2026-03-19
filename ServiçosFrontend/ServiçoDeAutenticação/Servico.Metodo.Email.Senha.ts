
import API_Servico_Metodo_Email_Senha from '../APIs/API.Servico.Metodo.Email.Senha';
import { LoginDto } from '../../../types/Entrada/Dto.Estrutura.Conta.Flux';

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
     * @param dadosLogin - Objeto contendo o email e a senha do usuário.
     * @returns Retorna os dados da resposta da API.
     */
    async login(dadosLogin: LoginDto): Promise<LoginResponse> {
        try {
            // A camada de API agora espera o objeto DTO diretamente
            const { data } = await API_Servico_Metodo_Email_Senha.login(dadosLogin);
            return data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
            throw new Error(errorMessage);
        }
    },
};
