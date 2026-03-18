
// ServiçosFrontend/APIs/API.Servico.Metodo.Google.js

import ClienteBackend from '../Cliente.Backend.js'; // Corrigido o caminho

const API_Servico_Metodo_Google = {
    /**
     * Envia o token do Google para o backend para autenticação.
     * @param {string} token - O token de credencial do Google.
     * @param {string} [referredBy] - Opcional. ID do usuário que indicou.
     * @returns {Promise<AxiosResponse<any>>} A promessa da resposta do Axios.
     */
    loginComGoogle(token, referredBy) {
        // O ClienteBackend já é uma instância configurada do Axios
        return ClienteBackend.post('/auth/google', { token, referredBy });
    },
};

export default API_Servico_Metodo_Google;
