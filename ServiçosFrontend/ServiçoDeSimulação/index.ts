
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
import { groupsHandlers, mockGroups } from './simulacoes/Simulacao.Lista.Grupos';
import { myGroupsHandlers, myMockGroups } from './simulacoes/Simulacao.Grupo.Proprio';
import { groupMembersHandlers } from './simulacoes/Simulacao.Grupo.Membros';
import { groupChatHandlers } from './simulacoes/Simulacao.Chat.Grupo';
import { groupDetailsHandlers } from './simulacoes/Simulacao.Grupo.Detalhes';
import { modoHubHandlers } from './simulacoes/Simulacao.ModoHub';
import { groupSalesPlatformHandlers } from './simulacoes/Simulacao.Grupo.Plataforma'; // <-- ARQUIVO NOVO

// Re-exporta o serviço de controle da simulação com o nome esperado.
export { controleDeSimulacao as servicoDeSimulacao } from './ControleDeSimulacao';

// --- TRATAMENTO DE ROTAS DINÂMICAS ---

const allGroupIds = [
    ...mockGroups.map(g => g.id),
    ...myMockGroups.map(g => g.id),
];

// 1. Tratamento para /api/groups/:id, PRIORIZANDO O MODO HUB
const groupDetailHandler = modoHubHandlers['/api/groups/:id']; 
const staticGroupDetailsHandlers = {};
allGroupIds.forEach(id => {
    // @ts-ignore
    staticGroupDetailsHandlers[`/api/groups/${id}`] = groupDetailHandler;
});

// 2. Tratamento para /api/group-chat/:groupId
const dynamicGroupChatRoute = Object.keys(groupChatHandlers)[0];
const groupChatDetailHandler = groupChatHandlers[dynamicGroupChatRoute];
const staticGroupChatHandlers = {};
allGroupIds.forEach(id => {
    // @ts-ignore
    staticGroupChatHandlers[`/api/group-chat/${id}`] = groupChatDetailHandler;
});

// 3. Tratamento para /api/groups/platform/:id
const salesPlatformHandler = groupSalesPlatformHandlers['/api/groups/platform/:id'];
const staticSalesPlatformHandlers = {};
allGroupIds.forEach(id => {
    // @ts-ignore
    staticSalesPlatformHandlers[`/api/groups/platform/${id}`] = salesPlatformHandler;
});

// --- CONSOLIDAÇÃO DE TODOS OS HANDLERS ---
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
    ...myGroupsHandlers,
    ...groupMembersHandlers,
    ...groupDetailsHandlers,
    ...staticGroupChatHandlers,
    ...staticGroupDetailsHandlers,
    ...staticSalesPlatformHandlers, // <-- NOVO HANDLER REGISTRADO
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
