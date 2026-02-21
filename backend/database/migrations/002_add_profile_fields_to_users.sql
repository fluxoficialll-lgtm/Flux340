-- 002_add_profile_fields_to_users.sql: Adiciona campos de perfil à tabela de usuários

ALTER TABLE users
ADD COLUMN profile_picture_url VARCHAR(255),
ADD COLUMN cover_photo_url VARCHAR(255),
ADD COLUMN bio TEXT,
ADD COLUMN location VARCHAR(255),
ADD COLUMN website VARCHAR(255);
