
// Funções de controle para Comentários de Posts

// @desc    Criar um novo comentário em um post
const createComment = (req, res) => {
    // O ID do Post estará em req.params.postId
    res.status(201).json({ message: `Rota para criar comentário no Post com ID ${req.params.postId} funcionando!` });
};

// @desc    Obter todos os comentários de um post
const getCommentsForPost = (req, res) => {
    res.status(200).json({ message: `Rota para obter todos os comentários do Post com ID ${req.params.postId} funcionando!` });
};

// @desc    Atualizar um comentário
const updateComment = (req, res) => {
    res.status(200).json({ message: `Rota para atualizar o comentário com ID ${req.params.commentId} funcionando!` });
};

// @desc    Deletar um comentário
const deleteComment = (req, res) => {
    res.status(200).json({ message: `Rota para deletar o comentário com ID ${req.params.commentId} funcionando!` });
};


export default {
    createComment,
    getCommentsForPost,
    updateComment,
    deleteComment
};
