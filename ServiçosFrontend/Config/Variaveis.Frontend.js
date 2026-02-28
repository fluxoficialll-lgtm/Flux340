// Arquivo: ServiçosFrontend/Config/Variaveis.Frontend.js

/**
 * Centraliza a definição, validação e acesso às variáveis de ambiente do Frontend.
 * Garante que a aplicação falhe rapidamente (fail-fast) se a configuração estiver incompleta.
 * As variáveis de ambiente do frontend DEVEM começar com o prefixo VITE_.
 */

// --- Definição das Variáveis Esperadas ---

// Nomes das variáveis que são OBRIGATÓRIAS para o frontend funcionar.
const VARIAVEIS_OBRIGATORIAS = [
    'VITE_API_BASE_URL',
    'VITE_GOOGLE_CLIENT_ID',
    'VITE_STRIPE_PUBLIC_KEY'
];

// --- Processamento e Validação ---

const VariaveisFrontend = {};

// Lê as variáveis do `import.meta.env` fornecido pelo Vite
const env = import.meta.env;

// 1. Processa e valida as variáveis obrigatórias
VARIAVEIS_OBRIGATORIAS.forEach(nome => {
    const valor = env[nome];
    if (!valor) {
        // A aplicação não pode funcionar sem estas variáveis, então um erro é lançado.
        throw new Error(`[Configuração do Frontend] A variável de ambiente obrigatória "${nome}" não foi definida. Verifique seu arquivo .env.`);
    }
    // Remove o prefixo VITE_ e converte para camelCase para uso no código
    // Ex: VITE_API_BASE_URL -> apiBaseUrl
    const chaveCamelCase = nome.replace('VITE_', '').toLowerCase().replace(/_([a-z])/g, g => g[1].toUpperCase());
    VariaveisFrontend[chaveCamelCase] = valor;
});

// 2. Exporte o objeto de configuração final, validado e pronto para uso.
// Este objeto é imutável para evitar alterações acidentais em tempo de execução.
export default Object.freeze(VariaveisFrontend);

/**
 * Como usar em outros arquivos:
 * 
 * import VariaveisFrontend from './caminho/para/ServiçosFrontend/Config/Variaveis.Frontend.js';
 * 
 * const url = `${VariaveisFrontend.apiBaseUrl}/seu-endpoint`;
 * const clientId = VariaveisFrontend.googleClientId;
 */
