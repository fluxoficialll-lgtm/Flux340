
// backend/controles/Controles.Publicacao.Feed.js

import servicoPublicacaoFeed from '../ServicosBackend/Servicos.Publicacao.Feed.js';

const criarPost = async (req, res) => {
    try {
        const postData = { ...req.body };
        const post = await servicoPublicacaoFeed.criarPost(postData, req.user);
        res.status(201).json(post);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};

const obterTodosOsPosts = async (req, res) => {
    try {
        const posts = await servicoPublicacaoFeed.obterTodosOsPosts(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const obterPostPorId = async (req, res) => {
    try {
        const post = await servicoPublicacaoFeed.obterPostPorId(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

const atualizarPost = async (req, res) => {
    try {
        const updatedPost = await servicoPublicacaoFeed.atualizarPost(req.params.postId, req.body, req.user);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};

const deletarPost = async (req, res) => {
    try {
        await servicoPublicacaoFeed.deletarPost(req.params.postId, req.user);
        res.status(200).json({ message: "Post deletado com sucesso." });
    } catch (error) {
        res.status(error.statusCode || 403).json({ message: error.message });
    }
};

export default {
    criarPost,
    obterTodosOsPosts,
    obterPostPorId,
    atualizarPost,
    deletarPost,
};
