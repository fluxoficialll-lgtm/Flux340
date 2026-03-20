
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

const mockUserId = ServicoAutenticacaoMock.login().id;

// --- GRUPOS ---
// Como os mocks de grupos foram removidos, este array agora está vazio.
const allGroupIds = []; 
const staticGroupHandlers = {};
allGroupIds.forEach(id => {
    Object.assign(staticGroupHandlers, {
        [`/api/groups/${id}`]: groupDetailsHandlers['/api/groups/:groupId'],
        [`/api/group-chat/${id}`]: groupChatHandlers['/api/group-chat/:groupId'],
        [`/api/groups/platform/${id}`]: groupSalesPlatformHandlers['/api/groups/platform/:id'],
    });
});

// --- PERFIS ---
const userProfileHandler = profileHandlers['/api/profiles/:id'];
const { '/api/profiles/:id': _, ...safeProfileHandlers } = profileHandlers;
const staticProfileHandlers = {
    [`/api/profiles/${mockUserId}`]: userProfileHandler,
};


// --- CONSOLIDAÇÃO DE TODOS OS HANDLERS ---
const allSimulationHandlers = {
    ...authHandlers,
    ...feedHandlers,
    ...marketplaceHandlers,
    ...safeProfileHandlers,      
    ...metricsHandlers,
    ...conversationsHandlers,
    ...notificationsHandlers,
    ...chatDetailsHandlers,
    ...reelsHandlers,
    ...groupMembersHandlers,
    ...groupRolesConfigHandlers,
    ...groupInvitesConfigHandlers,
    ...groupGeneralConfigHandlers, 
    ...staticGroupHandlers,      
    ...staticProfileHandlers,   
};


export const getSimulationHandlers = () => {
    return allSimulationHandlers;
};

export const simulationData = {
    marketplace: mockMarketplaceItems,
    chats: mockChats,
};
