
// backend/controles/Controles.Publicacao.Marketplace.js
import { createLogger } from '../ServicosBackend/Logger.js';
import ServicoMarketplace from '../ServicosBackend/Servicos.Publicacao.Marketplace.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

const logger = createLogger('Marketplace');

const criarItem = async (req, res) => {
    const userId = req.user.id;
    logger.info('ITEM_CREATE_START', { userId });
    try {
        const item = await ServicoMarketplace.criarItem(req.body, userId);
        logger.info('ITEM_CREATE_SUCCESS', { itemId: item.id, userId });
        ServicoHTTPResposta.criado(res, item);
    } catch (error) {
        logger.error('ITEM_CREATE_ERROR', error, { userId, data: req.body });
        ServicoHTTPResposta.erro(res, error.message, 400, error.message);
    }
};

const obterTodosItens = async (req, res) => {
    logger.info('ITEMS_GET_ALL_START');
    try {
        const items = await ServicoMarketplace.obterTodosItens(req.query);
        logger.info('ITEMS_GET_ALL_SUCCESS', { count: items.length });
        ServicoHTTPResposta.sucesso(res, items);
    } catch (error) {
        logger.error('ITEMS_GET_ALL_ERROR', error);
        ServicoHTTPResposta.erro(res, error.message, 500, error.message);
    }
};

const obterItemPorId = async (req, res) => {
    const { itemId } = req.params;
    logger.info('ITEM_GET_BY_ID_START', { itemId });
    try {
        const item = await ServicoMarketplace.obterItemPorId(itemId);
        if (!item) {
            logger.warn('ITEM_GET_BY_ID_NOT_FOUND', { itemId });
            return ServicoHTTPResposta.naoEncontrado(res, 'Item não encontrado.');
        }
        logger.info('ITEM_GET_BY_ID_SUCCESS', { itemId });
        ServicoHTTPResposta.sucesso(res, item);
    } catch (error) {
        logger.error('ITEM_GET_BY_ID_ERROR', error, { itemId });
        ServicoHTTPResposta.erro(res, error.message, 500, error.message);
    }
};

const atualizarItem = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user.id;
    logger.info('ITEM_UPDATE_START', { itemId, userId });
    try {
        const updatedItem = await ServicoMarketplace.atualizarItem(itemId, req.body, userId);
        logger.info('ITEM_UPDATE_SUCCESS', { itemId, userId });
        ServicoHTTPResposta.sucesso(res, updatedItem);
    } catch (error) {
        logger.error('ITEM_UPDATE_ERROR', error, { itemId, userId, data: req.body });
        ServicoHTTPResposta.erro(res, error.message, 400, error.message);
    }
};

const deletarItem = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user.id;
    logger.info('ITEM_DELETE_START', { itemId, userId });
    try {
        await ServicoMarketplace.deletarItem(itemId, userId);
        logger.info('ITEM_DELETE_SUCCESS', { itemId, userId });
        ServicoHTTPResposta.semConteudo(res);
    } catch (error) {
        logger.error('ITEM_DELETE_ERROR', error, { itemId, userId });
        ServicoHTTPResposta.erro(res, error.message, 400, error.message);
    }
};

export default {
    criarItem,
    obterTodosItens,
    obterItemPorId,
    atualizarItem,
    deletarItem
};
