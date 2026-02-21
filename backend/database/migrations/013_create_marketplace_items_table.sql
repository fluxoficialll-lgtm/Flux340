-- 013_create_marketplace_items_table.sql: Tabela para armazenar itens do marketplace

CREATE TYPE item_condition AS ENUM ('new', 'used_like_new', 'used_good', 'used_fair');
CREATE TYPE item_status AS ENUM ('available', 'sold', 'delisted');

CREATE TABLE marketplace_items (
    id VARCHAR(255) PRIMARY KEY,
    seller_id VARCHAR(255) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    -- Preço em centavos para precisão financeira
    price_in_cents BIGINT NOT NULL,
    category VARCHAR(100),
    condition item_condition NOT NULL,
    status item_status NOT NULL DEFAULT 'available',
    -- Armazena um array de URLs de imagem
    images JSONB,
    location VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices para otimizar buscas comuns
CREATE INDEX idx_marketplace_items_seller_id ON marketplace_items(seller_id);
CREATE INDEX idx_marketplace_items_category ON marketplace_items(category);
CREATE INDEX idx_marketplace_items_status ON marketplace_items(status);
-- Índice geoespacial seria ideal para buscas por localização, mas um índice de texto já ajuda
CREATE INDEX idx_marketplace_items_location ON marketplace_items(location);
