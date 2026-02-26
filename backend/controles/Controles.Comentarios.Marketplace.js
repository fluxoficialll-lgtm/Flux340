
// Funções de controle para Comentários do Marketplace

// @desc    Criar um novo comentário em um item do marketplace
const createComment = (req, res) => {
    // O ID do item estará em req.params.itemId
    res.status(201).json({ message: `Rota para criar comentário no item do marketplace com ID ${req.params.itemId} funcionando!` });
};

// @desc    Obter todos os comentários de um item do marketplace
const getCommentsForItem = (req, res) => {
    res.status(200).json({ message: `Rota para obter todos os comentários do item do marketplace com ID ${req.params.itemId} funcionando!` });
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
    getCommentsForItem,
    updateComment,
    deleteComment
};
