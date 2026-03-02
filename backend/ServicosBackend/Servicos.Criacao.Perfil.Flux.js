
// backend/ServicosBackend/Servicos.Criação.Perfil.Flux.js

import repositorioCriacaoPerfil from '../Repositorios/Repositorio.Criacao.Perfil.Flux.js';
import ServicoAuditoriaCriarPerfil from './Servico.Auditoria.Criar.Perfil.js';

const getProfile = async (userId) => {
    // ... (código existente sem alterações)
};

const updateProfile = async (userId, profileData, requestingUser) => {
    const auditoria = ServicoAuditoriaCriarPerfil;
    auditoria.iniciarProcesso(userId, requestingUser);

    const temPermissao = userId === requestingUser.id;
    auditoria.validacaoDePermissao(userId, requestingUser.id, temPermissao);
    
    if (!temPermissao) {
        const erro = new Error('Acesso negado. Você não tem permissão para atualizar este perfil.');
        auditoria.falhaNaGravacao(userId, erro, profileData);
        throw erro;
    }

    // Lógica para determinar se o perfil está completo
    const { name, nickname } = profileData;
    const isProfileCompleted = name && name.trim() !== '' && nickname && nickname.trim() !== '';
    
    // Adiciona o status de "completo" aos dados a serem salvos
    const dataToUpdate = {
        ...profileData,
        profile_completed: isProfileCompleted
    };

    try {
        auditoria.tentativaDeGravacao(userId, dataToUpdate);
        
        const perfilAtualizado = await repositorioCriacaoPerfil.updateProfileByUserId(userId, dataToUpdate);
        
        auditoria.sucessoNaGravacao(userId, perfilAtualizado);

        return perfilAtualizado;

    } catch (error) {
        auditoria.falhaNaGravacao(userId, error, dataToUpdate);
        throw error; 
    }
};

const deleteProfile = async (userId, requestingUser) => {
    // ... (código existente sem alterações)
};

const servicoCriacaoPerfil = {
    getProfile,
    updateProfile,
    deleteProfile,
};

export default servicoCriacaoPerfil;
