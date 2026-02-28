
// backend/database/GestãoDeDados/PostgreSQL/Consultas.Publicacao.Feed.js

import feedRepository from '../../../Repositorios/Repositorio.Publicacao.Feed.js';

// A validação de dados de entrada acontece aqui
const validatePostData = (data) => {
    if (!data.content || typeof data.content !== 'string' || data.content.trim().length === 0) {
        throw new Error('O conteúdo do post é obrigatório.');
    }
    if (!data.userId) {
        throw new Error('A identidade do usuário é inválida.');
    }
    return true;
};

const createPost = async (postData) => {
    validatePostData(postData);
    // Esta camada prepara os dados e os envia para o repositório
    try {
        return await feedRepository.create(postData);
    } catch (error) {
        console.error('Erro na camada de gestão de dados (createPost):', error);
        // Pode-se lançar um erro mais específico de negócio aqui
        throw new Error('Falha ao processar a criação do post.');
    }
};

const getAllPosts = async (options) => {
    // A camada de gestão pode processar as opções (paginação, filtros) antes de passá-las ao repositório
    try {
        return await feedRepository.findAll(options);
    } catch (error) {
        console.error('Erro na camada de gestão de dados (getAllPosts):', error);
        throw new Error('Falha ao processar a busca dos posts.');
    }
};

const getPostById = async (postId) => {
    // Validação de formato do ID
    if (!postId || isNaN(parseInt(postId))) {
        throw new Error('ID de post inválido.');
    }
    try {
        return await feedRepository.findById(postId);
    } catch (error) {
        console.error('Erro na camada de gestão de dados (getPostById):', error);
        throw new Error('Falha ao processar a busca do post.');
    }
};

const updatePost = async (postId, postData) => {
    // Validação de formato do ID
    if (!postId || isNaN(parseInt(postId))) {
        throw new Error('ID de post inválido.');
    }
    // Pode validar o conteúdo de postData aqui também

    try {
        return await feedRepository.update(postId, postData);
    } catch (error) {
        console.error('Erro na camada de gestão de dados (updatePost):', error);
        throw new Error('Falha ao processar a atualização do post.');
    }
};

const deletePost = async (postId) => {
    // Validação de formato do ID
    if (!postId || isNaN(parseInt(postId))) {
        throw new Error('ID de post inválido.');
    }

    try {
        return await feedRepository.remove(postId);
    } catch (error) {
        console.error('Erro na camada de gestão de dados (deletePost):', error);
        throw new Error('Falha ao processar a deleção do post.');
    }
};

export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
};
