
import ServicoComentariosMarketplace from '../ServicosBackend/Servicos.Publicacao.Comentarios.Marketplace.js';
import ServicoRespostaHTTP from '../ServicosBackend/Servico.HTTP.Resposta.js';

const criarComentario = async (req, res) => {
    try {
        const { itemId } = req.params;
        const userId = req.user.id;
        const { content } = req.body;

        const novoComentario = await ServicoComentariosMarketplace.criarComentario(itemId, userId, content);
        ServicoRespostaHTTP.criado(res, novoComentario, "Comentário criado com sucesso");
    } catch (error) {
        console.error('Erro ao criar comentário no marketplace:', error);
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

const obterComentariosPorItemId = async (req, res) => {
    try {
        const { itemId } = req.params;
        const comentarios = await ServicoComentariosMarketplace.obterComentariosPorItemId(itemId);
        ServicoRespostaHTTP.sucesso(res, comentarios);
    } catch (error) {
        console.error('Erro ao buscar comentários do marketplace:', error);
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

const atualizarComentario = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;
        const { content } = req.body;

        const comentarioAtualizado = await ServicoComentariosMarketplace.atualizarComentario(commentId, userId, content);
        ServicoRespostaHTTP.sucesso(res, comentarioAtualizado, "Comentário atualizado com sucesso");
    } catch (error) {
        console.error('Erro ao atualizar comentário no marketplace:', error);
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

const deletarComentario = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user.id;

        await ServicoComentariosMarketplace.deletarComentario(commentId, userId);
        ServicoRespostaHTTP.sucesso(res, null, "Comentário deletado com sucesso");
    } catch (error) {
        console.error('Erro ao deletar comentário no marketplace:', error);
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

export default {
    criarComentario,
    obterComentariosPorItemId,
    atualizarComentario,
    deletarComentario
};
