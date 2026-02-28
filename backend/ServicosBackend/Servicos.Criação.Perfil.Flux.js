
// backend/ServicosBackend/Servicos.Criação.Perfil.Flux.js

import repositorioCriacaoPerfil from '../Repositorios/Repositorio.Criação.Perfil.Flux.js';

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
    console.log(`Serviço: Atualizando perfil para o usuário ID: ${userId}`);

    // Regra de negócio: Apenas o próprio usuário pode atualizar seu perfil.
    if (userId !== requestingUser.id) {
        throw new Error('Acesso negado. Você não tem permissão para atualizar este perfil.');
    }

    // Outras validações (ex: username, etc.) podem ser adicionadas aqui

    return await repositorioCriacaoPerfil.updateProfileByUserId(userId, profileData);
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
