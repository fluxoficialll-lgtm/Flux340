
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

// Mock data for entry/exit logs
const mockLogs = [
    { id: '1', user: 'Alice', action: 'entrou', timestamp: '2024-07-22 10:00' },
    { id: '2', user: 'Bob', action: 'saiu', timestamp: '2024-07-22 10:05' },
    { id: '3', user: 'Charlie', action: 'entrou', timestamp: '2024-07-22 10:10' },
    { id: '4', user: 'David', action: 'saiu', timestamp: '2024-07-22 10:15' },
];

export const PGGrupoConfiguracoesAuditoriaDeEntradaESaida: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [logs, setLogs] = useState(mockLogs);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = logs.filter(log =>
        log.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Entrada e Saída" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <input
                    type="text"
                    placeholder="Buscar por usuário..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-4">
                    {filteredLogs.map(log => (
                        <div key={log.id} className="bg-black/20 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                            <div>
                                <span className="font-semibold">{log.user}</span>
                                <span className={`ml-2 text-sm ${log.action === 'entrou' ? 'text-green-400' : 'text-red-400'}`}>
                                    {log.action}
                                </span>
                            </div>
                            <span className="text-xs text-gray-400">{log.timestamp}</span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
