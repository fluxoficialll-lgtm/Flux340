
// backend/ServicosBackend/Servicos.Criacao.Perfil.Flux.js

import repositorio from '../Repositorios/Repositorio.Criacao.Perfil.Flux.js';
import servicoAuditoria from './Servico.Auditoria.Criar.Perfil.js';

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
    const perfil = await repositorio.PossibilidadeBuscarUsuarioPorId(userId);
    if (!perfil) {
        throw new AppError('Perfil não encontrado.', 404);
    }
    return perfil;
};

const PossibilidadeAtualizarPerfil = async (userId, profileData, user) => {
    if (!user || user.id !== userId) {
        throw new AppError('Não autorizado a atualizar este perfil.', 403);
    }

    const perfilAtual = await repositorio.PossibilidadeBuscarUsuarioPorId(userId);
    if (!perfilAtual) {
        // Se não houver perfil, cria um novo em vez de lançar um erro.
        console.log(`[Serviço] Nenhum perfil existente para o usuário ${userId}. Um novo será criado.`);
    }

    const perfilAtualizado = await repositorio.PossibilidadeAtualizarPerfil(userId, profileData);

    // Auditoria da atualização do perfil
    servicoAuditoria.registrar('UPDATE', user.id, 'user_profiles', perfilAtualizado.id, perfilAtual, perfilAtualizado);

    return perfilAtualizado;
};

const PossibilidadeDeletarPerfil = async (userId, user) => {
    if (!user || user.id !== userId) {
        throw new AppError('Não autorizado a deletar este perfil.', 403);
    }

    const perfilDeletado = await repositorio.PossibilidadeDeletarPerfil(userId);
    if (!perfilDeletado) {
        throw new AppError('Perfil a ser deletado não encontrado.', 404);
    }

    // Auditoria da deleção do perfil
    servicoAuditoria.registrar('DELETE', user.id, 'user_profiles', perfilDeletado.id, perfilDeletado, null);

    return perfilDeletado;
};

export default {
    PossibilidadeBuscarPerfil,
    PossibilidadeAtualizarPerfil,
    PossibilidadeDeletarPerfil
};
