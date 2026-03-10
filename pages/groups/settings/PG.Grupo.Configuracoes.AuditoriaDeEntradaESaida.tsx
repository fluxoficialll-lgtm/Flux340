
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';
import CardAuditoriaEntradaSaida from '../../../Componentes/ComponentesDeGroups/Componentes/ComponentesDeConfiguracoesDeGrupo/Card.Auditoria.EntradaSaida';

// --- Tipagens (devem ser consistentes com o card) ---
type LogType = 'entry' | 'exit';

interface LogEntry {
    id: string;
    member: {
        id: string;
        name: string;
        avatarUrl?: string;
    };
    type: LogType;
    timestamp: Date;
    details?: string; 
}

// --- Mock Data Atualizado e Mais Realista ---
const mockMembers = {
    '1': { id: '1', name: 'Ana de Almeida', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    '2': { id: '2', name: 'Beto Malfacini', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
    '3': { id: '3', name: 'Carla Zambelli', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
    '4': { id: '4', name: 'David Luis', avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
    '5': { id: '5', name: 'Elena Rari', avatarUrl: 'https://randomuser.me/api/portraits/women/5.jpg' },
};

const initialLogs: LogEntry[] = [
    { id: 'log1', member: mockMembers['1'], type: 'entry', timestamp: new Date('2024-07-23T09:15:00Z'), details: 'Entrou via convite.' },
    { id: 'log2', member: mockMembers['2'], type: 'entry', timestamp: new Date('2024-07-22T18:30:00Z'), details: 'Entrou via link público.' },
    { id: 'log3', member: mockMembers['3'], type: 'exit', timestamp: new Date('2024-07-22T20:05:00Z') },
    { id: 'log4', member: mockMembers['4'], type: 'entry', timestamp: new Date('2024-07-21T10:00:00Z'), details: 'Convidado por Ana de Almeida.' },
    { id: 'log5', member: mockMembers['5'], type: 'entry', timestamp: new Date('2024-07-20T12:00:00Z'), details: 'Entrou via link público.' },
    { id: 'log6', member: mockMembers['2'], type: 'exit', timestamp: new Date('2024-07-23T11:45:00Z') },
].sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()); // Ordenar do mais recente para o mais antigo


// --- Página Principal ---
export const PGGrupoConfiguracoesAuditoriaDeEntradaESaida: React.FC = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState<LogEntry[]>(initialLogs);

    // No futuro, podemos adicionar interações, como clicar para ver o perfil do membro

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Entrada e Saída" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-4xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <CardAuditoriaEntradaSaida logs={logs} />
            </main>
        </div>
    );
};
