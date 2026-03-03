
// --- AGREGADOR DE HANDLERS E SERVIÇO DE SIMULAÇÃO ---

import { authHandlers } from './simulacoes/SimulacaoDeAuth';
import { feedHandlers } from './simulacoes/SimulacaoDeFeed';
import { marketplaceHandlers } from './simulacoes/SimulacaoDeMarketplace';
import { profileHandlers } from './simulacoes/Simulacao.Perfil.Flux';

// A CORREÇÃO ESTÁ AQUI: Re-exporta o serviço de controle da simulação com o nome esperado.
export { controleDeSimulacao as servicoDeSimulacao } from './ControleDeSimulacao';


// Centraliza todos os handlers de simulação de diferentes módulos em um único objeto.
const allSimulationHandlers = {
    ...authHandlers,
    ...feedHandlers,
    ...marketplaceHandlers,
    ...profileHandlers,
};

/**
 * Retorna o objeto consolidado com todos os handlers de rota de simulação.
 * O ControleDeSimulacao usa esta função para encontrar o handler apropriado para uma requisição interceptada.
 */
export const getSimulationHandlers = () => {
    return allSimulationHandlers;
};
