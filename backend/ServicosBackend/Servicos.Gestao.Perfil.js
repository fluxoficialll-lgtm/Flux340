
// backend/ServicosBackend/Servicos.Gestao.Perfil.js

import repositorioGestaoPerfil from '../Repositorios/Repositorio.Gestao.Perfil.js';

const updateUser = async (id, userData) => {
    console.log(`Serviço: Atualizando perfil para o usuário ID: ${id}`);

    // Lógica de validação (exemplo)
    if (!userData.name && !userData.email) {
        throw new Error('Nenhum dado para atualizar foi fornecido.');
    }

    // Chamar o repositório para atualizar o usuário
    const updatedUser = await repositorioGestaoPerfil.updateUser(id, userData);
    
    return { message: 'Perfil atualizado com sucesso!', user: updatedUser };
};

const servicoGestaoPerfil = {
    updateUser,
};

export default servicoGestaoPerfil;
