
// backend/controles/Controles.Publicacao.Marketplace.js
import ServicoMarketplace from '../ServicosBackend/Servicos.Publicacao.Marketplace.js';

const createItem = async (req, res) => {
    try {
        const item = await ServicoMarketplace.createItem(req.body, req.user.id);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllItems = async (req, res) => {
    try {
        const items = await ServicoMarketplace.getAllItems(req.query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await ServicoMarketplace.getItemById(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateItem = async (req, res) => {
    try {
        const updatedItem = await ServicoMarketplace.updateItem(req.params.itemId, req.body, req.user.id);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteItem = async (req, res) => {
    try {
        await ServicoMarketplace.deleteItem(req.params.itemId, req.user.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createItem,
    getAllItems,
    getItemById,
    updateItem,
    deleteItem
};
