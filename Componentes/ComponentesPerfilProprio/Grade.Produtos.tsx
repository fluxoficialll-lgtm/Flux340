
import React from 'react';
import { ProductCard, PromotionalContainer } from '../ComponentesDeMarketplace/Container.Marketplace.Produto';
import { MarketplaceItem, Product, User } from '../../../types';

interface ProfileProductsGridProps {
    user: User; // Alterado para receber o objeto de usuário inteiro
    onProductClick: (product: any) => void;
}

export const GradeDeProdutos: React.FC<ProfileProductsGridProps> = ({ user, onProductClick }) => {
    // Extrai a lista de produtos diretamente do objeto de usuário
    const products = user?.products;

    if (!products || products.length === 0) {
        return <div className="no-content">Sem produtos para exibir.</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-3 p-2">
            {products.map(product => {
                if (product.type === 'container') {
                    return (
                        <PromotionalContainer 
                            key={product.id}
                            product={product as Product}
                            onProductClick={onProductClick}
                        />
                    );
                }
                return (
                    <ProductCard 
                        key={product.id} 
                        product={product as MarketplaceItem} 
                        onClick={() => onProductClick(product)} 
                    />
                );
            })}
        </div>
    );
};
