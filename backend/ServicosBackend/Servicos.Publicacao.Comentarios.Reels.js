
import RepositorioComentariosReels from '../Repositorios/Repositorio.Publicacao.Comentarios.Reels.js';

const createComment = async (commentData, reelId, userId) => {
    const data = { ...commentData, reel_id: reelId, user_id: userId };
    return RepositorioComentariosReels.create(data);
};

const getCommentsForReel = async (reelId, options) => {
    return RepositorioComentariosReels.getAllForReel(reelId, options);
};

const updateComment = async (commentId, updates, userId) => {
    const comment = await RepositorioComentariosReels.findById(commentId);
    if (!comment) {
        throw new Error('Comentário não encontrado.');
    }
    if (comment.user_id !== userId) {
        throw new Error('Você não tem permissão para editar este comentário.');
    }
    return RepositorioComentariosReels.update(commentId, updates);
};

const deleteComment = async (commentId, userId) => {
    const comment = await RepositorioComentariosReels.findById(commentId);
    if (!comment) {
        throw new Error('Comentário não encontrado.');
    }
    if (comment.user_id !== userId) {
        throw new Error('Você não tem permissão para deletar este comentário.');
    }
    return RepositorioComentariosReels.remove(commentId);
};

export default {
    createComment,
    getCommentsForReel,
    updateComment,
    deleteComment
};
