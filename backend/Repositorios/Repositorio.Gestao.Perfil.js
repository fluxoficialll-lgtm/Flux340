
// backend/Repositorios/Repositorio.Gestao.Perfil.js

import consultasGestaoPerfil from '../database/GestãoDeDados/PostgreSQL/Consultas.Gestao.Perfil.js';

const updateUser = async (id, userData) => {
    console.log(`Repositório: Chamando a camada de gestão de dados para atualizar o usuário ID: ${id}`);
    return await consultasGestaoPerfil.updateUser(id, userData);
};

const repositorioGestaoPerfil = {
    updateUser,
};

export default repositorioGestaoPerfil;
