
// backend/ServicosBackend/Servicos.Publicacao.Marketplace.js
import RepositorioMarketplace from '../Repositorios/Repositorio.Publicacao.Marketplace.js';

// Função auxiliar para verificar permissões do usuário
const checkPermissions = (userId, item) => {
    if (!item || !item.user_id) {
        throw new Error('Dados do item incompletos para verificação de permissão.');
    }
    return item.user_id === userId;
};

const createItem = async (itemData, userId) => {
    // Lógica de negócio: validar dados essenciais antes de criar
    if (!itemData.title || !itemData.price || !itemData.category) {
        throw new Error('Título, preço e categoria são obrigatórios.');
    }
    
    const fullItemData = { ...itemData, user_id: userId };
    
    // Chama o repositório para criar o item
    return RepositorioMarketplace.createItem(fullItemData);
};

const getAllItems = async (options) => {
    // Lógica de negócio: definir filtros/padrões para a busca
    const searchOptions = { limit: 20, offset: 0, ...options };
    return RepositorioMarketplace.findAllItems(searchOptions);
};

const getItemById = async (itemId) => {
    if (!itemId || isNaN(parseInt(itemId))) {
        throw new Error('ID do item inválido.');
    }
    return RepositorioMarketplace.findItemById(itemId);
};

const updateItem = async (itemId, updates, userId) => {
    if (!itemId || isNaN(parseInt(itemId))) {
        throw new Error('ID do item inválido para atualização.');
    }
    
    const item = await RepositorioMarketplace.findItemById(itemId);
    if (!item) {
        throw new Error('Item não encontrado.');
    }

    // Lógica de negócio: verificar permissão antes de atualizar
    if (!checkPermissions(userId, item)) {
        throw new Error('Você não tem permissão para editar este item.');
    }

    return RepositorioMarketplace.updateItem(itemId, updates);
};

const deleteItem = async (itemId, userId) => {
    if (!itemId || isNaN(parseInt(itemId))) {
        throw new Error('ID do item inválido para exclusão.');
    }

    const item = await RepositorioMarketplace.findItemById(itemId);
    if (!item) {
        throw new Error('Item não encontrado.');
    }

    // Lógica de negócio: verificar permissão antes de deletar
    if (!checkPermissions(userId, item)) {
        throw new Error('Você não tem permissão para deletar este item.');
    }

    await RepositorioMarketplace.deleteItem(itemId);
};

export default {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};
