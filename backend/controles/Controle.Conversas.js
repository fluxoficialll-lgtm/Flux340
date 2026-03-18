
import servicoConversas from '../ServicosBackend/Servico.Conversas.js';
import ServicoRespostaHTTP from '../ServicosBackend/Servico.HTTP.Resposta.js';

const obterConversas = async (req, res) => {
    try {
        // O ID do usuário é obtido do token de autenticação, que já foi verificado
        const conversas = await servicoConversas.obterConversas(req.user.id);
        ServicoRespostaHTTP.sucesso(res, conversas, "Conversas obtidas com sucesso");
    } catch (error) {
        // Se houver algum erro, ele é passado para o próximo middleware de erro
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

export default {
    obterConversas,
};
