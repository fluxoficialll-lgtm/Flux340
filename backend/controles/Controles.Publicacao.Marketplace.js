
// backend/controles/Controles.Publicacao.Marketplace.js
import ServicoMarketplace from '../ServicosBackend/Servicos.Publicacao.Marketplace.js';

const criarItem = async (req, res) => {
    try {
        const item = await ServicoMarketplace.criarItem(req.body, req.user.id);
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const obterTodosItens = async (req, res) => {
    try {
        const items = await ServicoMarketplace.obterTodosItens(req.query);
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const obterItemPorId = async (req, res) => {
    try {
        const item = await ServicoMarketplace.obterItemPorId(req.params.itemId);
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrado.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const atualizarItem = async (req, res) => {
    try {
        const updatedItem = await ServicoMarketplace.atualizarItem(req.params.itemId, req.body, req.user.id);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deletarItem = async (req, res) => {
    try {
        await ServicoMarketplace.deletarItem(req.params.itemId, req.user.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    criarItem,
    obterTodosItens,
    obterItemPorId,
    atualizarItem,
    deletarItem
};
