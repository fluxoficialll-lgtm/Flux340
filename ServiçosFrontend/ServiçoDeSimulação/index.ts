
// --- AGREGADOR DE HANDLERS E SERVIÇO DE SIMULAÇÃO ---

import { authHandlers } from './simulacoes/SimulacaoDeAuth';
import { feedHandlers } from './simulacoes/SimulacaoDeFeed';
import { marketplaceHandlers, mockMarketplaceItems } from './simulacoes/SimulacaoDeMarketplace';
import { profileHandlers } from './simulacoes/Simulacao.Perfil.Flux';
import { metricsHandlers } from './simulacoes/SimulacaoDeMetricas';
import { conversationsHandlers } from './simulacoes/Simulacao.Lista.Conversas';
import { notificationsHandlers } from './simulacoes/Simulacao.Notificacoes';
import { chatDetailsHandlers, mockChats } from './simulacoes/Simulacao.Chat';
import { reelsHandlers } from './simulacoes/Simulacao.Reels';
import { groupsHandlers } from './simulacoes/Simulacao.Lista.Grupos';
// A importação do handler de chat de grupo agora é mais específica.
import { groupChatHandlers } from './simulacoes/Simulacao.Chat.Grupo';

// Re-exporta o serviço de controle da simulação com o nome esperado.
export { controleDeSimulacao as servicoDeSimulacao } from './ControleDeSimulacao';

// --- A SOLUÇÃO DEFINITIVA E SUTIL ---
// O handler de chat de grupo espera uma rota dinâmica (ex: /api/group-chat/:groupId).
// Nosso controlador de simulação simples não entende isso.
// A solução é criar as rotas explícitas que o controlador *consegue* entender.

// 1. Pegamos a função que lida com a requisição (o handler).
// A rota original é a chave, então a extraímos para pegar o handler associado.
const dynamicRoute = Object.keys(groupChatHandlers)[0]; // ex: '/api/group-chat/:groupId'
const groupChatDetailHandler = groupChatHandlers[dynamicRoute];

// 2. Definimos os IDs dos grupos que existem na simulação.
const simulatedGroupIds = ['group-1', 'group-2', 'group-3'];

// 3. Criamos um novo objeto de handlers onde cada rota é explícita e estática.
const staticGroupChatHandlers = {};
simulatedGroupIds.forEach(id => {
  // O controlador agora terá uma entrada exata para cada grupo.
  // ex: { '/api/group-chat/group-1': handler, '/api/group-chat/group-2': handler, ... }
  // @ts-ignore
  staticGroupChatHandlers[`/api/group-chat/${id}`] = groupChatDetailHandler;
});

// 4. Centralizamos TODOS os handlers, usando a nossa versão com rotas estáticas.
const allSimulationHandlers = {
    ...authHandlers,
    ...feedHandlers,
    ...marketplaceHandlers,
    ...profileHandlers,
    ...metricsHandlers,
    ...conversationsHandlers,
    ...notificationsHandlers,
    ...chatDetailsHandlers,
    ...reelsHandlers,
    ...groupsHandlers,
    ...staticGroupChatHandlers, // A mágica acontece aqui!
};

/**
 * Retorna o objeto consolidado com todos os handlers de rota de simulação.
 */
export const getSimulationHandlers = () => {
    return allSimulationHandlers;
};

// Exporta os dados de simulação para serem usados diretamente pelos serviços
export const simulationData = {
    marketplace: mockMarketplaceItems,
    chats: mockChats,
};
