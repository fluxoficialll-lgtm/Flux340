
// backend/ServicosBackend/Servicos.Criacao.Perfil.Flux.js

import repositorio from '../Repositorios/Repositorio.Criacao.Perfil.Flux.js';
import servicoAuditoria from './Servico.Auditoria.Criar.Perfil.js';
import Perfil from '../models/Models.Estrutura.Perfil.Flux.js';

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

const PossibilidadeBuscarPerfil = async (userId) => {
    if (!userId) {
        throw new AppError('ID do usuário não fornecido.', 400);
    }
    const perfilDb = await repositorio.PossibilidadeBuscarUsuarioPorId(userId);
    if (!perfilDb) {
        throw new AppError('Perfil não encontrado.', 404);
    }
    const perfil = Perfil.deBancoDeDados(perfilDb);
    return perfil.paraRespostaHttp();
};

const PossibilidadeAtualizarPerfil = async (userId, profileData, user) => {
    if (!user || user.id !== userId) {
        throw new AppError('Não autorizado a atualizar este perfil.', 403);
    }

    const perfilAtualDb = await repositorio.PossibilidadeBuscarUsuarioPorId(userId);

    const perfilParaAtualizar = new Perfil({
        usuarioId: userId,
        nome: profileData.name,
        apelido: profileData.nickname,
        bio: profileData.bio,
        urlFoto: profileData.photoUrl,
        site: profileData.website,
        privado: profileData.isPrivate,
        perfilCompleto: profileData.profile_completed
    });

    const dadosParaBanco = perfilParaAtualizar.paraBancoDeDados();
    const perfilAtualizadoDb = await repositorio.PossibilidadeAtualizarPerfil(userId, dadosParaBanco);
    const perfilAtualizado = Perfil.deBancoDeDados(perfilAtualizadoDb);

    // Auditoria da atualização do perfil
    const perfilAntigoHttp = perfilAtualDb ? Perfil.deBancoDeDados(perfilAtualDb).paraRespostaHttp() : null;
    servicoAuditoria.registrar('UPDATE', user.id, 'user_profiles', perfilAtualizado.id, perfilAntigoHttp, perfilAtualizado.paraRespostaHttp());

    return perfilAtualizado.paraRespostaHttp();
};

const PossibilidadeDeletarPerfil = async (userId, user) => {
    if (!user || user.id !== userId) {
        throw new AppError('Não autorizado a deletar este perfil.', 403);
    }

    const perfilDeletadoDb = await repositorio.PossibilidadeDeletarPerfil(userId);
    if (!perfilDeletadoDb) {
        throw new AppError('Perfil a ser deletado não encontrado.', 404);
    }

    const perfilDeletado = Perfil.deBancoDeDados(perfilDeletadoDb);

    // Auditoria da deleção do perfil
    servicoAuditoria.registrar('DELETE', user.id, 'user_profiles', perfilDeletado.id, perfilDeletado.paraRespostaHttp(), null);

    return perfilDeletado.paraRespostaHttp();
};

export default {
    PossibilidadeBuscarPerfil,
    PossibilidadeAtualizarPerfil,
    PossibilidadeDeletarPerfil
};
