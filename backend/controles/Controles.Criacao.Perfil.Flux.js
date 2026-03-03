
// backend/controles/Controles.Criacao.Perfil.Flux.js

import servicoCriacaoPerfil from '../ServicosBackend/Servicos.Criacao.Perfil.Flux.js';
import repositorioCriacaoPerfil from '../Repositorios/Repositorio.Criacao.Perfil.Flux.js';
import ServicoAuditoriaCriarPerfil from '../ServicosBackend/Servico.Auditoria.Criar.Perfil.js';

const ControlesCriacaoPerfilFlux = {

    async buscarMeuPerfil(req, res) {
        try {
            const userId = req.user.id;
            const perfil = await repositorioCriacaoPerfil.findUserById(userId);
            if (!perfil) {
                return res.status(404).json({ message: 'Perfil não encontrado.' });
            }
            res.json(perfil);
        } catch (error) {
            console.error(`[Controle Perfil] Erro ao buscar o próprio perfil:`, error);
            res.status(500).json({ message: 'Erro interno ao buscar o perfil.' });
        }
    },

    async buscarPerfil(req, res) {
        try {
            const { userId } = req.params;
            const perfil = await repositorioCriacaoPerfil.findUserById(userId);

            if (!perfil) {
                return res.status(404).json({ message: 'Perfil não encontrado.' });
            }

            // Apenas retornando dados públicos
            const perfilPublico = {
                id: perfil.id,
                nome_usuario: perfil.nome_usuario,
                nome_completo: perfil.nome_completo,
                bio: perfil.bio,
                foto_perfil: perfil.foto_perfil,
                is_verified: perfil.is_verified
            };

            res.json(perfilPublico);
        } catch (error) {
            console.error(`[Controle Perfil] Erro ao buscar perfil público:`, error);
            res.status(500).json({ message: 'Erro interno ao buscar o perfil público.' });
        }
    },

    async atualizarPerfil(req, res) {
        const userId = req.user.id;
        const profileData = req.body;
        const auditoria = ServicoAuditoriaCriarPerfil;

        auditoria.iniciarProcesso(userId, req.user);

        try {
            const userAtual = await repositorioCriacaoPerfil.findUserById(userId); 
            if (!userAtual) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            auditoria.estadoAntes(userAtual);

            const perfilAtualizado = await servicoCriacaoPerfil.updateProfile(userId, profileData, req.user);

            auditoria.resultadoQuery(perfilAtualizado);
            auditoria.verificacaoPerfilCompleto(perfilAtualizado);
            auditoria.respostaEnviada(perfilAtualizado);
            
            res.status(200).json(perfilAtualizado);

        } catch (error) {
            console.error(`[Controle Perfil] Erro ao atualizar perfil ${userId}:`, error);
            auditoria.falhaNaGravacao(userId, error, profileData);

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
        try {
            const userId = req.user.id;
            // Assumindo que o serviço 'deleteProfile' existe e lida com a lógica de deleção
            await servicoCriacaoPerfil.deleteProfile(userId, req.user);
            res.status(200).json({ message: 'Perfil deletado com sucesso.' });
        } catch (error) {
            console.error(`[Controle Perfil] Erro ao deletar perfil ${req.user.id}:`, error);
             if (error.message.startsWith('Acesso negado')) {
                return res.status(403).json({ message: error.message });
            }
            res.status(500).json({ message: 'Erro interno ao deletar o perfil.' });
        }
    }
};

export default ControlesCriacaoPerfilFlux;
