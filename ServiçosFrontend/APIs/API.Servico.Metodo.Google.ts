
import { AxiosResponse } from 'axios';
import ClienteBackend from '../Cliente.Backend';

const API_Servico_Metodo_Google = {
    /**
     * Envia o token do Google para o backend para autenticação.
     * @param {string} token - O token de credencial do Google.
     * @param {string} [referredBy] - Opcional. ID do usuário que indicou.
     * @returns {Promise<AxiosResponse<any>>} A promessa da resposta do Axios.
     */
    loginComGoogle(token: string, referredBy?: string): Promise<AxiosResponse<any>> {
        return ClienteBackend.post('/auth/google', { token, referredBy });
    },
};

export default API_Servico_Metodo_Google;
