
-- Habilita a extensão para gerar UUIDs, se ainda não estiver habilitada
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Remove a tabela de perfis de usuário se ela já existir, para garantir um estado limpo
DROP TABLE IF EXISTS user_profiles CASCADE;

-- Cria a tabela de perfis de usuário, que depende da tabela users
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE,
    username TEXT UNIQUE,
    nickname TEXT,
    bio TEXT,
    avatar TEXT,
    website TEXT,
    posts_count INT DEFAULT 0,
    followers_count INT DEFAULT 0,
    following_count INT DEFAULT 0,
    theme TEXT,
    notifications_enabled BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Cria um índice na coluna user_id para otimizar as buscas
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Cria um índice na coluna username para garantir unicidade e otimizar buscas
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_profiles_username ON user_profiles(username);

