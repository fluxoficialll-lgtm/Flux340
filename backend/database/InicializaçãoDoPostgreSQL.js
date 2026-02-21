
import { pool } from './pool.js';
import { LogDeOperacoes } from '../ServiçosBackEnd/ServiçosDeLogsSofisticados/LogDeOperacoes.js';

const db = {
    /**
     * Inicializa o pool de conexões com o banco de dados.
     * Tenta conectar e, em caso de falha, encerra a aplicação.
     */
    init: async () => {
        try {
            await pool.query('SELECT NOW()'); // Testa a conexão
            LogDeOperacoes.log('DB_CONNECTION_SUCCESS', { message: 'Conexão com o banco de dados estabelecida com sucesso.' });
        } catch (err) {
            LogDeOperacoes.fatal('DB_CONNECTION_FAILURE', { 
                message: 'Não foi possível conectar ao banco de dados na inicialização.',
                error: err.message,
                stack: err.stack
            });
            process.exit(1); // Encerra a aplicação em caso de falha na conexão
        }
    },

    /**
     * Exporta o pool para ser usado por repositórios ou outras partes do sistema.
     */
    getPool: () => pool
};

export { db };
