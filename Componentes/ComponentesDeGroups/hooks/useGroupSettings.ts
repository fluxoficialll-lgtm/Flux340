
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { groupSystem } from '../../../ServiçosFrontend/ServiçoDeGrupos/Sistema.Grupos.js';
import authService from '../../../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
// O serviço de simulação é importado, mas não possui o método subscribe.
import { servicoDeSimulacao } from '@/ServiçosFrontend/ServiçoDeSimulação';
import { useModal } from '../../ComponenteDeInterfaceDeUsuario/ModalSystem';
import { Group, ScheduledMessage } from '../../../types';

// Sub-hooks modulares
import { useGroupIdentity } from './settings/useGroupIdentity';
import { useGroupModeration } from './settings/useGroupModeration';
import { useGroupVIP } from './settings/useGroupVIP';
import { useGroupStructure } from './settings/useGroupStructure';
import { useGroupMembers } from './settings/useGroupMembers';

export const useGroupSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showAlert, showConfirm } = useModal();
    const [group, setGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    
    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const identity = useGroupIdentity(group);
    const moderation = useGroupModeration(group);
    const vip = useGroupVIP(group);
    const structure = useGroupStructure(group);
    const members = useGroupMembers(group);

    // Schedule Modal State
    const [isAddingSchedule, setIsAddingSchedule] = useState(false);
    const [newScheduleText, setNewScheduleText] = useState('');
    const [newScheduleDate, setNewScheduleDate] = useState('');
    const [newScheduleTime, setNewScheduleTime] = useState('');
    const [newScheduleChannelId, setNewScheduleChannelId] = useState('general');

    const loadGroup = useCallback(async (groupId: string) => {
        setLoading(true);
        try {
            const groupData = await groupSystem.getGroupDetails(groupId);
            setGroup(groupData);

            const currentUser = authService.getCurrentUser();
            if (currentUser) {
                setIsOwner(groupData.creatorId === currentUser.id);
                setIsAdmin(groupData.adminIds?.includes(currentUser.id) || false);
            }
        } catch (error) {
            console.error("Falha ao carregar os detalhes do grupo:", error);
            showAlert("Erro de Rede", "Não foi possível carregar as informações do grupo.");
            setGroup(null);
        } finally {
            setLoading(false);
        }
    }, [showAlert]);

    useEffect(() => {
        if (id) {
            loadGroup(id);
            // CORREÇÃO: A linha abaixo causava o erro e foi removida.
            // A funcionalidade de subscribe não existe no serviço de simulação.
            // const unsub = servicoDeSimulacao.subscribe('groups', () => loadGroup(id));
            // return () => unsub();
        }
    }, [id, loadGroup]);

    const handleSave = async () => {
        if (!group) return;
        await showAlert('Sucesso (Simulação)', 'Configurações sincronizadas com o servidor.');
    };

    const handleLeaveDelete = async (type: 'leave' | 'delete') => {
        if (!group || !id) return;

        if (type === 'leave') {
            if (await showConfirm("Sair do Grupo", "Deseja realmente sair desta comunidade?", "Sair", "Cancelar")) {
                console.log(`[SIMULAÇÃO] Saindo do grupo ${id}`);
                await showAlert("Ação (Simulação)", "Você saiu do grupo.");
                navigate('/groups');
            }
        } 
        
        else if (type === 'delete') {
            if (await showConfirm("EXCLUIR GRUPO", "Esta ação apagará o grupo para TODOS os membros. Não há volta. Confirmar?", "Excluir Tudo", "Cancelar")) {
                console.log(`[SIMULAÇÃO] Excluindo o grupo ${id}`);
                await showAlert("Ação (Simulação)", "O grupo foi excluído.");
                navigate('/groups');
            }
        }
    };

    const handleMemberAction = (userId: string, action: 'kick' | 'ban' | 'promote' | 'demote') => {
        if (!id) return;
        console.log(`[SIMULAÇÃO] Ação '${action}' no usuário ${userId} do grupo ${id}`);
        members.actions.refreshMembers(id);
    };

    const handlePendingAction = async (userId: string, action: 'accept' | 'deny') => {
        if (!id) return;
        console.log(`[SIMULAÇÃO] Ação '${action}' no pedido pendente do usuário ${userId}`);
        members.actions.refreshMembers(id);
    };

    const handleManualRelease = async (username: string): Promise<boolean> => {
        if (!username.trim() || !group) return false;
        console.log(`[SIMULAÇÃO] Liberando acesso manual para ${username}`);
        await showAlert("Sucesso (Simulação)", `Acesso liberado para ${username}.`);
        return true;
    };

    const handleAddSchedule = () => {
        if (!newScheduleText || !newScheduleDate || !newScheduleTime) return;
        const ts = new Date(`${newScheduleDate}T${newScheduleTime}`).getTime();
        const newMessage: ScheduledMessage = {
            id: Date.now().toString(),
            channelId: newScheduleChannelId,
            text: newScheduleText,
            scheduledTime: ts,
            isSent: false
        };
        const updated = [newMessage, ...structure.state.schedules];
        structure.actions.setSchedules(updated);
        setIsAddingSchedule(false);
        setNewScheduleText('');
    };

    const handleDeleteSchedule = async (sid: string) => {
        if (await showConfirm('Cancelar Agendamento?')) {
            const updated = structure.state.schedules.filter(s => s.id !== sid);
            structure.actions.setSchedules(updated);
        }
    };

    const form = {
        ...identity.state, ...identity.actions,
        ...moderation.state, ...moderation.actions,
        ...vip.state, ...vip.actions,
        ...structure.state, ...structure.actions,
        ...members.state, ...members.actions,

        // Schedule state and actions
        isAddingSchedule,
        newScheduleText,
        newScheduleDate,
        newScheduleTime,
        newScheduleChannelId,
        setIsAddingSchedule,
        setNewScheduleText,
        setNewScheduleDate,
        setNewScheduleTime,
        setNewScheduleChannelId,
        handleAddSchedule,
        handleDeleteSchedule
    };

    return { 
        group, 
        loading, 
        isOwner, 
        isAdmin, 
        handleSave, 
        handleLeaveDelete, 
        handleMemberAction, 
        handlePendingAction,
        handleManualRelease,
        form 
    };
};
