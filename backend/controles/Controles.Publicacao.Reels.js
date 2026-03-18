
// backend/controles/Controles.Publicacao.Reels.js
import ServicoReels from '../ServicosBackend/Servicos.Publicacao.Reels.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

const createReel = async (req, res) => {
    try {
        const reel = await ServicoReels.createReel(req.body, req.user.id);
        ServicoHTTPResposta.criado(res, reel);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

const getAllReels = async (req, res) => {
    try {
        const reels = await ServicoReels.getAllReels(req.query);
        ServicoHTTPResposta.sucesso(res, reels);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 500, error);
    }
};

const getReelById = async (req, res) => {
    try {
        const reel = await ServicoReels.getReelById(req.params.reelId);
        if (!reel) {
            return ServicoHTTPResposta.naoEncontrado(res, 'Reel não encontrado.');
        }
        ServicoHTTPResposta.sucesso(res, reel);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 500, error);
    }
};

const updateReel = async (req, res) => {
    try {
        const updatedReel = await ServicoReels.updateReel(req.params.reelId, req.body, req.user.id);
        ServicoHTTPResposta.sucesso(res, updatedReel);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

const deleteReel = async (req, res) => {
    try {
        await ServicoReels.deleteReel(req.params.reelId, req.user.id);
        ServicoHTTPResposta.semConteudo(res);
    } catch (error) {
        ServicoHTTPResposta.erro(res, error.message, 400, error);
    }
};

export default {
    createReel,
    getAllReels,
    getReelById,
    updateReel,
    deleteReel
};
