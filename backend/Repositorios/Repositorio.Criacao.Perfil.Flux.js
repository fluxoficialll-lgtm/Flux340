
// backend/Repositorios/Repositorio.Criação.Perfil.Flux.js

import consultasCriacaoPerfil from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Perfil.Flux.js';

const findProfileByUserId = async (userId) => {
    console.log('Repositório: Encaminhando para a camada de gestão de dados para buscar perfil.');
    return await consultasCriacaoPerfil.findProfileByUserId(userId);
};

// CORRIGIDO: Captura e retorna o perfil atualizado da camada de dados.
const updateProfileByUserId = async (userId, profileData) => {
    console.log('Repositório: Encaminhando para a camada de gestão de dados para atualizar perfil.');
    const perfilAtualizado = await consultasCriacaoPerfil.updateProfileByUserId(userId, profileData);
    return perfilAtualizado;
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
