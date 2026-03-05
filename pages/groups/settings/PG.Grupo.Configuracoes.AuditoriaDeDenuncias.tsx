
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

// Mock data for reports
const mockReports = [
    { id: '1', reporter: 'Alice', reportedUser: 'Bob', reason: 'Spam', status: 'Pendente' },
    { id: '2', reporter: 'Charlie', reportedUser: 'David', reason: 'Comportamento abusivo', status: 'Resolvido' },
    { id: '3', reporter: 'Eve', reportedUser: 'Frank', reason: 'Conteúdo impróprio', status: 'Pendente' },
];

export const PGGrupoConfiguracoesAuditoriaDeDenuncias: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [reports, setReports] = useState(mockReports);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = reports.filter(report =>
        report.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reportedUser.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.reason.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Denúncias" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <input
                    type="text"
                    placeholder="Buscar por denunciante, denunciado ou motivo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-4">
                    {filteredReports.map(report => (
                        <div key={report.id} className="bg-black/20 border border-white/10 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{report.reportedUser}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${report.status === 'Pendente' ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                                    {report.status}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400">Denunciado por: {report.reporter}</p>
                            <p className="mt-1">Motivo: {report.reason}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
