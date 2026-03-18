
// backend/controles/Controles.Publicacao.Marketplace.js
import ServicoMarketplace from '../ServicosBackend/Servicos.Publicacao.Marketplace.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

const criarItem = async (req, res) => {
    try {
        const item = await ServicoMarketplace.criarItem(req.body, req.user.id);
        ServicoHTTPResposta.criado(res, item);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

const obterTodosItens = async (req, res) => {
    try {
        const items = await ServicoMarketplace.obterTodosItens(req.query);
        ServicoHTTPResposta.sucesso(res, items);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 500, error);
    }
};

const obterItemPorId = async (req, res) => {
    try {
        const item = await ServicoMarketplace.obterItemPorId(req.params.itemId);
        if (!item) {
            return ServicoHTTPResposta.naoEncontrado(res, 'Item não encontrado.');
        }
        ServicoHTTPResposta.sucesso(res, item);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 500, error);
    }
};

const atualizarItem = async (req, res) => {
    try {
        const updatedItem = await ServicoMarketplace.atualizarItem(req.params.itemId, req.body, req.user.id);
        ServicoHTTPResposta.sucesso(res, updatedItem);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

const deletarItem = async (req, res) => {
    try {
        await ServicoMarketplace.deletarItem(req.params.itemId, req.user.id);
        ServicoHTTPResposta.semConteudo(res);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

export default {
    criarItem,
    obterTodosItens,
    obterItemPorId,
    atualizarItem,
    deletarItem
};
