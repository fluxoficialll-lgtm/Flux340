
// backend/Repositorios/Repositorio.Criacao.Perfil.Flux.js

import consultas from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Perfil.Flux.js';

/**
 * Repositório para o fluxo de criação de perfil.
 * Abstrai a fonte de dados (PostgreSQL, etc.) e fornece uma interface
 * para o serviço de negócio interagir com os dados do perfil.
 */

const findProfileByUserId = async (userId) => {
    console.log(`Repositório: Buscando perfil para o usuário ID: ${userId}`);
    return await consultas.findProfileByUserId(userId);
};

const updateProfileByUserId = async (userId, profileData) => {
    console.log(`Repositório: Atualizando perfil para o usuário ID: ${userId}`);
    return await consultas.updateProfileByUserId(userId, profileData);
};

const deleteProfileByUserId = async (userId) => {
    console.log(`Repositório: Deletando perfil para o usuário ID: ${userId}`);
    return await consultas.deleteProfileByUserId(userId);
};

// CORREÇÃO: Expondo a nova função para que o controlador possa usá-la.
const findUserById = async (userId) => {
    console.log(`Repositório: Buscando usuário (para auditoria) com ID: ${userId}`);
    return await consultas.findUserById(userId);
};

const repositorioCriacaoPerfil = {
    findProfileByUserId,
    updateProfileByUserId,
    deleteProfileByUserId,
    findUserById // Exportando a função.
};

export default repositorioCriacaoPerfil;
