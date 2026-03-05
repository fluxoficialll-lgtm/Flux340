
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';

// Mock data for messages
const mockMessages = [
    { id: '1', user: 'Alice', content: 'Olá a todos!', timestamp: '2024-07-22 10:00' },
    { id: '2', user: 'Bob', content: 'Bem-vindo ao grupo.', timestamp: '2024-07-22 10:05' },
    { id: '3', user: 'Charlie', content: 'Alguma novidade?', timestamp: '2024-07-22 10:10' },
];

export const PGGrupoConfiguracoesAuditoriaDeMensagens: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [messages, setMessages] = useState(mockMessages);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMessages = messages.filter(msg =>
        msg.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Mensagens" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-2xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <input
                    type="text"
                    placeholder="Buscar por usuário ou conteúdo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="space-y-4">
                    {filteredMessages.map(message => (
                        <div key={message.id} className="bg-black/20 border border-white/10 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">{message.user}</span>
                                <span className="text-xs text-gray-400">{message.timestamp}</span>
                            </div>
                            <p>{message.content}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};
