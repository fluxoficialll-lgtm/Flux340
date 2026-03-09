
import React, { useState } from 'react';
import { EntidadePermissions, ModalPermissoesEntidade } from './Modal.Permissoes.Entidade'; // Importando o novo modal

// Estado inicial para as novas permissões da entidade
const initialPermissions: EntidadePermissions = {
    podeVer: true, // Por padrão, o cargo de entrada pode ver o conteúdo
    podeEditar: false,
    podeDeletar: false,
    podeGerenciarConteudo: false,
};

// Componente Principal do Card
const CardCargoPadrao: React.FC = () => {
    const [permissions, setPermissions] = useState<EntidadePermissions>(initialPermissions);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updatePermission = (key: keyof EntidadePermissions) => {
        setPermissions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <div className="bg-black/20 border border-white/10 rounded-2xl p-6">
                <div className="flex justify-between items-center">
                    <div className="flex-grow pr-4">
                        <h3 className="text-lg font-bold text-white">Cargo Padrão de Entrada</h3>
                        <p className="text-gray-400 text-sm mt-1">
                            Este será o cargo atribuído automaticamente a novos membros.
                        </p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
                    >
                         <i className="fa-solid fa-pen-to-square"></i>
                         <span>Editar</span>
                    </button>
                </div>
            </div>

            {/* Usando o novo Modal de Permissões de Entidade */}
            <ModalPermissoesEntidade 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                permissions={permissions}
                onUpdatePermission={updatePermission}
                nomeCargo="Cargo Padrão de Entrada"
                nomeEntidade="Pasta/Seção Atual" // Este nome seria passado como prop dinamicamente
            />
        </> 
    );
};

export default CardCargoPadrao;
