// Arquivo: ServiçosFrontend/Cliente.Backend.js

import axios from 'axios';
import VariaveisFrontend from './Config/Variaveis.Frontend.js';

/**
 * Cliente HTTP centralizado para comunicação com o Backend.
 *
 * Configura o `baseURL` e interceptors para autenticação e tratamento de erros.
 */
const ClienteBackend = axios.create({
    baseURL: VariaveisFrontend.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Interceptor de Requisição:
 *
 * Antes de cada requisição ser enviada, este interceptor verifica se existe um
 * token de autenticação (JWT) armazenado localmente no localStorage.
 * Se o token existir, ele é adicionado ao cabeçalho 'Authorization'.
 */
ClienteBackend.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); // 'authToken' é a chave onde o token JWT é guardado
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // Log do erro para depuração
        console.error("Erro no interceptor de requisição:", error);
        return Promise.reject(error);
    }
);

/**
 * Interceptor de Resposta:
 *
 * Trata as respostas da API.
 * - Em caso de sucesso, retorna os dados da resposta.
 * - Em caso de erro, analisa o tipo de erro e o trata adequadamente.
 *   - Erros de autenticação (401) podem acionar um fluxo de logout.
 *   - Outros erros são repassados para a lógica de tratamento de erros da aplicação.
 */
ClienteBackend.interceptors.response.use(
    (response) => {
        // Retorna diretamente os dados da resposta em caso de sucesso
        return response.data;
    },
    (error) => {
        console.error("Erro na resposta da API:", error.response || error.message);

        if (error.response && error.response.status === 401) {
            // Lógica de logout - Ex: redirecionar para a página de login
            // Isso pode ser feito emitindo um evento ou chamando uma função global de logout
            console.warn("Usuário não autorizado. Redirecionando para login.");
            localStorage.removeItem('authToken'); // Remover o token
            // A melhor prática é usar o sistema de rotas para navegar
            window.location.href = '/login';
        }

        // Repassa o erro para ser tratado pelo código que fez a chamada.
        // Isso permite que componentes específicos reajam a erros de API.
        return Promise.reject(error.response ? error.response.data : error);
    }
);

export default ClienteBackend;
