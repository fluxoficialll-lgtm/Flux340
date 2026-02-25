
// ServiçosFrontend/ServiçoDeAutenticação/metodoEmail.js

/*
 * Este módulo lida com a autenticação com email e senha em um ambiente de produção.
 * Ele se comunica com o backend para validar as credenciais.
 */

const API_ENDPOINT = '/api/auth/login'; // Endpoint do backend para login com email

export const metodoEmail = {
    /**
     * Envia o email and senha para o backend para validação e login.
     * @param {string} email - O email do usuário.
     * @param {string} password - A senha do usuário.
     * @returns {Promise<{token: string, user: object}>} - Retorna um token JWT e os dados do usuário.
     */
    async login(email, password) {
        if (!email || !password) {
            throw new Error('Email e senha são obrigatórios.');
        }

        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Se a resposta não for OK, lança um erro com a mensagem do backend.
            throw new Error(data.message || 'Credenciais inválidas.');
        }

        // Retorna o token e o usuário recebidos do backend.
        return data; // Espera-se que a resposta contenha { token, user }
    },
};
