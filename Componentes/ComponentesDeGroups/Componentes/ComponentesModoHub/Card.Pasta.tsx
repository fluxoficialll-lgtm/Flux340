import React from 'react';
import { FaFolder } from 'react-icons/fa';

interface PastaCardProps {
  nomePasta: string;
  onClick: () => void;
}

const PastaCard: React.FC<PastaCardProps> = ({ nomePasta, onClick }) => {
  return (
    <div
      className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
      onClick={onClick}
    >
      <FaFolder className="text-yellow-500 text-5xl mb-3" />
      <span className="text-white font-semibold text-center">{nomePasta}</span>
    </div>
  );
};

export default PastaCard;
