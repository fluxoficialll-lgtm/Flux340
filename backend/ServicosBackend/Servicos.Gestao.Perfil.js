
// backend/ServicosBackend/Servicos.Gestao.Perfil.js

import repositorioGestaoPerfil from '../Repositorios/Repositorio.Gestao.Perfil.js';

const getUser = async (id) => {
    console.log(`Serviço: Buscando perfil para o usuário ID: ${id}`);
    
    // Chama o repositório para buscar o usuário
    const user = await repositorioGestaoPerfil.findUserById(id);

    if (!user) {
        throw new Error('Usuário não encontrado.');
    }

    return user;
};

const updateUser = async (id, userData) => {
    console.log(`Serviço: Atualizando perfil para o usuário ID: ${id}`);

    // A validação de "dados vazios" deve ser feita no controlador ou no frontend.
    // A camada de serviço pode ter lógicas mais complexas (ex: permissões)

    // Chamar o repositório para atualizar o usuário
    const updatedUser = await repositorioGestaoPerfil.updateUser(id, userData);
    
    return { message: 'Perfil atualizado com sucesso!', user: updatedUser };
};

const servicoGestaoPerfil = {
    getUser,
    updateUser,
};

export default servicoGestaoPerfil;
