
import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs/promises';
import path from 'path';
import pool from '../backend/database/pool.js';
import { backendConfig } from '../backend/config/ambiente.js';
const { ambiente: ambienteAtual } = backendConfig;

const MIGRATIONS_DIR = path.join(process.cwd(), 'backend', 'database', 'migrations');

const applyMigration = async (client, fileName) => {
    console.log(`  -> Aplicando: ${fileName}...`);
    const filePath = path.join(MIGRATIONS_DIR, fileName);
    try {
        const sql = await fs.readFile(filePath, 'utf-8');
        await client.query(sql);
        console.log(`     ✔️ Sucesso.`);
    } catch (error) {
        console.error(`     ❌ Erro ao aplicar ${fileName}:`, error.message);
        throw error;
    }
};

export const run = async () => {
    console.log(`
🚀 Iniciando a verificação e migração do banco de dados no ambiente: ${ambienteAtual.toUpperCase()}...
`);
    
    const client = await pool.connect();

    try {
        const allFiles = await fs.readdir(MIGRATIONS_DIR);
        const migrationFiles = allFiles.filter(file => file.endsWith('.sql')).sort();

        if (migrationFiles.length === 0) {
            console.log('✅ Banco de dados já está atualizado. Nenhuma migração necessária.');
            return;
        }

        console.log(`🔍 Migrações encontradas. Preparando para aplicar ${migrationFiles.length} atualizações...`);

        await client.query('BEGIN');
        console.log('🛡️  Iniciando transação segura...');

        for (const fileName of migrationFiles) {
            await applyMigration(client, fileName);
        }

        await client.query('COMMIT');
        console.log('🎉 SUCESSO! O banco de dados foi atualizado e todas as tabelas estão prontas.');

    } catch (error) {
        console.error('🔥 ERRO CRÍTICO! Falha ao aplicar as migrações.');
        await client.query('ROLLBACK');
        console.error('⏪ Todas as alterações foram revertidas para garantir a segurança do banco.');
        throw error;
    } finally {
        client.release();
        console.log('🔌 Conexão com o banco de dados liberada.');
    }
};
