
import React from 'react';

interface ModalGestaoProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ModalGestao: React.FC<ModalGestaoProps> = ({ onClose, onEdit, onDelete }) => {
  // Impede que o clique dentro do modal o feche
  const handleModalContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center" onClick={onClose}>
      <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-sm p-6 border border-gray-700" onClick={handleModalContentClick}>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-white">Gerenciar Seção</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <p className="text-gray-300 mb-6">
          O que você gostaria de fazer com esta seção?
        </p>
        <div className="flex flex-col gap-4">
          <button 
            onClick={onEdit} 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-all transform hover:scale-105"
          >
            Editar Seção
          </button>
          <button 
            onClick={onDelete} 
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-all transform hover:scale-105"
          >
            Deletar Seção
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalGestao;
