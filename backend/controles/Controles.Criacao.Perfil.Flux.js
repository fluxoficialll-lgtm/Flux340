
// backend/controles/Controles.Criacao.Perfil.Flux.js

import servicoCriacaoPerfil from '../ServicosBackend/Servicos.Criacao.Perfil.Flux.js';
import repositorioCriacaoPerfil from '../Repositorios/Repositorio.Criacao.Perfil.Flux.js';
import ServicoAuditoriaCriarPerfil from '../ServicosBackend/Servico.Auditoria.Criar.Perfil.js';

const ControlesCriacaoPerfilFlux = {

    async buscarPerfil(req, res) {
        // ... (código existente sem alterações)
    },

    async atualizarPerfil(req, res) {
        const userId = req.user.id;
        const profileData = req.body;
        const auditoria = ServicoAuditoriaCriarPerfil;

        auditoria.iniciarProcesso(userId, req.user);

        try {
            // 1. Buscar estado ANTES de salvar
            const userAtual = await repositorioCriacaoPerfil.findUserById(userId); 
            if (!userAtual) {
                return res.status(404).json({ message: "Usuário não encontrado." });
            }
            auditoria.estadoAntes(userAtual);

            // 2. Executar a lógica de atualização
            const perfilAtualizado = await servicoCriacaoPerfil.updateProfile(userId, profileData, req.user);

            // 3. Logar o resultado EXATO da query
            auditoria.resultadoQuery(perfilAtualizado);

            // 4. Logar o campo crítico que decide o fluxo
            auditoria.verificacaoPerfilCompleto(perfilAtualizado);

            // 5. Logar a resposta que será enviada ao frontend
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
        // ... (código existente sem alterações)
    }
};

export default ControlesCriacaoPerfilFlux;
