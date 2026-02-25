
import { postRepositorio } from '../GerenciadoresDeDados/post.repositorio.js';

const postsControle = {
    /**
     * Cria uma nova publicação (post).
     */
    createPost: async (req, res) => {
        try {
            // O ID do usuário logado é injetado na requisição por um middleware de autenticação
            const authorId = req.user?.id;
            if (!authorId) {
                return res.status(401).json({ error: 'Usuário não autenticado. Faça o login para postar.' });
            }

            // Extrai os dados do corpo da requisição
            const { content, parentPostId, mediaUrl } = req.body;

            // Validação básica
            if (!content) {
                return res.status(400).json({ error: 'O conteúdo da postagem não pode estar vazio.' });
            }

            // Monta o objeto com os dados do post
            const postData = {
                authorId,
                content,
                parentPostId, // Será null se não for uma resposta
                mediaUrl,     // Será null se não houver mídia
            };

            // Chama o repositório para salvar o post no banco de dados
            const novoPost = await postRepositorio.create(postData);

            // Retorna o post recém-criado
            res.status(201).json(novoPost);

        } catch (error) {
            console.error("Erro ao criar postagem:", error);
            res.status(500).json({ error: 'Ocorreu um erro interno ao tentar criar a postagem.' });
        }
    },

    // ... (outros métodos como listPosts, deletePost, etc. podem ser recriados aqui quando necessário)
    // Por enquanto, vamos focar em deixar o createPost 100% funcional.
};

export default postsControle;
