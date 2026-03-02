
// backend/ServicosBackend/Servico.Auditoria.Criar.Perfil.js

/**
 * @file Serviço de Auditoria para o fluxo de criação e atualização de perfil no Backend.
 * Foco em registrar o **estado** dos dados em pontos críticos para revelar bugs de inconsistência.
 */

import ServicoDeLog from './Servico.Logs.Backend.js'; // CORRIGIDO: Apontando para o novo serviço de log do backend.

const CONTEXTO = "Auditoria.Criacao.Perfil.Backend";

const ServicoAuditoriaCriarPerfil = {

    iniciarProcesso(userId, requestingUser) {
        ServicoDeLog.info(
            `Início do processo de atualização de perfil para o usuário ${userId}.`,
            { userId, requestingUserId: requestingUser.id },
            CONTEXTO
        );
    },

    // NOVO: Loga o estado ANTES da operação no banco.
    estadoAntes(userAtual) {
        ServicoDeLog.info(
            "Estado atual do usuário antes da atualização",
            {
                userId: userAtual.id,
                perfilCompleto: userAtual.perfil_completo // Ajustado para o padrão snake_case do banco
            },
            CONTEXTO
        );
    },

    validacaoDePermissao(userId, requestingUserId, permitido) {
        ServicoDeLog.info(
            `Validação de permissão: ${permitido ? 'Permitido' : 'NEGADO'}.`,
            { targetUserId: userId, requesterUserId: requestingUserId, permitido },
            CONTEXTO
        );
    },

    tentativaDeGravacao(userId, profileData) {
        const dadosLogaveis = { ...profileData };
        delete dadosLogaveis.cpf;
        delete dadosLogaveis.phone;

        ServicoDeLog.info(
            `Tentativa de gravação no banco de dados para o usuário ${userId}`,
            { userId, data: dadosLogaveis },
            CONTEXTO
        );
    },

    // NOVO: Loga o resultado exato que a query do banco retornou.
    resultadoQuery(userAtualizado) {
        ServicoDeLog.info(
            "Resultado da atualização no banco (RETURNING)",
            {
                userId: userAtualizado.id,
                perfilCompleto: userAtualizado.perfil_completo // Ajustado para o padrão snake_case
            },
            CONTEXTO
        );
    },

    // NOVO: Loga o valor específico do campo que controla o fluxo.
    verificacaoPerfilCompleto(user) {
        ServicoDeLog.warn( // Usando warn para destacar este log
            "Verificação de perfil completo antes de enviar ao frontend",
            {
                userId: user.id,
                perfilCompleto: user.perfil_completo // Ajustado para o padrão snake_case
            },
            CONTEXTO
        );
    },

    // NOVO: Loga a resposta exata enviada ao cliente.
    respostaEnviada(response) {
        ServicoDeLog.info(
            "Resposta final enviada ao frontend",
            { response },
            CONTEXTO
        );
    },

    sucessoNaGravacao(userId, perfilAtualizado) {
        ServicoDeLog.info(
            `Perfil do usuário ${userId} atualizado com sucesso no banco de dados.`,
            { userId, perfil: perfilAtualizado },
            CONTEXTO
        );
    },

    falhaNaGravacao(userId, erro, profileData) {
        ServicoDeLog.error(
            `Falha ao gravar perfil do usuário ${userId} no banco dedados.`,
            {
                userId,
                errorMessage: erro.message,
                stack: erro.stack,
                dadosOriginais: profileData
            },
            CONTEXTO
        );
    }
};

export default ServicoAuditoriaCriarPerfil;
