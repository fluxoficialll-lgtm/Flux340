
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGroupSettings } from '../../../Componentes/ComponentesDeGroups/hooks/useGroupSettings';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

// Mock data for members and roles
const mockMembers = [
    { id: '1', name: 'Alice', roleId: '3' },
    { id: '2', name: 'Bob', roleId: '3' },
    { id: '3', name: 'Charlie', roleId: '2' },
    { id: '4', name: 'David', roleId: '1' },
];

const mockRoles = [
    { id: '1', name: 'Admin', color: '#ff0000' },
    { id: '2', name: 'Moderator', color: '#00ff00' },
    { id: '3', name: 'Member', color: '#0000ff' },
];

export const PGGrupoConfiguracoesDistribuiçaoDeCargos: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { group, loading } = useGroupSettings();
    const [memberRoles, setMemberRoles] = useState<{[key: string]: string}>({});

    useEffect(() => {
        // Initialize member roles state
        const initialRoles = mockMembers.reduce((acc, member) => {
            acc[member.id] = member.roleId;
            return acc;
        }, {} as {[key: string]: string});
        setMemberRoles(initialRoles);
    }, []);

    const handleRoleChange = (memberId: string, roleId: string) => {
        setMemberRoles(prev => ({ ...prev, [memberId]: roleId }));
    };

    const handleSaveChanges = () => {
        console.log('Saving role distribution:', memberRoles);
        alert('Distribuição de cargos salva com sucesso! (Simulação)');
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
            <CabecalhoConfiguracaoInformacao titulo="Distribuição de Cargos" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[120px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <div className="space-y-4">
                    {mockMembers.map(member => (
                        <div key={member.id} className="bg-black/20 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                            <span className="font-semibold">{member.name}</span>
                            <select
                                value={memberRoles[member.id] || ''}
                                onChange={(e) => handleRoleChange(member.id, e.target.value)}
                                className="bg-black/20 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#00c2ff]"
                            >
                                {mockRoles.map(role => (
                                    <option key={role.id} value={role.id} style={{ color: 'black' }}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="fixed bottom-0 left-0 right-0 bg-[#0c0f14]/80 backdrop-blur-sm z-30">
                <div className="max-w-2xl mx-auto p-4">
                    <button
                        onClick={handleSaveChanges}
                        className="w-full bg-[#00c2ff] text-black font-bold py-3.5 px-4 rounded-xl hover:bg-white transition-all duration-300 shadow-[0_4px_20px_rgba(0,194,255,0.4)]"
                    >
                        Salvar Alterações
                    </button>
                </div>
            </footer>
        </div>
    );
};
