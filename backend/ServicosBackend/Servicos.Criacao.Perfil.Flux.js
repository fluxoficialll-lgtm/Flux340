
// backend/ServicosBackend/Servicos.Criação.Perfil.Flux.js

import repositorioCriacaoPerfil from '../Repositorios/Repositorio.Criacao.Perfil.Flux.js';
import ServicoAuditoriaCriarPerfil from './Servico.Auditoria.Criar.Perfil.js';

const PossibilidadeBuscarPerfil = async (userId) => {
    // Esta função permanece, caso seja necessária em outro lugar
    return await repositorioCriacaoPerfil.PossibilidadeBuscarUsuarioPorId(userId);
};

const PossibilidadeAtualizarPerfil = async (userId, profileData, requestingUser) => {
    const auditoria = ServicoAuditoriaCriarPerfil;
    auditoria.iniciarProcesso(userId, requestingUser);

    const temPermissao = userId === requestingUser.id;
    auditoria.validacaoDePermissao(userId, requestingUser.id, temPermissao);
    
    if (!temPermissao) {
        const erro = new Error('Acesso negado. Você não tem permissão para atualizar este perfil.');
        auditoria.falhaNaGravacao(userId, erro, profileData);
        throw erro;
    }

    const { name, nickname } = profileData;
    const isProfileCompleted = !!(name && name.trim() && nickname && nickname.trim());
    
    const dataToUpdate = {
        ...profileData,
        profile_completed: isProfileCompleted
    };

    try {
        auditoria.tentativaDeGravacao(userId, dataToUpdate);
        
        // CORREÇÃO: Chamando a função de upsert correta no repositório
        const perfilAtualizado = await repositorioCriacaoPerfil.PossibilidadeAtualizarPerfil(userId, dataToUpdate);
        
        auditoria.sucessoNaGravacao(userId, perfilAtualizado);

        return perfilAtualizado;

    } catch (error) {
        auditoria.falhaNaGravacao(userId, error, dataToUpdate);
        throw error; 
    }
};

const PossibilidadeDeletarPerfil = async (userId, requestingUser) => {
    const temPermissao = userId === requestingUser.id;
    if (!temPermissao) {
        throw new Error('Acesso negado. Você não tem permissão para deletar este perfil.');
    }
    // A função de deletar pode continuar como está, se existir no repositório
    return await repositorioCriacaoPerfil.PossibilidadeDeletarPerfilPorIdUsuario(userId);
};

export default {
    PossibilidadeBuscarPerfil,
    PossibilidadeAtualizarPerfil,
    PossibilidadeDeletarPerfil,
};
