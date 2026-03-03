
// backend/ServicosBackend/Servicos.Publicacao.Marketplace.js
import RepositorioMarketplace from '../Repositorios/Repositorio.Publicacao.Marketplace.js';

// Função auxiliar para verificar permissões do usuário
const verificarPermissoes = (userId, item) => {
    if (!item || !item.user_id) {
        throw new Error('Dados do item incompletos para verificação de permissão.');
    }
    return item.user_id === userId;
};

const criarItem = async (itemData, userId) => {
    // Lógica de negócio: validar dados essenciais antes de criar
    if (!itemData.title || !itemData.price || !itemData.category) {
        throw new Error('Título, preço e categoria são obrigatórios.');
    }
    
    const fullItemData = { ...itemData, user_id: userId };
    
    // Chama o repositório para criar o item
    return RepositorioMarketplace.criarItem(fullItemData);
};

const obterTodosItens = async (options) => {
    // Lógica de negócio: definir filtros/padrões para a busca
    const searchOptions = { limit: 20, offset: 0, ...options };
    return RepositorioMarketplace.encontrarTodosItens(searchOptions);
};

const obterItemPorId = async (itemId) => {
    if (!itemId || isNaN(parseInt(itemId))) {
        throw new Error('ID do item inválido.');
    }
    return RepositorioMarketplace.encontrarItemPorId(itemId);
};

const atualizarItem = async (itemId, updates, userId) => {
    if (!itemId || isNaN(parseInt(itemId))) {
        throw new Error('ID do item inválido para atualização.');
    }
    
    const item = await RepositorioMarketplace.encontrarItemPorId(itemId);
    if (!item) {
        throw new Error('Item não encontrado.');
    }

    // Lógica de negócio: verificar permissão antes de atualizar
    if (!verificarPermissoes(userId, item)) {
        throw new Error('Você não tem permissão para editar este item.');
    }

    return RepositorioMarketplace.atualizarItem(itemId, updates);
};

const deletarItem = async (itemId, userId) => {
    if (!itemId || isNaN(parseInt(itemId))) {
        throw new Error('ID do item inválido para exclusão.');
    }

    const item = await RepositorioMarketplace.encontrarItemPorId(itemId);
    if (!item) {
        throw new Error('Item não encontrado.');
    }

    // Lógica de negócio: verificar permissão antes de deletar
    if (!verificarPermissoes(userId, item)) {
        throw new Error('Você não tem permissão para deletar este item.');
    }

    await RepositorioMarketplace.deletarItem(itemId);
};

export default {
    criarItem,
    obterTodosItens,
    obterItemPorId,
    atualizarItem,
    deletarItem
};
