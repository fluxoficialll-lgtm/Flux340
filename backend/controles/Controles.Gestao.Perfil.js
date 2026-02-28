
// backend/controles/Controles.Gestao.Perfil.js

import servicoGestaoPerfil from '../ServicosBackend/Servicos.Gestao.Perfil.js';

const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await servicoGestaoPerfil.getUser(id);
        res.status(200).json(user);
    } catch (error) {
        console.error('Erro no controlador ao buscar usuário:', error);
        // Se o erro for "Usuário não encontrado", retorne 404
        if (error.message === 'Usuário não encontrado.') {
            return res.status(404).json({ message: error.message });
        }
        // Para outros erros, retorne 500
        res.status(500).json({ message: 'Ocorreu um erro no servidor.' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userData = req.body;

        // Validação básica: verifica se há dados no corpo da requisição
        if (Object.keys(userData).length === 0) {
            return res.status(400).json({ message: 'Nenhum dado para atualizar foi fornecido.' });
        }

        const result = await servicoGestaoPerfil.updateUser(id, userData);
        
        res.status(200).json(result);
    } catch (error) {
        console.error('Erro no controlador ao atualizar usuário:', error);
        res.status(400).json({ message: error.message || 'Ocorreu um erro no servidor.' });
    }
};

const controlePerfil = {
    getUser,
    updateUser,
};

export default controlePerfil;
