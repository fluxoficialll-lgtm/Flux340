
// CORREÇÃO FINAL: Importa o objeto `simulationData` em vez do serviço completo.
import { simulationData } from '../ServiçoDeSimulação';

class MarketplaceService {
    /**
     * Busca todos os itens do marketplace a partir da simulação.
     * @returns {object[]}
     */
    getItems() {
        console.log("[Marketplace] Buscando todos os itens diretamente da simulação.");
        // CORREÇÃO: Lê diretamente do objeto de dados síncrono.
        return simulationData.marketplace || [];
    }

    /**
     * Busca um item por ID.
     * @param {string} id O ID do item a ser buscado.
     * @returns {object | undefined}
     */
    getItemById(id) {
        console.log(`[Marketplace] Buscando item com ID: ${id}`);
        // CORREÇÃO: Lê diretamente do objeto de dados síncrono.
        const items = simulationData.marketplace || [];
        const item = items.find(item => item.id === id);
        return item;
    }

    /**
     * Busca itens recomendados do marketplace.
     * @returns {object[]}
     */
    getRecommendedItems() {
        console.log("[Marketplace] Buscando itens recomendados da simulação.");
        const items = simulationData.marketplace || [];
        return items.slice(0, 5);
    }

    /**
     * Simula o rastreamento da visualização de um item.
     * @param {object} item O item que foi visualizado.
     * @param {string} userEmail O email do usuário que visualizou o item.
     */
    trackView(item, userEmail) {
        console.log(`[Marketplace] Rastreando visualização do item "${item.title}" por ${userEmail}.`);
    }

    /**
     * Busca itens do marketplace por ID de usuário.
     * @param {string} userId O ID do usuário.
     * @returns {object[]}
     */
    getItemsByUserId(userId) {
        console.log(`[Marketplace] Buscando itens para o usuário com ID: ${userId}`);
        const items = simulationData.marketplace || [];
        return items.filter(item => item.userId === userId);
    }
}

export const marketplaceService = new MarketplaceService();
