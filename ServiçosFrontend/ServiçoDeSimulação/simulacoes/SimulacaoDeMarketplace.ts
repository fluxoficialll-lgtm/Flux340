
import { MarketplaceItem } from '../../../types';

const IMAGENS_EXEMPLO = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
    'https://images.unsplash.com/photo-1491553693928-2a2b5a4205b3?w=500&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
    'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80',
];

const marketplaceItems: MarketplaceItem[] = [
    {
        id: '1',
        title: 'Relógio de Pulso Moderno',
        price: '250.00',
        images: [IMAGENS_EXEMPLO[0]],
        category: 'Eletrônicos',
        location: 'São Paulo, SP',
        author: 'Loja do Zé',
        isAd: false,
        description: 'Relógio elegante para todas as ocasiões.',
    },
    {
        id: '2',
        title: 'Headphones com Cancelamento de Ruído',
        price: '550.00',
        images: [IMAGENS_EXEMPLO[1]],
        category: 'Eletrônicos',
        location: 'Rio de Janeiro, RJ',
        author: 'TechTop',
        isAd: true,
        ctaLink: '/profile/tecktop',
        description: 'Ouça suas músicas sem interrupções.',
    },
    {
        id: '3',
        title: 'Tênis de Corrida Ultra Leve',
        price: '350.00',
        images: [IMAGENS_EXEMPLO[2]],
        category: 'Esportes',
        location: 'Belo Horizonte, MG',
        author: 'AtletaShop',
        isAd: false,
        description: 'Ideal para maratonas e treinos diários.',
    },
    {
        id: '4',
        title: 'Óculos de Sol Aviador',
        price: '150.00',
        images: [IMAGENS_EXEMPLO[4]],
        category: 'Acessórios',
        location: 'Curitiba, PR',
        author: 'Estilo & Sol',
        isAd: false,
        description: 'Proteção UV400 com estilo clássico.',
    },
    {
        id: '5',
        title: 'Câmera DSLR Profissional',
        price: '3500.00',
        images: [IMAGENS_EXEMPLO[5]],
        category: 'Fotografia',
        location: 'São Paulo, SP',
        author: 'FotoMega',
        isAd: true,
        ctaLink: 'https://www.google.com',
        description: 'Capture momentos incríveis com qualidade profissional.',
    }
];

export const simulacaoDeMarketplace = (): MarketplaceItem[] => {
    console.log('[SIMULAÇÃO] ✅ Gerando dados para Marketplace...');
    return marketplaceItems;
};
