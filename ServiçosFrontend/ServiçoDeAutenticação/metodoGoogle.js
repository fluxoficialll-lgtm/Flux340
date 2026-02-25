
// ServiçosFrontend/ServiçoDeAutenticação/metodoGoogle.js

/*
 * Este módulo lida com a autenticação com o Google em um ambiente de produção.
 * Ele se comunica com o backend para validar a credencial do Google.
 */

const API_ENDPOINT = '/api/auth/google'; // Endpoint do backend para autenticação Google

export const metodoGoogle = {
    /**
     * Envia a credencial do Google para o backend para validação e login.
     * @param {string} googleCredential - A credencial (token) fornecida pelo Google.
     * @param {string} [referredBy] - Opcional: ID do usuário que indicou.
     * @returns {Promise<{token: string, user: object}>} - Retorna um token JWT e os dados do usuário.
     */
    async login(googleCredential, referredBy) {
        if (!googleCredential) {
            throw new Error('Credencial do Google não fornecida.');
        }

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: googleCredential,
                referredBy: referredBy,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Se a resposta não for OK, lança um erro com a mensagem do backend.
            throw new Error(data.message || 'Falha na autenticação com o Google.');
        }

        // Retorna o token e o usuário recebidos do backend.
        return data; // Espera-se que a resposta contenha { token, user }
    },
};
