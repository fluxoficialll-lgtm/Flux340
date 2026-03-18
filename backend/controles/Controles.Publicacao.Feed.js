
// backend/controles/Controles.Publicacao.Feed.js

import servicoPublicacaoFeed from '../ServicosBackend/Servicos.Publicacao.Feed.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

const criarPost = async (req, res) => {
    try {
        const postData = { ...req.body };
        const post = await servicoPublicacaoFeed.criarPost(postData, req.user);
        ServicoHTTPResposta.criado(res, post);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 400, error);
    }
};

const obterTodosOsPosts = async (req, res) => {
    try {
        const posts = await servicoPublicacaoFeed.obterTodosOsPosts(req.query);
        ServicoHTTPResposta.sucesso(res, posts);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error);
    }
};

const obterPostPorId = async (req, res) => {
    try {
        const post = await servicoPublicacaoFeed.obterPostPorId(req.params.postId);
        ServicoHTTPResposta.sucesso(res, post);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 404, error);
    }
};

const atualizarPost = async (req, res) => {
    try {
        const updatedPost = await servicoPublicacaoFeed.atualizarPost(req.params.postId, req.body, req.user);
        ServicoHTTPResposta.sucesso(res, updatedPost);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 400, error);
    }
};

const deletarPost = async (req, res) => {
    try {
        await servicoPublicacaoFeed.deletarPost(req.params.postId, req.user);
        ServicoHTTPResposta.sucesso(res, null, "Post deletado com sucesso.");
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 403, error);
    }
};

export default {
    criarPost,
    obterTodosOsPosts,
    obterPostPorId,
    atualizarPost,
    deletarPost,
};
