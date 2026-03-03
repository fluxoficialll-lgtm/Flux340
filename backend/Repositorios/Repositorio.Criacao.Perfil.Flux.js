
// backend/Repositorios/Repositorio.Criacao.Perfil.Flux.js

import consultas from '../database/GestaoDeDados/PostgreSQL/Consultas.Criacao.Perfil.Flux.js';

/**
 * Repositório para o fluxo de criação de perfil.
 * Abstrai a fonte de dados (PostgreSQL, etc.) e fornece uma interface
 * para o serviço de negócio interagir com os dados do perfil.
 */

const PossibilidadeBuscarPerfilPorIdUsuario = async (userId) => {
    console.log(`Repositório: Buscando perfil para o usuário ID: ${userId}`);
    return await consultas.ConsultarPerfilPorIdUsuario(userId);
};

const PossibilidadeAtualizarPerfilPorIdUsuario = async (userId, profileData) => {
    console.log(`Repositório: Atualizando perfil para o usuário ID: ${userId}`);
    return await consultas.AtualizarPerfilPorIdUsuario(userId, profileData);
};

const PossibilidadeDeletarPerfilPorIdUsuario = async (userId) => {
    console.log(`Repositório: Deletando perfil para o usuário ID: ${userId}`);
    return await consultas.DeletarPerfilPorIdUsuario(userId);
};

// CORREÇÃO: Expondo a nova função para que o controlador possa usá-la.
const PossibilidadeBuscarUsuarioPorId = async (userId) => {
    console.log(`Repositório: Buscando usuário (para auditoria) com ID: ${userId}`);
    return await consultas.ConsultarPerfilPorIdUsuario(userId);
};

const repositorioCriacaoPerfil = {
    PossibilidadeBuscarPerfilPorIdUsuario,
    PossibilidadeAtualizarPerfilPorIdUsuario,
    PossibilidadeDeletarPerfilPorIdUsuario,
    PossibilidadeBuscarUsuarioPorId // Exportando a função.
};

export default repositorioCriacaoPerfil;
