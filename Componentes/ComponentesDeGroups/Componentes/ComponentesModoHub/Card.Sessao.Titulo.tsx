
import React from 'react';

interface CardSessaoTituloProps {
  titulo: string;
}

const CardSessaoTitulo: React.FC<CardSessaoTituloProps> = ({ titulo }) => {
  return (
    <h2 className="text-2xl font-bold text-white border-b-2 border-gray-700 pb-3 mb-6">
      {titulo}
    </h2>
  );
};

export default CardSessaoTitulo;
