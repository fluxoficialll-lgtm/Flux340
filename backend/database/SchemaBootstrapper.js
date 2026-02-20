
import { query } from './pool.js';

// Importação centralizada de todos os schemas estruturais
import { usersSchema } from './schemas/users.js';
import { groupsSchema } from './schemas/groups.js';
import { financialSchema } from './schemas/financial.js';
import { adsSchema } from './schemas/ads.js';
import { feesSchema } from './schemas/fees.js';
import { vipSchema } from './schemas/vip.js';
import { postsSchema } from './schemas/posts.js';
import { chatsSchema } from './schemas/chats.js';
import { marketplaceSchema } from './schemas/marketplace.js';
import { relationshipsSchema } from './schemas/relationships.js';
import { reportsSchema } from './schemas/reports.js';
import { interactionsSchema } from './schemas/interactions.js';
import { auditSchema } from './schemas/ServiçosDeLogsSofisticados.js';
import { settingsSchema } from './schemas/settings.js';

export const SchemaBootstrapper = {
    /**
     * Executa a sequência de bootstrapping e migração do banco de dados.
     */
    async run() {
        console.log("🔄 DB: Inicializando Motor de Schema e Migração...");
        
        try {
            // 1. Requisitos de Sistema
            await query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
            
            // 2. Criação/Verificação de Tabelas Base
            const schemas = [
                usersSchema, groupsSchema, postsSchema,
                chatsSchema, marketplaceSchema, relationshipsSchema,
                reportsSchema, interactionsSchema, vipSchema,    
                financialSchema, adsSchema, feesSchema, auditSchema,
                settingsSchema
            ];

            for (const sql of schemas) { 
                try {
                    await query(sql); 
                } catch (schemaError) {
                    console.warn(`⚠️ [Bootstrapper] Aviso em schema: ${schemaError.message.substring(0, 60)}...`);
                }
            }
            
            // 3. Execução de Migrações Manuais
            await this.runMigrations();

            // 4. Integridade e Triggers Complexas
            await this.setupTriggers();
            
            console.log("✅ DB: Estrutura física e lógica verificada e atualizada.");
        } catch (e) {
            console.error("❌ DB: Falha Crítica no Bootstrapper:", e.message);
            throw e;
        }
    },

    /**
     * Executa migrações de schema que não são cobertas pelo CREATE IF NOT EXISTS.
     * Isso permite adicionar colunas a tabelas existentes de forma idempotente.
     */
    async runMigrations() {
        console.log("  -> Executando migrações de schema...");
        try {
            // Migração #1: Adicionar wallet_balance à tabela users
            const walletBalanceCheck = await query(`
                SELECT 1 FROM information_schema.columns 
                WHERE table_name='users' AND column_name='wallet_balance'
            `);

            if (walletBalanceCheck.rowCount === 0) {
                console.log("    -> Migrando: Adicionando coluna 'wallet_balance' a 'users'...");
                await query(`ALTER TABLE users ADD COLUMN wallet_balance NUMERIC(15,2) DEFAULT 0.00;`);
                console.log("       ...coluna 'wallet_balance' adicionada com sucesso.");
            }

            // Futuras migrações podem ser adicionadas aqui

        } catch (e) {
            console.error("    -> ❌ Falha durante a execução de migrações:", e.message);
            // Não relançamos o erro para permitir que a aplicação continue se possível
        }
    },

    async setupTriggers() {
        // ... (código dos triggers permanece o mesmo)
    }
};
