
// backend/ServicosBackend/Servicos.Publicacao.Feed.js

import repositorioPublicacaoFeed from '../Repositorios/Repositorio.Publicacao.Feed.js';

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const criarPost = async (postData, user) => {
    if (!user || !user.id) {
        throw new AppError('Autenticação necessária para criar um post.', 401);
    }

    // Validação de dados de entrada pode ser feita aqui ou delegada
    if (!postData.content || typeof postData.content !== 'string' || postData.content.trim().length === 0) {
        throw new AppError('O conteúdo do post é obrigatório.', 400);
    }

    return await repositorioPublicacaoFeed.criar({ ...postData, author_id: user.id });
};

const obterTodosOsPosts = async (options) => {
    return await repositorioPublicacaoFeed.obterTodos(options);
};

const obterPostPorId = async (postId) => {
    const post = await repositorioPublicacaoFeed.obterPorId(postId);
    if (!post) {
        throw new AppError('Post não encontrado.', 404);
    }
    return post;
};

const atualizarPost = async (postId, postData, user) => {
    if (!user || !user.id) {
        throw new AppError('Autenticação necessária.', 401);
    }

    const post = await repositorioPublicacaoFeed.obterPorId(postId);
    if (!post) {
        throw new AppError('Post não encontrado para atualização.', 404);
    }

    if (post.author_id !== user.id) {
        throw new AppError('Usuário não autorizado a editar este post.', 403);
    }

    return await repositorioPublicacaoFeed.atualizar(postId, postData);
};

const deletarPost = async (postId, user) => {
    if (!user || !user.id) {
        throw new AppError('Autenticação necessária.', 401);
    }

    const post = await repositorioPublicacaoFeed.obterPorId(postId);
    if (!post) {
        throw new AppError('Post não encontrado para deleção.', 404);
    }

    if (post.author_id !== user.id) {
        throw new AppError('Usuário não autorizado a deletar este post.', 403);
    }

    return await repositorioPublicacaoFeed.remover(postId);
};

export default {
    criarPost,
    obterTodosOsPosts,
    obterPostPorId,
    atualizarPost,
    deletarPost,
};
