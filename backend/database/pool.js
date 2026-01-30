
import pg from 'pg';
const { Pool } = pg;

if (!process.env.DATABASE_URL) {
    console.error("❌ ERRO CRÍTICO: DATABASE_URL não definida no ambiente.");
}

export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    connectionTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    max: 25
});

export const query = (text, params) => pool.query(text, params);
