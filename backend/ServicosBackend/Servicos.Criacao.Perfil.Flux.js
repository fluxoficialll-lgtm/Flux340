
// backend/ServicosBackend/Servicos.Criação.Perfil.Flux.js

import repositorioCriacaoPerfil from '../Repositorios/Repositorio.Criacao.Perfil.Flux.js';
import ServicoAuditoriaCriarPerfil from './Servico.Auditoria.Criar.Perfil.js';

const getProfile = async (userId) => {
    console.log(`Serviço: Buscando perfil para o usuário ID: ${userId}`);
    if (!userId) {
        throw new Error('O ID do usuário é necessário para buscar o perfil.');
    }
    const profile = await repositorioCriacaoPerfil.findProfileByUserId(userId);
    if (!profile) {
        throw new Error('Perfil não encontrado.');
    }
    return profile;
};

const updateProfile = async (userId, profileData, requestingUser) => {
    const auditoria = ServicoAuditoriaCriarPerfil;
    auditoria.iniciarProcesso(userId, requestingUser);

    // Regra de negócio: Apenas o próprio usuário pode atualizar seu perfil.
    const temPermissao = userId === requestingUser.id;
    auditoria.validacaoDePermissao(userId, requestingUser.id, temPermissao);
    
    if (!temPermissao) {
        const erro = new Error('Acesso negado. Você não tem permissão para atualizar este perfil.');
        auditoria.falhaNaGravacao(userId, erro, profileData);
        throw erro;
    }

    // Outras validações podem ser adicionadas aqui

    try {
        auditoria.tentativaDeGravacao(userId, profileData);
        
        const perfilAtualizado = await repositorioCriacaoPerfil.updateProfileByUserId(userId, profileData);
        
        auditoria.sucessoNaGravacao(userId, perfilAtualizado);

        return perfilAtualizado;

    } catch (error) {
        auditoria.falhaNaGravacao(userId, error, profileData);
        // Propaga o erro para ser tratado pelo controlador
        throw error; 
    }
};

const deleteProfile = async (userId, requestingUser) => {
    console.log(`Serviço: Deletando perfil para o usuário ID: ${userId}`);

    // Regra de negócio: Apenas o próprio usuário pode deletar seu perfil.
    if (userId !== requestingUser.id) {
        throw new Error('Acesso negado. Você não tem permissão para deletar este perfil.');
    }

    return await repositorioCriacaoPerfil.deleteProfileByUserId(userId);
};

const servicoCriacaoPerfil = {
    getProfile,
    updateProfile,
    deleteProfile,
};

export default servicoCriacaoPerfil;
