
import { createLogger } from '../ServicosBackend/Logger.js';
import servicoCriacaoPerfil from '../ServicosBackend/Servicos.Criacao.Perfil.Flux.js';
import ServicoRespostaHTTP from '../ServicosBackend/Servico.HTTP.Resposta.js';
import { validarPerfil } from '../validators/Validator.Estrutura.Perfil.Flux.js';

const logger = createLogger('Profile');

const buscarPerfil = async (req, res) => {
    const userId = req.user.id;
    logger.info('PROFILE_GET_PRIVATE_START', { userId });

    try {
        const perfil = await servicoCriacaoPerfil.PossibilidadeBuscarPerfil(userId);
        if (!perfil) {
            logger.warn('PROFILE_GET_PRIVATE_NOT_FOUND', { userId });
            return ServicoRespostaHTTP.naoEncontrado(res, 'Perfil não encontrado.');
        }
        logger.info('PROFILE_GET_PRIVATE_SUCCESS', { userId });
        return ServicoRespostaHTTP.sucesso(res, perfil);
    } catch (error) {
        logger.error('PROFILE_GET_PRIVATE_ERROR', error, { userId });
        return ServicoRespostaHTTP.erro(res, 'Falha ao buscar perfil.', 500, error.message);
    }
};

const buscarPerfilPublico = async (req, res) => {
    const { userId } = req.params;
    logger.info('PROFILE_GET_PUBLIC_START', { userId });

    try {
        const perfil = await servicoCriacaoPerfil.PossibilidadeBuscarPerfil(userId);
        if (!perfil) {
            logger.warn('PROFILE_GET_PUBLIC_NOT_FOUND', { userId });
            return ServicoRespostaHTTP.naoEncontrado(res, 'Perfil público não encontrado.');
        }
        logger.info('PROFILE_GET_PUBLIC_SUCCESS', { userId });
        return ServicoRespostaHTTP.sucesso(res, perfil);
    } catch (error) {
        logger.error('PROFILE_GET_PUBLIC_ERROR', error, { userId });
        return ServicoRespostaHTTP.erro(res, 'Falha ao buscar perfil público.', 500, error.message);
    }
};

const atualizarPerfil = async (req, res) => {
    const userId = req.user.id;
    const { error } = validarPerfil(req.body);
    if (error) {
        return ServicoRespostaHTTP.requisiçãoInválida(res, error.details[0].message);
    }

    logger.info('PROFILE_UPDATE_START', { userId });

    try {
        const perfilAtualizado = await servicoCriacaoPerfil.PossibilidadeAtualizarPerfil(userId, req.body, req.user);
        logger.info('PROFILE_UPDATE_SUCCESS', { userId });
        return ServicoRespostaHTTP.sucesso(res, perfilAtualizado, "Perfil atualizado com sucesso");
    } catch (error) {
        logger.error('PROFILE_UPDATE_ERROR', error, { userId, data: req.body });
        // O serviço pode lançar erros específicos (ex: conflito de nome de usuário)
        if (error.message.includes("nome de usuário já existe")) {
            return ServicoRespostaHTTP.erro(res, error.message, 409);
        }
        return ServicoRespostaHTTP.erro(res, 'Falha ao atualizar perfil.', 500, error.message);
    }
};

const deletarPerfil = async (req, res) => {
    const userId = req.user.id;
    logger.info('PROFILE_DELETE_START', { userId });

    try {
        await servicoCriacaoPerfil.PossibilidadeDeletarPerfil(userId, req.user);
        logger.info('PROFILE_DELETE_SUCCESS', { userId });
        return ServicoRespostaHTTP.sucesso(res, null, "Perfil deletado com sucesso");
    } catch (error) {
        logger.error('PROFILE_DELETE_ERROR', error, { userId });
        return ServicoRespostaHTTP.erro(res, 'Falha ao deletar perfil.', 500, error.message);
    }
};

export default {
    buscarPerfil,
    atualizarPerfil,
    deletarPerfil,
    buscarPerfilPublico,
};
