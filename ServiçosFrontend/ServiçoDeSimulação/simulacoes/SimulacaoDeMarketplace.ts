
// --- SIMULAÇÃO DO SERVIÇO DE MARKETPLACE ---

// Mock de dados para produtos do marketplace
export const mockMarketplaceItems = [
    {
        id: 'item-1',
        name: 'Grupo VIP Acesso Exclusivo',
        description: 'Acesso ao meu grupo VIP por 30 dias com conteúdo exclusivo, análises e lives.',
        price: 49.90,
        seller: {
            id: 'user-2',
            name: 'Influenciadora Digital',
            nickname: 'influencer',
        },
        type: 'subscription',
    },
    {
        id: 'item-2',
        name: 'Pacote de Gorjetas (100 Fluxs)',
        description: 'Apoie seus criadores favoritos com este pacote de 100 Fluxs.',
        price: 9.90,
        seller: {
            id: 'system',
            name: 'Plataforma Flux',
            nickname: 'flux_oficial',
        },
        type: 'currency_pack',
    },
];

const handleGetMarketplaceItems = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando itens do marketplace.');
    await new Promise(res => setTimeout(res, 400));
    
    return new Response(JSON.stringify(mockMarketplaceItems), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

export const marketplaceHandlers = {
    '/api/marketplace/items': handleGetMarketplaceItems,
};
