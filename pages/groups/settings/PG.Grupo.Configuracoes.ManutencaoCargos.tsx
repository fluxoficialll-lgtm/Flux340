
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGroupSettings } from '../../../Componentes/ComponentesDeGroups/hooks/useGroupSettings';
import { CabecalhoConfiguracaoManutencaoCargos } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Manutencao.Cargos';

// Mock data for roles - replace with actual data from your backend
const mockRoles = [
    { id: '1', name: 'Admin', color: '#ff0000' },
    { id: '2', name: 'Moderator', color: '#00ff00' },
    { id: '3', name: 'Member', color: '#0000ff' },
];

export const PGGrupoConfiguracoesManutencaoCargos: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { group, loading } = useGroupSettings();
    const [roles, setRoles] = useState(mockRoles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<{ id: string; name: string; color: string } | null>(null);

    const handleOpenModal = (role: { id: string; name: string; color: string } | null) => {
        setSelectedRole(role);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRole(null);
    };

    const handleSaveRole = (role: { id: string; name: string; color: string }) => {
        if (selectedRole) {
            setRoles(roles.map(r => (r.id === role.id ? role : r)));
        } else {
            setRoles([...roles, { ...role, id: `${roles.length + 1}` }]);
        }
        handleCloseModal();
    };

    const handleDeleteRole = (roleId: string) => {
        setRoles(roles.filter(r => r.id !== roleId));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center text-white">
                <i className="fa-solid fa-circle-notch fa-spin text-2xl text-[#00c2ff]"></i>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoManutencaoCargos titulo="Manutenção de Cargos" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[120px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <div className="space-y-4">
                    {roles.map(role => (
                        <div key={role.id} className="bg-black/20 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                            <div className="flex items-center">
                                <div className="w-4 h-4 rounded-full mr-4" style={{ backgroundColor: role.color }}></div>
                                <span className="font-semibold">{role.name}</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <button onClick={() => handleOpenModal(role)} className="text-gray-400 hover:text-white">
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button onClick={() => handleDeleteRole(role.id)} className="text-gray-400 hover:text-red-500">
                                    <i className="fa-solid fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-[#0c0f14]/80 backdrop-blur-sm z-30">
                <div className="max-w-2xl mx-auto p-4">
                    <button
                        onClick={() => handleOpenModal(null)}
                        className="w-full bg-[#00c2ff] text-black font-bold py-3.5 px-4 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,194,255,0.4)]"
                    >
                        Adicionar Novo Cargo
                    </button>
                </div>
            </footer>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-[#1a1f29] rounded-2xl p-6 w-full max-w-sm m-4">
                        <h2 className="text-xl font-bold mb-4">{selectedRole ? 'Editar Cargo' : 'Adicionar Cargo'}</h2>
                        {/* Add your form here */}
                        <form onSubmit={e => {
                            e.preventDefault();
                            const form = e.target as HTMLFormElement;
                            const name = (form.elements.namedItem('name') as HTMLInputElement).value;
                            const color = (form.elements.namedItem('color') as HTMLInputElement).value;
                            handleSaveRole({ id: selectedRole?.id || '', name, color });
                        }}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nome do Cargo</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    defaultValue={selectedRole?.name}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c2ff] transition-all"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label htmlFor="color" className="block text-sm font-medium text-gray-400 mb-2">Cor do Cargo</label>
                                <input
                                    type="color"
                                    id="color"
                                    name="color"
                                    defaultValue={selectedRole?.color}
                                    className="w-full h-12 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00c2ff] transition-all"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button type="button" onClick={handleCloseModal} className="bg-gray-700 text-white font-bold py-2 px-4 rounded-xl">Cancelar</button>
                                <button type="submit" className="bg-[#00c2ff] text-black font-bold py-2 px-4 rounded-xl">Salvar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
