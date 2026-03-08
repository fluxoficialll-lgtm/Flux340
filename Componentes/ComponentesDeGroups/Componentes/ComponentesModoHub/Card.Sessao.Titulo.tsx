
import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import ModalGestao from './Modal.Gestao';

interface CardSessaoTituloProps {
  titulo: string;
}

const CardSessaoTitulo: React.FC<CardSessaoTituloProps> = ({ titulo }) => {
  const [modalAberto, setModalAberto] = useState(false);

  const handleEdit = () => {
    console.log(`Editando a seção: ${titulo}`);
    setModalAberto(false);
  };

  const handleDelete = () => {
    console.log(`Deletando a seção: ${titulo}`);
    setModalAberto(false);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-xl font-bold text-gray-100 tracking-wide">
                  {titulo}
              </h2>
          </div>
          <button onClick={() => setModalAberto(true)} className="text-gray-400 hover:text-white p-2 rounded-full transition-colors">
              <FaCog size={20} />
          </button>
      </div>

      {modalAberto && (
        <ModalGestao 
          onClose={() => setModalAberto(false)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};

export default CardSessaoTitulo;
