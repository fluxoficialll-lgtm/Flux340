// Arquivo: backend/config/Variaveis.Backend.js

/**
 * Centraliza a definição e a validação das variáveis de ambiente do Backend.
 * Garante que a aplicação tenha a configuração necessária para iniciar.
 */

import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do arquivo .env para process.env

// 1. Defina um objeto com todas as variáveis esperadas, lendo de process.env
const config = {
    // Obrigatórias para o funcionamento do servidor
    databaseUrl: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    googleClientId: process.env.VITE_GOOGLE_CLIENT_ID, // Mantido para a rota /boot
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
    
    // Opcional com valor padrão
    port: process.env.PORT || 3001,
    corsOrigin: process.env.CORS_ORIGIN, // Será validado separadamente
};

// 2. Validação: Verifique se as variáveis essenciais foram carregadas
if (!config.databaseUrl) {
    throw new Error('[Configuração do Backend] A variável de ambiente obrigatória "DATABASE_URL" não foi definida.');
}
if (!config.jwtSecret) {
    throw new Error('[Configuração do Backend] A variável de ambiente obrigatória "JWT_SECRET" não foi definida.');
}
if (!config.googleClientId) {
    throw new Error('[Configuração do Backend] A variável de ambiente obrigatória "VITE_GOOGLE_CLIENT_ID" não foi definida.');
}

// 3. Exporte o objeto de configuração validado
const VariaveisBackend = config;
export default VariaveisBackend;
