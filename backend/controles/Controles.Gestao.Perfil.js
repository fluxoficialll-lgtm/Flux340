
// backend/controles/Controles.Gestao.Perfil.js

import servicoGestaoPerfil from '../ServicosBackend/Servicos.Gestao.Perfil.js';

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        const result = await servicoGestaoPerfil.updateUser(id, userData);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro no controlador ao atualizar usuário:', error);
        res.status(400).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
};

const controlePerfil = {
    updateUser,
};

export default controlePerfil;
