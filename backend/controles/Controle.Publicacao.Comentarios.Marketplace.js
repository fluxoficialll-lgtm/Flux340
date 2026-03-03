
import ServicoComentariosMarketplace from '../ServicosBackend/Servicos.Publicacao.Comentarios.Marketplace.js';

const criarComentario = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id;
        const { content } = req.body;

        const novoComentario = await ServicoComentariosMarketplace.criarComentario(itemId, userId, content);
        res.status(201).json(novoComentario);
    } catch (error) {
        console.error('Erro ao criar comentário no marketplace:', error);
        res.status(500).json({ message: error.message });
    }
};

const obterComentariosPorItemId = async (req, res) => {
    try {
        const { itemId } = req.params;
        const comentarios = await ServicoComentariosMarketplace.obterComentariosPorItemId(itemId);
        res.status(200).json(comentarios);
    } catch (error) {
        console.error('Erro ao buscar comentários do marketplace:', error);
        res.status(500).json({ message: error.message });
    }
};

const atualizarComentario = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
        const { content } = req.body;

        const comentarioAtualizado = await ServicoComentariosMarketplace.atualizarComentario(commentId, userId, content);
        res.status(200).json(comentarioAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar comentário no marketplace:', error);
        res.status(500).json({ message: error.message });
    }
};

const deletarComentario = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        await ServicoComentariosMarketplace.deletarComentario(commentId, userId);
        res.status(204).send();
    } catch (error) {
        console.error('Erro ao deletar comentário no marketplace:', error);
        res.status(500).json({ message: error.message });
    }
};

export default {
    criarComentario,
    obterComentariosPorItemId,
    atualizarComentario,
    deletarComentario
};
