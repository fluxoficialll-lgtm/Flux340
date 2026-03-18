
import { createLogger } from '../ServicosBackend/Logger.js';
import ServicoComentariosReels from '../ServicosBackend/Servicos.Publicacao.Comentarios.Reels.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

const logger = createLogger('ReelsComments');

const createComment = async (req, res) => {
    const { reelId } = req.params;
    const userId = req.user.id;
    logger.info('REEL_COMMENT_CREATE_START', { reelId, userId });
    try {
        const comment = await ServicoComentariosReels.createComment(req.body, reelId, userId);
        logger.info('REEL_COMMENT_CREATE_SUCCESS', { commentId: comment.id, reelId, userId });
        ServicoHTTPResposta.criado(res, comment);
    } catch (error) {
        logger.error('REEL_COMMENT_CREATE_ERROR', error, { reelId, userId, data: req.body });
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error.message);
    }
};

const getCommentsForReel = async (req, res) => {
    const { reelId } = req.params;
    logger.info('REEL_COMMENTS_GET_START', { reelId });
    try {
        const comments = await ServicoComentariosReels.getCommentsForReel(reelId, req.query);
        logger.info('REEL_COMMENTS_GET_SUCCESS', { reelId, count: comments.length });
        ServicoHTTPResposta.sucesso(res, comments);
    } catch (error) {
        logger.error('REEL_COMMENTS_GET_ERROR', error, { reelId });
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error.message);
    }
};

const updateComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    logger.info('REEL_COMMENT_UPDATE_START', { commentId, userId });
    try {
        const updatedComment = await ServicoComentariosReels.updateComment(commentId, req.body, userId);
        logger.info('REEL_COMMENT_UPDATE_SUCCESS', { commentId, userId });
        ServicoHTTPResposta.sucesso(res, updatedComment);
    } catch (error) {
        logger.error('REEL_COMMENT_UPDATE_ERROR', error, { commentId, userId, data: req.body });
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error.message);
    }
};

const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    logger.info('REEL_COMMENT_DELETE_START', { commentId, userId });
    try {
        await ServicoComentariosReels.deleteComment(commentId, userId);
        logger.info('REEL_COMMENT_DELETE_SUCCESS', { commentId, userId });
        ServicoHTTPResposta.semConteudo(res);
    } catch (error) {
        logger.error('REEL_COMMENT_DELETE_ERROR', error, { commentId, userId });
        ServicoHTTPResposta.erro(res, error.message, error.statusCode || 500, error.message);
    }
};

export default {
    createComment,
    getCommentsForReel,
    updateComment,
    deleteComment
};
