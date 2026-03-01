const { countLikes, countViews, countShares, countComments } = require('../../database/GestãoDeDados/PostgreSQL/Consultas.Metricas.Publicacao.Reels');

const getReelLikes = (reelId) => countLikes(reelId);
const getReelViews = (reelId) => countViews(reelId);
const getReelShares = (reelId) => countShares(reelId);
const getReelComments = (reelId) => countComments(reelId);

module.exports = {
    getReelLikes,
    getReelViews,
    getReelShares,
    getReelComments,
};
