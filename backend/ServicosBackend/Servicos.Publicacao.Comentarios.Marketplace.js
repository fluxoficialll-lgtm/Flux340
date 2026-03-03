
// backend/ServicosBackend/Servicos.Publicacao.Comentarios.Marketplace.js
import { RepositorioComentariosMarketplace } from '../Repositorios/Repositorio.Publicacao.Comentarios.Marketplace.js';

const criarComentario = async (itemId, userId, content) => {
    if (!content) {
        throw new Error('O conteúdo do comentário é obrigatório.');
    }
    return await RepositorioComentariosMarketplace.criarComentario(itemId, userId, content);
};

const obterComentariosPorItemId = async (itemId) => {
    return await RepositorioComentariosMarketplace.obterComentariosPorItemId(itemId);
};

const atualizarComentario = async (commentId, userId, content) => {
    if (!content) {
        throw new Error('O conteúdo do comentário é obrigatório para atualização.');
    }

    const comentario = await RepositorioComentariosMarketplace.encontrarComentarioPorId(commentId);
    if (!comentario) {
        throw new Error('Comentário não encontrado.');
    }

    if (comentario.user_id !== userId) {
        throw new Error('Acesso negado. Você só pode editar seus próprios comentários.');
    }

    return await RepositorioComentariosMarketplace.atualizarComentario(commentId, userId, content);
};

const deletarComentario = async (commentId, userId) => {
    const comentario = await RepositorioComentariosMarketplace.encontrarComentarioPorId(commentId);
    if (!comentario) {
        throw new Error('Comentário não encontrado.');
    }

    if (comentario.user_id !== userId) {
        throw new Error('Acesso negado. Você só pode deletar seus próprios comentários.');
    }

    return await RepositorioComentariosMarketplace.deletarComentario(commentId, userId);
};

export default {
    criarComentario,
    obterComentariosPorItemId,
    atualizarComentario,
    deletarComentario,
};
