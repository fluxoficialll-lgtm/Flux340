
// ServiçosFrontend/ServiçoDeAutenticação/Servico.Metodo.Google.js

import API_Servico_Metodo_Google from '../APIs/API.Servico.Metodo.Google.js';

export const metodoGoogle = {
    /**
     * Intermedia a chamada de login com o Google para a camada de API.
     * @param {string} googleCredential - A credencial (token) fornecida pelo Google.
     * @param {string} [referredBy] - Opcional: ID do usuário que indicou.
     * @returns {Promise<{token: string, user: object}>} - Retorna os dados da resposta da API.
     */
    async login(googleCredential, referredBy) {
        try {
            const payload = {
                token: googleCredential,
                referredBy: referredBy,
            };

            // A chamada é delegada para a camada de API, que usa o ClienteBackend
            const { data } = await API_Servico_Metodo_Google.loginWithGoogle(payload);
            
            return data; // Retorna diretamente os dados (ex: { token, user })

        } catch (error) {
            // O interceptor do ClienteBackend já deve ter logado o erro.
            // Apenas relançamos o erro com uma mensagem amigável para a UI.
            const errorMessage = error.response?.data?.message || 'Falha na autenticação com o Google.';
            throw new Error(errorMessage);
        }
    },
};
