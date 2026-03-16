
// --- AGREGADOR DE HANDLERS E SERVIÇO DE SIMULAÇÃO ---

import { authHandlers, ServicoAutenticacaoMock } from './simulacoes/SimulacaoDeAuth';
import { feedHandlers } from './simulacoes/SimulacaoDeFeed';
import { marketplaceHandlers, mockMarketplaceItems } from './simulacoes/SimulacaoDeMarketplace';
import { profileHandlers } from './simulacoes/Simulacao.Perfil.Flux';
import { metricsHandlers } from './simulacoes/SimulacaoDeMetricas';
import { conversationsHandlers } from './simulacoes/Simulacao.Lista.Conversas';
import { notificationsHandlers } from './simulacoes/Simulacao.Notificacoes';
import { chatDetailsHandlers, mockChats } from './simulacoes/Simulacao.Chat';
import { reelsHandlers } from './simulacoes/Simulacao.Reels';
import { groupsHandlers, mockGroups } from './simulacoes/Simulacao.Lista.Grupo.Terceiro';
import { myGroupsHandlers, myMockGroups } from './simulacoes/Simulacao.Lista.Grupo.Proprio';
import { groupMembersHandlers } from './simulacoes/Simulacao.Grupo.Membros';
import { groupChatHandlers } from './simulacoes/Simulacao.Chat.Grupo';
import { groupDetailsHandlers } from './simulacoes/Simulacao.Grupo.Detalhes';
import { modoHubHandlers } from './simulacoes/Simulacao.ModoHub';
import { groupSalesPlatformHandlers } from './simulacoes/Simulacao.Grupo.Plataforma';
import { groupRolesConfigHandlers } from './simulacoes/Simulacao.Grupo.Config.Cargos';
import { groupInvitesConfigHandlers } from './simulacoes/Simulacao.Grupo.Config.Convites';
import { groupGeneralConfigHandlers } from './simulacoes/Simulacao.Grupo.Config.Geral';

export { controleDeSimulacao as servicoDeSimulacao } from './ControleDeSimulacao';

// --- TRATAMENTO DE ROTAS DINÂMICAS E CONFLITOS ---

// Pega o ID do usuário simulado para criar rotas estáticas
const mockUserId = ServicoAutenticacaoMock.login().id;

// --- GRUPOS ---
const allGroupIds = [...mockGroups.map(g => g.id), ...myMockGroups.map(g => g.id)];
const staticGroupHandlers = {};
allGroupIds.forEach(id => {
    Object.assign(staticGroupHandlers, {
        [`/api/groups/${id}`]: groupDetailsHandlers['/api/groups/:groupId'], // CORRIGIDO
        [`/api/group-chat/${id}`]: groupChatHandlers['/api/group-chat/:groupId'],
        [`/api/groups/platform/${id}`]: groupSalesPlatformHandlers['/api/groups/platform/:id'],
    });
});

// --- PERFIS (A CORREÇÃO) ---

// 1. Pega o handler que queremos usar para o perfil do usuário simulado.
const userProfileHandler = profileHandlers['/api/profiles/:id'];

// 2. Remove o handler dinâmico problemático do objeto original.
const { '/api/profiles/:id': _, ...safeProfileHandlers } = profileHandlers;

// 3. Cria o handler estático e específico que vai resolver o problema.
const staticProfileHandlers = {
    [`/api/profiles/${mockUserId}`]: userProfileHandler,
};


// --- CONSOLIDAÇÃO DE TODOS OS HANDLERS ---
const allSimulationHandlers = {
    ...authHandlers,
    ...feedHandlers,
    ...marketplaceHandlers,
    ...safeProfileHandlers,      // Usa a versão segura dos handlers de perfil (sem a rota dinâmica)
    ...metricsHandlers,
    ...conversationsHandlers,
    ...notificationsHandlers,
    ...chatDetailsHandlers,
    ...reelsHandlers,
    ...groupsHandlers,
    ...myGroupsHandlers,
    ...groupMembersHandlers,
    ...groupRolesConfigHandlers,
    ...groupInvitesConfigHandlers,
    ...groupGeneralConfigHandlers, 
    ...staticGroupHandlers,      // Adiciona todos os handlers estáticos de grupo
    ...staticProfileHandlers,   // Adiciona o handler estático do perfil que faltava
};


export const getSimulationHandlers = () => {
    return allSimulationHandlers;
};

export const simulationData = {
    marketplace: mockMarketplaceItems,
    chats: mockChats,
};
