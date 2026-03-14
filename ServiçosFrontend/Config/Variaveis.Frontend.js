// Arquivo: ServiçosFrontend/Config/Variaveis.Frontend.js

/**
 * Centraliza a definição, validação e acesso às variáveis de ambiente do Frontend.
 * Garante que a aplicação falhe rapidamente (fail-fast) se a configuração estiver incompleta.
 * As variáveis de ambiente do frontend DEVEM começar com o prefixo VITE_.
 */

// --- Definição das Variáveis Esperadas ---

const VARIAVEIS_OBRIGATORIAS = [
    'VITE_API_BASE_URL',
    'VITE_GOOGLE_CLIENT_ID',
    'VITE_STRIPE_PUBLIC_KEY'
];

// --- Processamento e Validação ---

const VariaveisFrontend = {};
const env = import.meta.env;
const isProduction = env.MODE === 'production';

VARIAVEIS_OBRIGATORIAS.forEach(nome => {
    const valor = env[nome];
    const chaveCamelCase = nome.replace('VITE_', '').toLowerCase().replace(/_([a-z])/g, g => g[1].toUpperCase());

    if (!valor) {
        if (isProduction) {
            throw new Error(`[Configuração do Frontend] A variável de ambiente obrigatória "${nome}" não foi definida.`);
        } else {
            // CORREÇÃO: Define um valor padrão funcional para o modo de simulação/desenvolvimento.
            if (nome === 'VITE_API_BASE_URL') {
                console.warn(`[Configuração do Frontend] A variável "${nome}" não foi definida. Usando o valor padrão "/api" para o modo de desenvolvimento.`);
                VariaveisFrontend[chaveCamelCase] = '/api';
            } else {
                console.warn(`[Configuração do Frontend] A variável de ambiente "${nome}" não foi definida.`);
                VariaveisFrontend[chaveCamelCase] = 'NAO_DEFINIDO_EM_DEV';
            }
        }
    } else {
        VariaveisFrontend[chaveCamelCase] = valor;
    }
});

export default Object.freeze(VariaveisFrontend);