
-- Habilita a extensão para gerar UUIDs, se ainda não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Remove a tabela de métricas de publicações do feed se ela já existir
DROP TABLE IF EXISTS feed_publication_metrics CASCADE;

-- Cria a tabela de métricas para as publicações do feed
CREATE TABLE feed_publication_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID NOT NULL UNIQUE,
    views_count INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    shares_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    FOREIGN KEY (publication_id) REFERENCES feed_publications(id) ON DELETE CASCADE
);

-- Cria um índice na coluna publication_id para otimizar as buscas
CREATE INDEX IF NOT EXISTS idx_feed_publication_metrics_publication_id ON feed_publication_metrics(publication_id);
