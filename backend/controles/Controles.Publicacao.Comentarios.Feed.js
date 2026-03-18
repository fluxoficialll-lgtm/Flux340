
// backend/controles/Controles.Publicacao.Comentarios.Feed.js
import ServicoComentariosFeed from '../ServicosBackend/Servicos.Publicacao.Comentarios.Feed.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

const criarComentario = async (req, res) => {
    try {
        const { postId } = req.params;
        const comentario = await ServicoComentariosFeed.criarComentario(req.body, postId, req.user.id);
        ServicoHTTPResposta.criado(res, comentario);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error);
    }
};

const obterComentariosPorPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comentarios = await ServicoComentariosFeed.obterComentariosPorPostId(postId, req.query);
        ServicoHTTPResposta.sucesso(res, comentarios);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error);
    }
};

const atualizarComentario = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comentarioAtualizado = await ServicoComentariosFeed.atualizarComentario(commentId, req.body, req.user.id);
        ServicoHTTPResposta.sucesso(res, comentarioAtualizado);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error);
    }
};

const deletarComentario = async (req, res) => {
    try {
        const { commentId } = req.params;
        await ServicoComentariosFeed.deletarComentario(commentId, req.user.id);
        ServicoHTTPResposta.semConteudo(res);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error);
    }
};

export default {
    criarComentario,
    obterComentariosPorPostId,
    atualizarComentario,
    deletarComentario
};
