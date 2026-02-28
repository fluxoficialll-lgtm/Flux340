
// backend/Repositorios/Repositorio.Gestao.Perfil.js

import { pool } from '../database/pool.js';
import { queries } from '../database/GestãoDeDados/PostgreSQL/Consultas.Gestao.Perfil.js';

const findUserById = async (id) => {
    try {
        // A consulta SQL já busca o usuário e faz a contagem de posts, seguidores e seguindo.
        const { rows } = await pool.query(queries.findUserById, [id]);
        
        if (rows.length === 0) {
            return null; // Retorna nulo se o usuário não for encontrado
        }

        const user = rows[0];

        // Formata a saída para bater com o que o frontend espera (aninhando as estatísticas)
        const formattedUser = {
            id: user.id,
            username: user.username,
            nickname: user.nickname,
            bio: user.bio,
            avatar: user.avatar,
            website: user.website,
            stats: {
                posts: parseInt(user.posts_count, 10),
                followers: parseInt(user.followers_count, 10),
                following: parseInt(user.following_count, 10),
            }
        };

        console.log(`Repositório: Perfil do usuário ID: ${id} encontrado com sucesso.`);
        return formattedUser;
    } catch (error) {
        console.error('Repositório: Erro ao buscar usuário por ID:', error);
        throw new Error('Erro no banco de dados ao buscar usuário.');
    }
};

const updateUser = async (id, userData) => {
    const { name, bio, profile_image, website } = userData;
    const values = [name, bio, profile_image, website, id];

    try {
        const { rows } = await pool.query(queries.updateUser, values);
        if (rows.length === 0) {
            throw new Error('Usuário não encontrado para atualização.');
        }
        console.log(`Repositório: Usuário ID: ${id} atualizado com sucesso.`);
        return rows[0];
    } catch (error) {
        console.error('Repositório: Erro ao atualizar usuário:', error);
        throw new Error('Erro no banco de dados ao atualizar usuário.');
    }
};

const repositorioGestaoPerfil = {
    findUserById,
    updateUser,
};

export default repositorioGestaoPerfil;
