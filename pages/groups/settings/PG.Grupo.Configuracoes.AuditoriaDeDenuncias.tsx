
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';
import CardAuditoriaDenuncias from '../../../Componentes/ComponentesDeGroups/Componentes/ComponentesDeConfiguracoesDeGrupo/Card.Auditoria.Denuncias';

// --- Tipagens Consistentes ---
type ReportStatus = 'pending' | 'resolved' | 'ignored';

interface Member {
    id: string;
    name: string;
    avatarUrl?: string;
}

interface Report {
    id: string;
    reporter: Member;
    reported: Member;
    content: string;
    reason: string;
    timestamp: Date;
    status: ReportStatus;
}

// --- Mock Data Atualizado ---
const mockMembers = {
    '1': { id: '1', name: 'Ana de Almeida', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    '2': { id: '2', name: 'Beto Malfacini', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
    '3': { id: '3', name: 'Carla Zambelli', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
    '4': { id: '4', name: 'David Luis', avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
};

const initialReports: Report[] = [
    {
        id: 'rep1',
        reporter: mockMembers['1'],
        reported: mockMembers['3'],
        content: 'VENDO CURSO DE MARKETING DIGITAL PELA METADE DO PREÇO CHAMAR PRIVADO',
        reason: 'Spam / Propaganda',
        timestamp: new Date('2024-07-23T14:01:00Z'),
        status: 'pending',
    },
    {
        id: 'rep2',
        reporter: mockMembers['2'],
        reported: mockMembers['4'],
        content: 'Isso não faz o menor sentido, você é burro?',
        reason: 'Comportamento Ofensivo / Assédio',
        timestamp: new Date('2024-07-22T18:30:00Z'),
        status: 'resolved',
    },
    {
        id: 'rep3',
        reporter: mockMembers['4'],
        reported: mockMembers['2'],
        content: 'Alguém pode me ajudar com o exercício 3 da aula de ontem?',
        reason: 'Denúncia Falsa / Abuso da Ferramenta',
        timestamp: new Date('2024-07-22T19:00:00Z'),
        status: 'ignored',
    },
].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

// --- Página Principal ---
export const PGGrupoConfiguracoesAuditoriaDeDenuncias: React.FC = () => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<Report[]>(initialReports);

    const handleStatusChange = (reportId: string, newStatus: ReportStatus) => {
        console.log(`Alterando status da denúncia ${reportId} para ${newStatus}`);
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: newStatus } : r));
        // Lógica de API para atualizar o status
    };

    const handlePunish = (memberId: string) => {
        const memberName = mockMembers[memberId as keyof typeof mockMembers]?.name || 'desconhecido';
        console.log(`Iniciando processo de punição para o membro: ${memberId} (${memberName})`);
        alert(`Ações de punição para ${memberName} foram iniciadas (simulação).`);
        // Lógica para abrir modal de punição, etc.
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Denúncias" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-4xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <CardAuditoriaDenuncias
                    reports={reports}
                    onStatusChange={handleStatusChange}
                    onPunish={handlePunish}
                />
            </main>
        </div>
    );
};
