
import servicoConversas from '../ServicosBackend/Servico.Conversas.js';

const obterConversas = async (req, res, next) => {
    try {
        // O ID do usuário é obtido do token de autenticação, que já foi verificado
        const conversas = await servicoConversas.obterConversas(req.user.id);
        res.json(conversas);
    } catch (error) {
        // Se houver algum erro, ele é passado para o próximo middleware de erro
        next(error);
    }
};

export default {
    obterConversas,
};
