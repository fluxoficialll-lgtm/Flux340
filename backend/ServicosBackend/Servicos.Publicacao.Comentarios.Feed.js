
// backend/ServicosBackend/Servicos.Publicacao.Comentarios.Feed.js
import RepositorioComentariosFeed from '../Repositorios/Repositorio.Publicacao.Comentarios.Feed.js';

const checkPermissions = (userId, comment) => {
    if (!comment || !comment.user_id) {
        throw new Error('Dados do comentário incompletos para verificação de permissão.');
    }
    return comment.user_id === userId;
};

const createComment = async (commentBody, postId, userId) => {
    const { content } = commentBody;
    if (!content) {
        throw new Error('O conteúdo do comentário não pode estar vazio.');
    }

    const commentData = { post_id: postId, user_id: userId, content };
    return RepositorioComentariosFeed.createComment(commentData);
};

const getCommentsForPost = async (postId, options) => {
    if (!postId) {
        throw new Error('O ID do post é necessário para buscar os comentários.');
    }
    const queryOptions = { limit: 10, offset: 0, ...options };
    return RepositorioComentariosFeed.findCommentsByPostId(postId, queryOptions);
};

const updateComment = async (commentId, updates, userId) => {
    const { content } = updates;
    if (!content) {
        throw new Error('O conteúdo para atualização não pode ser vazio.');
    }

    const comment = await RepositorioComentariosFeed.findCommentById(commentId);
    if (!comment) {
        throw new Error('Comentário não encontrado.');
    }

    if (!checkPermissions(userId, comment)) {
        throw new Error('Você não tem permissão para editar este comentário.');
    }

    return RepositorioComentariosFeed.updateComment(commentId, { content });
};

const deleteComment = async (commentId, userId) => {
    const comment = await RepositorioComentariosFeed.findCommentById(commentId);
    if (!comment) {
        throw new Error('Comentário não encontrado.');
    }

    if (!checkPermissions(userId, comment)) {
        throw new Error('Você não tem permissão para deletar este comentário.');
    }

    await RepositorioComentariosFeed.deleteComment(commentId);
};

export default {
    createComment,
    getCommentsForPost,
    updateComment,
    deleteComment
};
