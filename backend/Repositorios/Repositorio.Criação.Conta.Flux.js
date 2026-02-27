
// backend/Repositorios/Repositorio.Criação.Conta.Flux.js

import consultasCriacaoConta from '../database/GestãoDeDados/PostgreSQL/Consultas.Criação.Conta.Flux.js';

const registerUser = async (userData) => {
    console.log('Repositório: Chamando a camada de gestão de dados para registrar usuário.');
    return await consultasCriacaoConta.registerUser(userData);
};

const findUserByEmail = async (email) => {
    console.log('Repositório: Chamando a camada de gestão de dados para buscar usuário por email.');
    return await consultasCriacaoConta.findUserByEmail(email);
};

const repositorioCriacaoConta = {
    registerUser,
    findUserByEmail,
};

export default repositorioCriacaoConta;
