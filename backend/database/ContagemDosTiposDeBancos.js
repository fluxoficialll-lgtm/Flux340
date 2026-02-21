
import { pool } from './pool.js'; // Importa o pool centralizado
import { LogDeOperacoes } from '../ServiçosBackEnd/ServiçosDeLogsSofisticados/LogDeOperacoes.js';

/**
 * Conta o número de bancos de dados não-template no cluster.
 * Reutiliza o pool de conexão principal para executar a consulta.
 */
export const contarBancosDeDados = async () => {
    LogDeOperacoes.log('DB_COUNT_START', { message: 'Iniciando contagem de bancos de dados...' });

    try {
        // Usa o pool existente para fazer a consulta.
        // A conexão já está configurada corretamente pelo pool.js.
        const res = await pool.query(`
            SELECT datname FROM pg_database
            WHERE datistemplate = false AND datname <> \'postgres\';
        `);
        
        const numeroDeBancos = res.rowCount;
        
        LogDeOperacoes.info('DB_COUNT_SUCCESS', { 
            count: numeroDeBancos,
            message: `📊 Quantidade de bancos de dados identificados = ${numeroDeBancos}`
        });

    } catch (error) {
        const errorMessage = `❌ Erro ao tentar contar os bancos de dados: ${error.message}`;
        LogDeOperacoes.error('DB_COUNT_FAILURE', {
            message: errorMessage,
            errorDetails: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            }
        });
    } finally {
        LogDeOperacoes.log('DB_COUNT_END', { message: 'Contagem de bancos finalizada.' });
        // Não precisamos mais de pool.end() aqui, pois o pool é gerenciado centralmente.
    }
};
