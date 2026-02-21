
import pg from 'pg';
import dotenv from 'dotenv';
import { LogDeOperacoes } from '../../ServiçosBackEnd/ServiçosDeLogsSofisticados/LogDeOperacoes.js';

dotenv.config();

const { Pool } = pg;

const getBaseConfig = () => ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 5000,
});

const checkDatabaseStatus = async (dbName) => {
    const config = { ...getBaseConfig(), database: dbName };
    const tempPool = new Pool(config);
    try {
        const client = await tempPool.connect();
        try {
            const res = await client.query(`
                SELECT 1 
                FROM information_schema.tables 
                WHERE table_schema NOT IN (\'pg_catalog\', \'information_schema\')
                LIMIT 1;
            `);
            return res.rowCount > 0 ? '📚 PostgreSQL — dados existentes.' : '🆕 PostgreSQL — dados inexistentes.';
        } finally {
            client.release();
        }
    } catch (error) {
        LogDeOperacoes.warn('DB_AUDIT_CONNECTION_FAILURE', {
            message: `Não foi possível conectar ou verificar o banco de dados '${dbName}'.`,
            error: error.message,
        });
        return '🚫 Inacessível';
    } finally {
        await tempPool.end();
    }
};

// RENOMEADO: A constante exportada agora tem um nome mais específico.
export const auditorDoPostgreSQL = {
    async inspectDatabases() {
        LogDeOperacoes.log('DB_AUDIT_START', { message: 'Iniciando auditoria de bancos de dados PostgreSQL.' });
        const config = { ...getBaseConfig(), database: 'postgres' };
        const masterPool = new Pool(config);
        const client = await masterPool.connect();

        try {
            const res = await client.query(`
                SELECT datname FROM pg_database 
                WHERE datistemplate = false AND datname <> \'postgres\';
            `);
            
            const databases = [];
            LogDeOperacoes.log('DB_AUDIT_DISCOVERY', { count: res.rows.length, message: `Encontrados ${res.rows.length} bancos de dados para análise.` });

            for (const row of res.rows) {
                const dbName = row.datname;
                const status = await checkDatabaseStatus(dbName);
                
                LogDeOperacoes.log('DB_AUDIT_STATUS', { 
                    database: dbName, 
                    status: status 
                });

                databases.push({ name: dbName, status });
            }

            LogDeOperacoes.log('DB_AUDIT_COMPLETE', { totalFound: databases.length, message: 'Auditoria de bancos de dados concluída.' });
            return {
                totalCount: databases.length,
                databases,
            };
        } finally {
            client.release();
            await masterPool.end();
        }
    }
};
