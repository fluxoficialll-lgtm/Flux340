
// --- AGREGADOR DE HANDLERS E SERVIÇO DE SIMULAÇÃO ---

import { authHandlers } from './simulacoes/SimulacaoDeAuth';
import { feedHandlers } from './simulacoes/SimulacaoDeFeed';
import { marketplaceHandlers } from './simulacoes/SimulacaoDeMarketplace';
import { profileHandlers } from './simulacoes/Simulacao.Perfil.Flux';
import { metricsHandlers } from './simulacoes/SimulacaoDeMetricas'; // IMPORTADO

// Re-exporta o serviço de controle da simulação com o nome esperado.
export { controleDeSimulacao as servicoDeSimulacao } from './ControleDeSimulacao';

// Centraliza todos os handlers de simulação em um único objeto.
const allSimulationHandlers = {
    ...authHandlers,
    ...feedHandlers,
    ...marketplaceHandlers,
    ...profileHandlers,
    ...metricsHandlers, // ADICIONADO
};

/**
 * Retorna o objeto consolidado com todos os handlers de rota de simulação.
 * O ControleDeSimulacao usa esta função para encontrar o handler apropriado para uma requisição interceptada.
 */
export const getSimulationHandlers = () => {
    return allSimulationHandlers;
};
