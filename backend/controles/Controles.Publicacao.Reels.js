
// backend/controles/Controles.Publicacao.Reels.js
import ServicoReels from '../ServicosBackend/Servicos.Publicacao.Reels.js';

const createReel = async (req, res) => {
    try {
        const reel = await ServicoReels.createReel(req.body, req.user.id);
        res.status(201).json(reel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAllReels = async (req, res) => {
    try {
        const reels = await ServicoReels.getAllReels(req.query);
        res.status(200).json(reels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getReelById = async (req, res) => {
    try {
        const reel = await ServicoReels.getReelById(req.params.reelId);
        if (!reel) {
            return res.status(404).json({ message: 'Reel não encontrado.' });
        }
        res.status(200).json(reel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateReel = async (req, res) => {
    try {
        const updatedReel = await ServicoReels.updateReel(req.params.reelId, req.body, req.user.id);
        res.status(200).json(updatedReel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteReel = async (req, res) => {
    try {
        await ServicoReels.deleteReel(req.params.reelId, req.user.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    createReel,
    getAllReels,
    getReelById,
    updateReel,
    deleteReel
};
