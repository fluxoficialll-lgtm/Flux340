
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CabecalhoConfiguracaoInformacao } from '../../../Componentes/cabeçalhos/Cabecalho.Configuracao.Informacao';
import CardAuditoriaMensagens from '../../../Componentes/ComponentesDeGroups/Componentes/ComponentesDeConfiguracoesDeGrupo/Card.Auditoria.Mensagens';

// --- Tipagens (devem ser consistentes com o card) ---
interface Message {
    id: string;
    author: {
        id: string;
        name: string;
        role: string;
        avatarUrl?: string;
    };
    content: string;
    timestamp: Date;
    isReported?: boolean;
}

// --- Mock Data Atualizado e Mais Realista ---
const mockAuthors = {
    '1': { id: '1', name: 'Ana de Almeida', role: 'Admin', avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg' },
    '2': { id: '2', name: 'Beto Malfacini', role: 'Membro', avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
    '3': { id: '3', name: 'Carla Zambelli', role: 'Membro', avatarUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
    '4': { id: '4', name: 'David Luis', role: 'Moderador', avatarUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
};

const initialMessages: Message[] = [
    { id: 'msg1', author: mockAuthors['1'], content: 'Pessoal, lembrem-se das diretrizes da comunidade. Sem spam, por favor.', timestamp: new Date('2024-07-23T10:00:00Z') },
    { id: 'msg2', author: mockAuthors['2'], content: 'Alguém pode me ajudar com o exercício 3 da aula de ontem?', timestamp: new Date('2024-07-23T11:30:00Z') },
    { id: 'msg3', author: mockAuthors['3'], content: 'VENDO CURSO DE MARKETING DIGITAL PELA METADE DO PREÇO CHAMAR PRIVADO', timestamp: new Date('2024-07-23T14:00:00Z'), isReported: true },
    { id: 'msg4', author: mockAuthors['4'], content: '@Carla Zambelli, este tipo de mensagem não é permitido aqui. Por favor, reveja as regras.', timestamp: new Date('2024-07-23T14:05:00Z') },
    { id: 'msg5', author: mockAuthors['2'], content: 'Obrigado pela ajuda, @David Luis!', timestamp: new Date('2024-07-23T15:00:00Z') },
    { id: 'msg6', author: mockAuthors['3'], content: 'Foi mal, não sabia.', timestamp: new Date('2024-07-23T14:10:00Z') },
].sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()); // Ordenar do mais recente para o mais antigo


// --- Página Principal ---
export const PGGrupoConfiguracoesAuditoriaDeMensagens: React.FC = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<Message[]>(initialMessages);

    const handleDeleteMessage = (messageId: string) => {
        console.log(`Apagando mensagem: ${messageId}`);
        setMessages(prev => prev.filter(msg => msg.id !== messageId));
        // Adicionar lógica de API para apagar
    };

    const handleWarnAuthor = (authorId: string) => {
        console.log(`Advertindo autor: ${authorId}`);
        // Adicionar lógica para abrir modal de punição ou advertir diretamente via API
        alert(`O autor ${mockAuthors[authorId as keyof typeof mockAuthors]?.name} foi advertido (simulação).`);
    };

    const memberListForFilter = Object.values(mockAuthors).map(({ id, name }) => ({ id, name }));

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#0c0f14,_#0a0c10)] text-white font-['Inter'] flex flex-col">
            <CabecalhoConfiguracaoInformacao titulo="Auditoria de Mensagens" onBack={() => navigate(-1)} />

            <main className="pt-[85px] pb-[40px] w-full max-w-4xl mx-auto px-5 overflow-y-auto flex-grow no-scrollbar">
                <CardAuditoriaMensagens
                    messages={messages}
                    members={memberListForFilter}
                    onDelete={handleDeleteMessage}
                    onWarn={handleWarnAuthor}
                />
            </main>
        </div>
    );
};
