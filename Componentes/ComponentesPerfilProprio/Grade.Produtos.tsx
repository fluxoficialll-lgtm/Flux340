
import React from 'react';
import { ProductCard } from '../ComponentesDeMarketplace/ProductCard';

// A interface agora espera um array do tipo que o ProductCard usa (usando 'any')
// e uma função onProductClick.
interface ProfileProductsGridProps {
    products: any[];
    onProductClick: (product: any) => void;
}

export const GradeDeProdutos: React.FC<ProfileProductsGridProps> = ({ products, onProductClick }) => {
    if (!products || products.length === 0) {
        return <div className="no-content">Sem produtos para exibir.</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-3 p-2">
            {products.map(product => (
                <ProductCard 
                    key={product.id} 
                    product={product} 
                    // A função onClick do card agora chama a prop onProductClick
                    onClick={() => onProductClick(product)} 
                />
            ))}
        </div>
    );
};
