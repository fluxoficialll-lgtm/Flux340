
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';
import CardAuditoriaAjustes from '../../../Componentes/ComponentesDeGroups/Componentes/ComponentesDeConfiguracoesDeGrupo/Card.Auditoria.Ajustes';

// --- Tipagens Consistentes ---
interface Admin {
    id: string;
    name: string;
    avatarUrl?: string;
}

interface AdjustmentLog {
    id: string;
    admin: Admin;
    action: string;
    category: string;
    from?: string;
    to?: string;
    timestamp: Date;
}

// --- Mock Data Atualizado ---
const mockAdmins = {
    '1': { id: '1', name: 'Ana de Almeida', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    '2': { id: '2', name: 'Beto Malfacini', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
};

const initialLogs: AdjustmentLog[] = [
    {
        id: 'adj1',
        admin: mockAdmins['1'],
        action: 'alterou o nome do grupo',
        category: 'Informações',
        from: 'Amantes de React',
        to: 'Feras do TypeScript & React',
        timestamp: new Date('2024-07-23T11:05:00Z'),
    },
    {
        id: 'adj2',
        admin: mockAdmins['2'],
        action: 'adicionou uma nova regra',
        category: 'Diretrizes',
        to: '#4: Proibido discutir sobre política.',
        timestamp: new Date('2024-07-23T09:30:00Z'),
    },
    {
        id: 'adj3',
        admin: mockAdmins['1'],
        action: 'alterou a cor do cargo "Moderador"',
        category: 'Cargos',
        from: '#3498db',
        to: '#e74c3c',
        timestamp: new Date('2024-07-22T15:00:00Z'),
    },
        {
        id: 'adj4',
        admin: mockAdmins['1'],
        action: 'alterou as permissões de convite',
        category: 'Moderação',
        from: 'Qualquer membro pode convidar',
        to: 'Apenas admins e moderadores podem convidar',
        timestamp: new Date('2024-07-21T18:20:00Z'),
    },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

// --- Página Principal ---
export const PGGrupoConfiguracoesAuditoriaDeAjustes: React.FC = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState<AdjustmentLog[]>(initialLogs);

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Ajustes" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-4xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <CardAuditoriaAjustes logs={logs} />
            </main>
        </div>
    );
};
