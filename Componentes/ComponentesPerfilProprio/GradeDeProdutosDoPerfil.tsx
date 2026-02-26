import React from 'react';

interface ProfileProductsGridProps {
    products: any[];
}

export const GradeDeProdutosDoPerfil: React.FC<ProfileProductsGridProps> = ({ products }) => {
    if (!products || products.length === 0) {
        return <div className="no-content">Sem produtos.</div>;
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-4">
            {products.map(product => (
                <div key={product.id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                    <div className="p-4">
                        <h3 className="font-bold text-lg">{product.name}</h3>
                        <p className="text-gray-400">{product.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};
