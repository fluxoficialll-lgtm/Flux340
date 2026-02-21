
import pg from 'pg';
import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

const { Pool } = pg;

const contarBancosDeDados = async () => {
    console.log('Iniciando script para contagem de bancos de dados...');

    const config = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: 'postgres', // Conecta-se ao banco de dados 'postgres' para obter a lista de outros bancos
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 5000,
    };

    const pool = new Pool(config);

    try {
        const client = await pool.connect();
        try {
            const res = await client.query(`
                SELECT datname FROM pg_database
                WHERE datistemplate = false AND datname <> \'postgres\';
            `);
            
            const numeroDeBancos = res.rowCount;
            
            console.log(`📊 Quantidade de tipos de bancos identificados = ${numeroDeBancos}`);

        } finally {
            client.release();
        }
    } catch (error) {
        console.error('❌ Erro ao tentar contar os bancos de dados:');
        // Imprime a mensagem de erro para facilitar a depuração
        console.error(`   Detalhes: ${error.message}`);
        console.log('--------------------------------------------------');
        console.log('💡 DICA: Verifique se as variáveis de ambiente (DB_USER, DB_PASSWORD, etc.) estão corretas no seu arquivo .env ou se o serviço do banco de dados está rodando.');
        console.log('--------------------------------------------------');
    } finally {
        await pool.end();
        console.log('Script finalizado.');
    }
};

contarBancosDeDados();
