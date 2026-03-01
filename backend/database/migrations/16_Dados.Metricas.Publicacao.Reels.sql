
-- Habilita a extensão para gerar UUIDs, se ainda não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Remove a tabela de métricas de publicações dos reels se ela já existir
DROP TABLE IF EXISTS reels_publication_metrics CASCADE;

-- Cria a tabela de métricas para as publicações dos reels
CREATE TABLE reels_publication_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID NOT NULL UNIQUE,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (publication_id) REFERENCES reels(id) ON DELETE CASCADE
);

-- Cria um índice na coluna publication_id para otimizar as buscas
CREATE INDEX IF NOT EXISTS idx_reels_publication_metrics_publication_id ON reels_publication_metrics(publication_id);
