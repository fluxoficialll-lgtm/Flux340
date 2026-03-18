
// ServiçosFrontend/ServiçoDeAutenticação/Servico.Metodo.Email.Senha.js

import API_Servico_Metodo_Email_Senha from '../APIs/API.Servico.Metodo.Email.Senha.js';

export const metodoEmailSenha = {
    /**
     * Intermedia a chamada de login com email e senha para a camada de API.
     * @param {string} email - O email do usuário.
     * @param {string} password - A senha do usuário.
     * @returns {Promise<{token: string, user: object}>} - Retorna os dados da resposta da API.
     */
    async login(email, password) {
        try {
            // A chamada é delegada para a camada de API, que usa o ClienteBackend
            const { data } = await API_Servico_Metodo_Email_Senha.login(email, password);
            
            return data; // Retorna diretamente os dados (ex: { token, user })

        } catch (error) {
            // O interceptor do ClienteBackend já deve ter logado o erro.
            // Apenas relançamos o erro com uma mensagem amigável para a UI.
            const errorMessage = error.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
            throw new Error(errorMessage);
        }
    },
};
