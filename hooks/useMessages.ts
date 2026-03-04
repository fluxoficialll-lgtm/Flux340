
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { chatService } from '../ServiçosFrontend/ServiçoDeChat/chatService';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { Contact } from '../types';

const formatLastSeen = (timestamp?: number) => {
    if (!timestamp) return "Offline";
    const diff = Date.now() - timestamp;
    if (diff < 2 * 60 * 1000) return "online";
    const date = new Date(timestamp);
    return `Visto por último às ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};

export const useMessages = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [unreadMsgs, setUnreadMsgs] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // Adicionado estado de loading

    // Carrega e formata os dados das conversas
    const loadData = useCallback(async () => {
        const rawUserEmail = authService.getCurrentUserEmail();
        if (!rawUserEmail) {
            setIsLoading(false);
            return;
        }

        try {
            // Assumindo que chatService.listConversations() é síncrono por enquanto,
            // para minimizar as alterações, mas idealmente seria async.
            const rawChats = chatService.listConversations(); // Esta chamada permanece como estava no seu código
            const allUsers = servicoDeSimulacao.users.getAll(); // Acesso direto mantido para evitar quebrar a UI

            const formattedContacts: Contact[] = Object.values(rawChats).map((chat): Contact | null => {
                 const otherUserEmail = chat.participants.find(p => p.email.toLowerCase() !== rawUserEmail.toLowerCase())?.email;
                 if (!otherUserEmail) return null; // Ignora chats sem outro participante

                 const targetUser = allUsers[Object.keys(allUsers).find(k => allUsers[k].email.toLowerCase() === otherUserEmail.toLowerCase()) || ''];
                 const lastMsg = chat.messages[chat.messages.length - 1];
                 if (!lastMsg) return null;

                 const isMe = (lastMsg.senderEmail || lastMsg.senderId)?.toLowerCase() === rawUserEmail.toLowerCase();
                 const previewText = `${isMe ? 'Você: ' : ''}${lastMsg.text}`;

                 return {
                     id: chat.id.toString(),
                     name: targetUser?.profile?.nickname || targetUser?.profile?.name || 'Usuário',
                     handle: targetUser?.profile?.name || '',
                     avatar: targetUser?.profile?.photoUrl,
                     lastMessage: previewText,
                     lastMessageTime: new Date(lastMsg.timestamp).getTime(),
                     time: lastMsg.timestamp,
                     status: formatLastSeen(targetUser?.lastSeen),
                     isOnline: formatLastSeen(targetUser?.lastSeen) === 'online',
                     unreadCount: chat.unreadCount || 0,
                 };
            }).filter((c): c is Contact => c !== null).sort((a, b) => b.lastMessageTime - a.lastMessageTime);

            setContacts(formattedContacts);
            setUnreadMsgs(await chatService.getUnreadCount());

        } catch (error) {
            console.error("Erro ao carregar dados do chat:", error);
        } finally {
            if (isLoading) setIsLoading(false); // Só altera na primeira carga
        }
    }, [isLoading]); // A dependência garante que não entre em loop

    // Efeito para carregar dados com polling
    useEffect(() => {
        loadData(); // Carga inicial
        
        // **CORREÇÃO APLICADA AQUI**
        // Substitui o `subscribe` por um `setInterval` para fazer polling.
        // Isso corrige o crash e mantém os dados atualizados.
        const intervalId = setInterval(loadData, 5000); // Atualiza a cada 5 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [loadData]);

    const handleContactClick = (contact: Contact) => {
        if (isSelectionMode) {
            setSelectedIds(prev => prev.includes(contact.id) ? prev.filter(i => i !== contact.id) : [...prev, contact.id]);
        } else {
            navigate(`/chat/${contact.id}`);
        }
    };
    
    // Funções de UI permanecem as mesmas
    const handleMarkAllRead = () => {
        console.log("Marcar todas como lidas (a ser implementado)");
    };
    const handleClearSelected = () => {
        console.log("Limpar selecionadas (a ser implementado)");
    };
    const handleProfileNavigate = (e: React.MouseEvent, handle: string) => {
        e.stopPropagation();
        if (handle) navigate(`/user/${handle.replace('@', '')}`);
    };
    const closeMenuAndEnterSelection = () => {
        setIsMenuModalOpen(false);
        setIsSelectionMode(true);
    };

    return {
        contacts,
        isLoading,
        isMenuModalOpen,
        setIsMenuModalOpen,
        isSelectionMode,
        setIsSelectionMode,
        selectedIds,
        unreadMsgs,
        handleMarkAllRead,
        handleContactClick,
        handleProfileNavigate,
        handleClearSelected,
        closeMenuAndEnterSelection,
        // Removido o unreadNotifs para simplificar, já que a notificação tem seu próprio serviço
    };
};
