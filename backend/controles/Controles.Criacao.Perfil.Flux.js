
import servicoCriacaoPerfil from '../ServicosBackend/Servicos.Criacao.Perfil.Flux.js';
import ServicoRespostaHTTP from '../ServicosBackend/Servico.HTTP.Resposta.js';

const buscarPerfil = async (req, res) => {
    try {
        const perfil = await servicoCriacaoPerfil.PossibilidadeBuscarPerfil(req.user.id);
        if (!perfil) {
            return ServicoRespostaHTTP.naoEncontrado(res, 'Perfil não encontrado.');
        }
        ServicoRespostaHTTP.sucesso(res, perfil);
    } catch (error) {
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

const buscarPerfilPublico = async (req, res) => {
    try {
        const perfil = await servicoCriacaoPerfil.PossibilidadeBuscarPerfil(req.params.userId);
        if (!perfil) {
            return ServicoRespostaHTTP.naoEncontrado(res, 'Perfil público não encontrado.');
        }
        ServicoRespostaHTTP.sucesso(res, perfil);
    } catch (error) {
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

const atualizarPerfil = async (req, res) => {
    try {
        const perfilAtualizado = await servicoCriacaoPerfil.PossibilidadeAtualizarPerfil(req.user.id, req.body, req.user);
        ServicoRespostaHTTP.sucesso(res, perfilAtualizado, "Perfil atualizado com sucesso");
    } catch (error) {
        // Nota: O erro de conflito (409) será tratado como um erro genérico (500) pelo serviço de resposta.
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

const deletarPerfil = async (req, res) => {
    try {
        await servicoCriacaoPerfil.PossibilidadeDeletarPerfil(req.user.id, req.user);
        // Nota: A resposta 204 (No Content) foi substituída por uma resposta de sucesso (200) com dados nulos.
        ServicoRespostaHTTP.sucesso(res, null, "Perfil deletado com sucesso");
    } catch (error) {
        ServicoRespostaHTTP.erro(res, error.message);
    }
};

export default {
    buscarPerfil,
    atualizarPerfil,
    deletarPerfil,
    buscarPerfilPublico,
};
