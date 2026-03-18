
import RepositorioPublicacaoComentariosReels from '../Repositorios/Repositorio.Publicacao.Comentarios.Reels.js';
import ServicoHTTPResposta from '../ServicosBackend/Servico.HTTP.Resposta.js';

const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { reelId } = req.params;
        const userId = req.user ? req.user.id : 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; 

        if (!content) {
            return ServicoHTTPResposta.requisicaoMalSucedida(res, "O conteúdo do comentário não pode estar vazio.");
        }

        const comment = await RepositorioPublicacaoComentariosReels.create({
            reel_id: reelId,
            user_id: userId,
            content
        });

        ServicoHTTPResposta.criado(res, comment);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        ServicoHTTPResposta.erro(res, "Erro interno no servidor ao criar comentário.", 500, error.message);
    }
};

const getCommentsForReel = async (req, res) => {
    try {
        const { reelId } = req.params;
        const comments = await RepositorioPublicacaoComentariosReels.getAllForReel(reelId, req.query);
        ServicoHTTPResposta.sucesso(res, comments);
    } catch (error) {
        console.error("Erro ao obter comentários:", error);
        ServicoHTTPResposta.erro(res, "Erro interno no servidor ao obter comentários.", 500, error.message);
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user ? req.user.id : 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

        const comment = await RepositorioPublicacaoComentariosReels.findById(commentId);
        if (!comment) {
            return ServicoHTTPResposta.naoEncontrado(res, "Comentário não encontrado.");
        }

        if (comment.author_id !== userId) {
            return ServicoHTTPResposta.naoAutorizado(res, "Usuário não autorizado a atualizar este comentário.");
        }

        const updatedComment = await RepositorioPublicacaoComentariosReels.update(commentId, { content });

        ServicoHTTPResposta.sucesso(res, updatedComment);
    } catch (error) {
        console.error("Erro ao atualizar comentário:", error);
        ServicoHTTPResposta.erro(res, "Erro interno no servidor ao atualizar comentário.", 500, error.message);
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user ? req.user.id : 'a1b2c3d4-e5f6-7890-1234-567890abcdef';

        const comment = await RepositorioPublicacaoComentariosReels.findById(commentId);
        if (!comment) {
            return ServicoHTTPResposta.naoEncontrado(res, "Comentário não encontrado.");
        }

        if (comment.author_id !== userId) {
            return ServicoHTTPResposta.naoAutorizado(res, "Usuário não autorizado a deletar este comentário.");
        }

        await RepositorioPublicacaoComentariosReels.remove(commentId);

        ServicoHTTPResposta.semConteudo(res);
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        ServicoHTTPResposta.erro(res, "Erro interno no servidor ao deletar comentário.", 500, error.message);
    }
};

export default {
    createComment,
    getCommentsForReel,
    updateComment,
    deleteComment
};
