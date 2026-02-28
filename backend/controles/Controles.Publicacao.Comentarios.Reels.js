
import RepositorioPublicacaoComentariosReels from '../Repositorios/Repositorio.Publicacao.Comentarios.Reels.js';

const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const { reelId } = req.params;
        // ATENÇÃO: A autenticação do usuário precisa ser resolvida. Usando um ID provisório.
        const userId = req.user ? req.user.id : 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // ID de usuário provisório

        if (!content) {
            return res.status(400).json({ message: "O conteúdo do comentário não pode estar vazio." });
        }

        const comment = await RepositorioPublicacaoComentariosReels.create({
            reel_id: reelId,
            user_id: userId,
            content
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("Erro ao criar comentário:", error);
        res.status(500).json({ message: "Erro interno no servidor ao criar comentário.", error: error.message });
    }
};

const getCommentsForReel = async (req, res) => {
    try {
        const { reelId } = req.params;
        const comments = await RepositorioPublicacaoComentariosReels.getAllForReel(reelId, req.query);
        res.status(200).json(comments);
    } catch (error) {
        console.error("Erro ao obter comentários:", error);
        res.status(500).json({ message: "Erro interno no servidor ao obter comentários.", error: error.message });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { content } = req.body;
        const userId = req.user ? req.user.id : 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // ID de usuário provisório

        const comment = await RepositorioPublicacaoComentariosReels.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comentário não encontrado." });
        }

        if (comment.author_id !== userId) {
            return res.status(403).json({ message: "Usuário não autorizado a atualizar este comentário." });
        }

        const updatedComment = await RepositorioPublicacaoComentariosReels.update(commentId, { content });

        res.status(200).json(updatedComment);
    } catch (error) {
        console.error("Erro ao atualizar comentário:", error);
        res.status(500).json({ message: "Erro interno no servidor ao atualizar comentário.", error: error.message });
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user ? req.user.id : 'a1b2c3d4-e5f6-7890-1234-567890abcdef'; // ID de usuário provisório

        const comment = await RepositorioPublicacaoComentariosReels.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comentário não encontrado." });
        }

        if (comment.author_id !== userId) {
            return res.status(403).json({ message: "Usuário não autorizado a deletar este comentário." });
        }

        await RepositorioPublicacaoComentariosReels.remove(commentId);

        res.status(204).send();
    } catch (error) {
        console.error("Erro ao deletar comentário:", error);
        res.status(500).json({ message: "Erro interno no servidor ao deletar comentário.", error: error.message });
    }
};

export default {
    createComment,
    getCommentsForReel,
    updateComment,
    deleteComment
};
