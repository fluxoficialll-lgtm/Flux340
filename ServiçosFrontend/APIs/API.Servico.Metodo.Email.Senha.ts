
import { AxiosResponse } from 'axios';
import ClienteBackend from '../Cliente.Backend'; 

const API_Servico_Metodo_Email_Senha = {
    /**
     * Envia as credenciais para o backend para autenticação.
     * @param {string} email - O email do usuário.
     * @param {string} password - A senha do usuário.
     * @returns {Promise<AxiosResponse<any>>} A promessa da resposta do Axios.
     */
    login(email: string, password: string): Promise<AxiosResponse<any>> {
        return ClienteBackend.post('/auth/login', { email, password });
    },
};

export default API_Servico_Metodo_Email_Senha;
