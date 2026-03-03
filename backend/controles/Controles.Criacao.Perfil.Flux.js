
// backend/controles/Controles.Criação.Perfil.Flux.js

import servicoCriacaoPerfil from '../ServicosBackend/Servicos.Criacao.Perfil.Flux.js';

const buscarPerfil = async (req, res, next) => {
    try {
        const perfil = await servicoCriacaoPerfil.PossibilidadeBuscarPerfil(req.user.id);
        if (!perfil) {
            return res.status(404).json({ message: 'Perfil não encontrado.' });
        }
        res.json(perfil);
    } catch (error) {
        next(error);
    }
};

const atualizarPerfil = async (req, res, next) => {
    try {
        // A lógica de upsert (atualizar ou criar) agora está no repositório,
        // então não precisamos mais verificar se o perfil existe aqui.
        const perfilAtualizado = await servicoCriacaoPerfil.PossibilidadeAtualizarPerfil(req.user.id, req.body, req.user);
        res.json(perfilAtualizado);
    } catch (error) {
        if (error.message.includes('nickname')) {
            return res.status(409).json({ message: error.message });
        }
        next(error);
    }
};

const deletarPerfil = async (req, res, next) => {
    try {
        await servicoCriacaoPerfil.PossibilidadeDeletarPerfil(req.user.id, req.user);
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export default {
    buscarPerfil,
    atualizarPerfil,
    deletarPerfil,
};
