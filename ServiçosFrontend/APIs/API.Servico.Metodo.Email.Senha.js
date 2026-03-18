
// ServiçosFrontend/APIs/API.Servico.Metodo.Email.Senha.js

import ClienteBackend from '../Cliente.Backend.js'; // Corrigido o caminho

const API_Servico_Metodo_Email_Senha = {
    /**
     * Envia as credenciais para o backend para autenticação.
     * @param {string} email - O email do usuário.
     * @param {string} password - A senha do usuário.
     * @returns {Promise<AxiosResponse<any>>} A promessa da resposta do Axios.
     */
    login(email, password) {
        return ClienteBackend.post('/auth/login', { email, password });
    },
};

export default API_Servico_Metodo_Email_Senha;
