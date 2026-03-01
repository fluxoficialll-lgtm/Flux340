
// backend/controles/Controles.Publicacao.Feed.js

import servicoPublicacaoFeed from '../ServicosBackend/Servicos.Publicacao.Feed.js';

const createPost = async (req, res) => {
    try {
        // O serviço agora é o ponto de entrada para a lógica de negócio
        const postData = { ...req.body }; // author_id será extraído nas camadas inferiores
        const post = await servicoPublicacaoFeed.createPost(postData, req.user); // Passando req.user para permissões
        res.status(201).json(post);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await servicoPublicacaoFeed.getAllPosts(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await servicoPublicacaoFeed.getPostById(req.params.postId);
        res.status(200).json(post);
    } catch (error) {
        res.status(error.statusCode || 404).json({ message: error.message });
    }
};

const updatePost = async (req, res) => {
    try {
        const updatedPost = await servicoPublicacaoFeed.updatePost(req.params.postId, req.body, req.user);
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(error.statusCode || 400).json({ message: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        await servicoPublicacaoFeed.deletePost(req.params.postId, req.user);
        res.status(200).json({ message: "Post deletado com sucesso." });
    } catch (error) {
        res.status(error.statusCode || 403).json({ message: error.message });
    }
};

export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
