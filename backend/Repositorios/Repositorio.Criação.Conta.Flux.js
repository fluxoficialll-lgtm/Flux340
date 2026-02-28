
// backend/Repositorios/Repositorio.Criação.Conta.Flux.js

import consultasCriacaoConta from '../database/GestãoDeDados/PostgreSQL/Consultas.Criação.Conta.Flux.js';

const registerUser = async (userData) => {
    console.log('Repositório: Chamando a camada de gestão de dados para registrar usuário.');
    // Passa todos os dados do usuário, incluindo o google_id, se disponível
    return await consultasCriacaoConta.registerUser(userData);
};

const findUserByEmail = async (email) => {
    console.log('Repositório: Chamando a camada de gestão de dados para buscar usuário por email.');
    return await consultasCriacaoConta.findUserByEmail(email);
};

const findUserByGoogleId = async (googleId) => {
    console.log('Repositório: Chamando a camada de gestão de dados para buscar usuário por Google ID.');
    return await consultasCriacaoConta.findUserByGoogleId(googleId);
};

const repositorioCriacaoConta = {
    registerUser,
    findUserByEmail,
    findUserByGoogleId, // Adicionando a nova função
};

export default repositorioCriacaoConta;
