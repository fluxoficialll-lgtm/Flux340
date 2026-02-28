
// backend/controles/Controles.Criação.Perfil.Flux.js

import servicoCriacaoPerfil from '../ServicosBackend/Servicos.Criação.Perfil.Flux.js';

const ControlesCriacaoPerfilFlux = {

    async buscarPerfil(req, res) {
        const { userId } = req.params;
        try {
            const perfil = await servicoCriacaoPerfil.getProfile(userId);
            res.status(200).json(perfil);
        } catch (error) {
            console.error(`[Controle Perfil] Erro ao buscar perfil ${userId}:`, error);
            if (error.message === 'Perfil não encontrado.') {
                return res.status(404).json({ message: error.message });
            }
            res.status(500).json({ message: 'Erro interno ao buscar o perfil.' });
        }
    },

    async atualizarPerfil(req, res) {
        const userId = req.user.id; // Correção: Obter ID do usuário autenticado
        const profileData = req.body;
        const requestingUser = req.user;

        try {
            const perfilAtualizado = await servicoCriacaoPerfil.updateProfile(userId, profileData, requestingUser);
            res.status(200).json(perfilAtualizado);
        } catch (error) {
            console.error(`[Controle Perfil] Erro ao atualizar perfil ${userId}:`, error);
            if (error.message.startsWith('Acesso negado')) {
                return res.status(403).json({ message: error.message });
            }
            if (error.message.includes('já está em uso')) {
                return res.status(409).json({ message: error.message });
            }
            res.status(500).json({ message: 'Erro interno ao atualizar o perfil.' });
        }
    },

    async deletarPerfil(req, res) {
        const userId = req.user.id; // Correção: Obter ID do usuário autenticado
        const requestingUser = req.user;

        try {
            await servicoCriacaoPerfil.deleteProfile(userId, requestingUser);
            res.status(204).send(); // Sucesso, sem conteúdo
        } catch (error) {
            console.error(`[Controle Perfil] Erro ao deletar perfil ${userId}:`, error);
            if (error.message.startsWith('Acesso negado')) {
                return res.status(403).json({ message: error.message });
            }
            res.status(500).json({ message: 'Erro interno ao deletar o perfil.' });
        }
    }
};

export default ControlesCriacaoPerfilFlux;
