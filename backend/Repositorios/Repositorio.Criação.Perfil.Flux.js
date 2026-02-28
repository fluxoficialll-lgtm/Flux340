
// backend/Repositorios/Repositorio.Criação.Perfil.Flux.js

import consultasCriacaoPerfil from '../database/GestãoDeDados/PostgreSQL/Consultas.Criação.Perfil.Flux.js';

const findProfileByUserId = async (userId) => {
    console.log('Repositório: Encaminhando para a camada de gestão de dados para buscar perfil.');
    return await consultasCriacaoPerfil.findProfileByUserId(userId);
};

const updateProfileByUserId = async (userId, profileData) => {
    console.log('Repositório: Encaminhando para a camada de gestão de dados para atualizar perfil.');
    return await consultasCriacaoPerfil.updateProfileByUserId(userId, profileData);
};

const deleteProfileByUserId = async (userId) => {
    console.log('Repositório: Encaminhando para a camada de gestão de dados para deletar perfil.');
    return await consultasCriacaoPerfil.deleteProfileByUserId(userId);
};

const repositorioCriacaoPerfil = {
    findProfileByUserId,
    updateProfileByUserId,
    deleteProfileByUserId,
};

export default repositorioCriacaoPerfil;
