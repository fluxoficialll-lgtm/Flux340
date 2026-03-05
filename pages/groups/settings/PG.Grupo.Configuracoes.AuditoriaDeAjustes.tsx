
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

// Mock data for settings adjustments
const mockAdjustments = [
    { id: '1', admin: 'Alice', setting: 'Nome do Grupo', oldValue: 'Grupo Antigo', newValue: 'Novo Nome do Grupo', timestamp: '2024-07-22 10:00' },
    { id: '2', admin: 'Bob', setting: 'Descrição', oldValue: 'Descrição antiga', newValue: 'Nova descrição do grupo', timestamp: '2024-07-22 10:05' },
    { id: '3', admin: 'Alice', setting: 'Privacidade', oldValue: 'Público', newValue: 'Privado', timestamp: '2024-07-22 10:10' },
];

export const PGGrupoConfiguracoesAuditoriaDeAjustes: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [adjustments, setAdjustments] = useState(mockAdjustments);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredAdjustments = adjustments.filter(adj =>
        adj.admin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.setting.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Ajustes" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <input
                    type="text"
                    placeholder="Buscar por administrador ou ajuste..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-4">
                    {filteredAdjustments.map(adj => (
                        <div key={adj.id} className="bg-black/20 border border-white/10 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{adj.setting}</span>
                                <span className="text-xs text-gray-400">{adj.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-400">Ajustado por: {adj.admin}</p>
                            <p className="mt-1">De: <span className='text-red-400'>{adj.oldValue}</span></p>
                            <p>Para: <span className='text-green-400'>{adj.newValue}</span></p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
