
import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VirtuosoHandle } from 'react-virtuoso';
import { Group, Message } from '../tipos'; 
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos';

export const useGroupChat = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const virtuosoRef = useRef<VirtuosoHandle>(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [groupInfo, setGroupInfo] = useState<Group | null>(null);
    const [channelName, setChannelName] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

    useEffect(() => {
        // Pega o e-mail do usuário logado assim que o hook é montado
        setCurrentUserEmail(authService.getCurrentUserEmail()?.toLowerCase() || null);
    }, []);

    const loadChatData = useCallback(async (groupId: string) => {
        setLoading(true);
        setError(null);
        try {
            // CORREÇÃO: Chama a função que busca TODOS os dados do chat (grupo, canal, mensagens)
            const data = await groupSystem.getGroupChatData(groupId);
            
            // A simulação agora retorna { group, channelName, messages }
            setGroupInfo(data.group);
            setChannelName(data.channelName);
            setMessages(data.messages || []); // Garante que messages seja sempre um array

        } catch (err) {
            console.error("[useGroupChat] Falha ao carregar dados do chat:", err);
            setError("Não foi possível carregar as informações do grupo. Tente novamente mais tarde.");
            setGroupInfo(null);
            setMessages([]); // Garante que messages seja um array em caso de erro
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (id) {
            loadChatData(id);
        }
    }, [id, loadChatData]);

    const handleSendMessage = (text: string, media?: any) => {
        console.log("Enviando mensagem:", { text, media });
        // Lógica de envio de mensagem (simulada)
        const newMessage: Message = {
            id: `msg-${Date.now()}`,
            senderEmail: currentUserEmail || 'unknown@user.com',
            senderName: 'Eu', // O nome real viria do perfil
            senderAvatar: 'https://i.pravatar.cc/150?u=me',
            text,
            timestamp: Date.now(),
        };
        setMessages(prev => [...prev, newMessage]);
    };
    
    const handleToggleSelection = (messageId: string) => {
        setSelectedIds(prev =>
            prev.includes(messageId)
                ? prev.filter(id => id !== messageId)
                : [...prev, messageId]
        );
    };

    const handleStartSelection = (messageId: string) => {
        setIsSelectionMode(true);
        setSelectedIds([messageId]);
    };

    const deleteSelectedMessages = (mode: 'me' | 'all') => {
        console.log(`Deletando ${selectedIds.length} mensagens (modo: ${mode})`);
        setMessages(prev => prev.filter(msg => !selectedIds.includes(msg.id)));
        setIsSelectionMode(false);
        setSelectedIds([]);
    };


    return {
        loading, error, group: groupInfo, channelName, messages, isBlocked, virtuosoRef, isSelectionMode, selectedIds, currentUserEmail,
        handleSendMessage, handleToggleSelection, handleStartSelection, deleteSelectedMessages, setIsSelectionMode, setSelectedIds, navigate
    };
};
