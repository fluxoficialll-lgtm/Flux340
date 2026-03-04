
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { groupSystem } from '../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js'; 
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { Group, Message } from '../types';

export const useGroupChat = () => {
    const { id } = useParams<{ id: string }>();
    const [groupInfo, setGroupInfo] = useState<Group | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [newMessage, setNewMessage] = useState('');
    const currentUser = authService.getCurrentUser();

    const loadChatData = useCallback(async (groupId: string) => {
        setLoading(true);
        setError(null);
        try {
            // CORREÇÃO FINAL: Chamando a função correta `getGroupDetails` que existe no serviço.
            const data = await groupSystem.getGroupDetails(groupId);
            
            // Assumindo que a simulação retorna { details, messages }
            setGroupInfo(data.details);
            setMessages(data.messages);

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

    const sendMessage = async () => {
        if (!newMessage.trim() || !id || !currentUser) return;

        const tempId = Date.now().toString();
        const messageToSend: Message = {
            id: tempId,
            userId: currentUser.id,
            author: currentUser.name || 'Você',
            avatar: currentUser.avatar,
            text: newMessage,
            timestamp: Date.now(),
            isMe: true,
        };

        setMessages(prev => [...prev, messageToSend]);
        setNewMessage('');

        try {
            // Este método também precisa existir no serviço. 
            // Assumindo que `sendMessage` é o nome correto.
            await groupSystem.sendMessage(id, newMessage);
        } catch (err) {
            console.error("Falha ao enviar mensagem:", err);
            setMessages(prev => prev.filter(m => m.id !== tempId));
            setError("Sua mensagem não pôde ser enviada.");
        }
    };

    return {
        groupInfo,
        messages,
        loading,
        error,
        newMessage,
        setNewMessage,
        sendMessage,
    };
};
