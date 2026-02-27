// Arquivo: ServiçosFrontend/Config/Variaveis.Frontend.js

/**
 * Centraliza a definição e o acesso às variáveis de ambiente do Frontend.
 * Garante que todas as variáveis necessárias estão presentes e lança um erro claro se faltarem.
 * Isso evita a necessidade de acessar `import.meta.env` em múltiplos locais.
 */

// 1. Leia as variáveis do ambiente Vite.
const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const VITE_GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// 2. Crie um objeto de configuração que será validado e exportado.
const config = {
    apiBaseUrl: VITE_API_BASE_URL,
    googleClientId: VITE_GOOGLE_CLIENT_ID,
};

// 3. Validação: Verifique se as variáveis essenciais foram carregadas.
if (!config.apiBaseUrl) {
    throw new Error('[Configuração do Frontend] A variável de ambiente obrigatória "VITE_API_BASE_URL" não foi definida.');
}

// 4. Exporte o objeto de configuração validado para ser usado em toda a aplicação.
const VariaveisFrontend = config;
export default VariaveisFrontend;

/**
 * Como usar em outros arquivos:
 * 
 * import VariaveisFrontend from './caminho/para/ServiçosFrontend/Config/Variaveis.Frontend.js';
 * 
 * const url = `${VariaveisFrontend.apiBaseUrl}/seu-endpoint`;
 * const clientId = VariaveisFrontend.googleClientId;
 */
