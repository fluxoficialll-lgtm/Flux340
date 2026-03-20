
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatService } from '../ServiçosFrontend/ServiçoDeChat/chatService';
import { Contact } from '../types';

export const HookListaConversas = () => {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [unreadMsgs, setUnreadMsgs] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const isSimulating = localStorage.getItem('isSimulating') === 'true';

            if (isSimulating) {
                console.log("[SIMULAÇÃO] useMessages: Buscando conversas do endpoint de simulação /api/conversas");
                const response = await fetch('/api/conversas');
                const conversations = await response.json();
                setContacts(conversations || []);
            } else {
                // Lógica original, se necessário
                const rawChats = chatService.listConversas(); 
                // ... (formatação complexa)
            }
        } catch (error) {
            console.error("Erro ao carregar dados do chat:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
        const intervalId = setInterval(loadData, 5000); 
        return () => clearInterval(intervalId);
    }, [loadData]);

    const handleContactClick = (contact: Contact) => {
        if (isSelectionMode) {
            setSelectedIds(prev => prev.includes(contact.id) ? prev.filter(i => i !== contact.id) : [...prev, contact.id]);
        } else {
            navigate(`/chat/${contact.id}`);
        }
    };
    
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
        setSelectedIds,
        unreadMsgs,
        handleMarkAllRead,
        handleContactClick,
        handleProfileNavigate,
        handleClearSelected,
        closeMenuAndEnterSelection,
    };
};
