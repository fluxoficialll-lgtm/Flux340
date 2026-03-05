
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

// Mock data for members
const mockMembers = [
    { id: '1', name: 'Ana', warnings: 1 },
    { id: '2', name: 'Beto', warnings: 0 },
    { id: '3', name: 'Carla', warnings: 3 },
];

export const PGGrupoConfiguracoesAcoesAdministrativas: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [members, setMembers] = useState(mockMembers);

    const handleWarn = (memberId: string) => {
        setMembers(members.map(m => m.id === memberId ? { ...m, warnings: m.warnings + 1 } : m));
    };

    const handleKick = (memberId: string) => {
        setMembers(members.filter(m => m.id !== memberId));
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Ações Administrativas" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <div className="space-y-4">
                    {members.map(member => (
                        <div key={member.id} className="bg-black/20 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                            <span className="font-semibold">{member.name} (Advertências: {member.warnings})</span>
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleWarn(member.id)} className="bg-yellow-500 text-black font-bold py-1 px-3 rounded-lg text-sm">Advertir</button>
                                <button onClick={() => handleKick(member.id)} className="bg-red-500 text-white font-bold py-1 px-3 rounded-lg text-sm">Remover</button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
