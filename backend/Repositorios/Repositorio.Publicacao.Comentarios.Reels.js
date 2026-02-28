
import ComentariosReelsDB from '../database/GestãoDeDados/PostgreSQL/Consultas.Publicacao.Comentarios.Reels.js';

const create = async (commentData) => {
    return ComentariosReelsDB.create(commentData);
};

const getAllForReel = async (reelId, options) => {
    return ComentariosReelsDB.findByReelId(reelId, options);
};

const findById = async (commentId) => {
    return ComentariosReelsDB.findById(commentId);
};

const update = async (commentId, updates) => {
    return ComentariosReelsDB.update(commentId, updates);
};

const remove = async (commentId) => {
    return ComentariosReelsDB.remove(commentId);
};

export default {
    create,
    getAllForReel,
    findById,
    update,
    remove
};
