
// backend/ServicosBackend/Servicos.Publicacao.Feed.js

import feedManager from '../database/GestaoDeDados/PostgreSQL/Consultas.Publicacao.Feed.js';

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const createPost = async (postData, user) => {
    // Lógica de negócio de alto nível no serviço
    // Por exemplo, verificar o status do usuário, etc.
    if (!user || !user.id) {
        throw new AppError('Autenticação necessária para criar um post.', 401);
    }

    // Passa para a camada de gestão de dados para validação e criação
    return await feedManager.createPost({ ...postData, userId: user.id });
};

const getAllPosts = async (options) => {
    // O serviço pode enriquecer os dados ou aplicar regras de negócio aos resultados
    return await feedManager.getAllPosts(options);
};

const getPostById = async (postId) => {
    const post = await feedManager.getPostById(postId);
    if (!post) {
        throw new AppError('Post não encontrado.', 404);
    }
    return post;
};

const updatePost = async (postId, postData, user) => {
    if (!user || !user.id) {
        throw new AppError('Autenticação necessária.', 401);
    }

    const post = await feedManager.getPostById(postId);
    if (!post) {
        throw new AppError('Post não encontrado para atualização.', 404);
    }

    // Regra de negócio de permissão
    if (post.user_id !== user.id) {
        throw new AppError('Usuário não autorizado a editar este post.', 403);
    }

    return await feedManager.updatePost(postId, postData);
};

const deletePost = async (postId, user) => {
    if (!user || !user.id) {
        throw new AppError('Autenticação necessária.', 401);
    }

    const post = await feedManager.getPostById(postId);
    if (!post) {
        throw new AppError('Post não encontrado para deleção.', 404);
    }

    // Regra de negócio de permissão
    if (post.user_id !== user.id) {
        throw new AppError('Usuário não autorizado a deletar este post.', 403);
    }

    return await feedManager.deletePost(postId);
};

export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
