
// --- AGREGADOR DE HANDLERS E SERVIÇO DE SIMULAÇÃO ---

import { authHandlers } from './simulacoes/SimulacaoDeAuth';
import { feedHandlers } from './simulacoes/SimulacaoDeFeed';
import { marketplaceHandlers, mockMarketplaceItems } from './simulacoes/SimulacaoDeMarketplace'; // Importa mockMarketplaceItems
import { profileHandlers } from './simulacoes/Simulacao.Perfil.Flux';
import { metricsHandlers } from './simulacoes/SimulacaoDeMetricas';
import { conversationsHandlers } from './simulacoes/Simulacao.Lista.Conversas';
import { notificationsHandlers } from './simulacoes/Simulacao.Notificacoes';
import { chatDetailsHandlers } from './simulacoes/Simulacao.Chat';
import { reelsHandlers } from './simulacoes/Simulacao.Reels'; // IMPORTADO

// Re-exporta o serviço de controle da simulação com o nome esperado.
export { controleDeSimulacao as servicoDeSimulacao } from './ControleDeSimulacao';

// Centraliza todos os handlers de simulação em um único objeto.
const allSimulationHandlers = {
    ...authHandlers,
    ...feedHandlers,
    ...marketplaceHandlers,
    ...profileHandlers,
    ...metricsHandlers,
    ...conversationsHandlers,
    ...notificationsHandlers,
    ...chatDetailsHandlers,
    ...reelsHandlers, // ADICIONADO
};

/**
 * Retorna o objeto consolidado com todos os handlers de rota de simulação.
 * O ControleDeSimulacao usa esta função para encontrar o handler apropriado para uma requisição interceptada.
 */
export const getSimulationHandlers = () => {
    return allSimulationHandlers;
};

// Exporta os dados de simulação para serem usados diretamente pelos serviços
export const simulationData = {
    marketplace: mockMarketplaceItems,
};
