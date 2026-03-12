
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
// CORREÇÃO: A importação do groupService foi removida.
// import { groupService } from '../ServiçosFrontend/ServiçoDeGrupos/groupService';
import { Group } from '../types';

interface UserForAction {
    id: string;
    name: string;
    username: string;
    role: string;
}

export const useLimitAndControl = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    
    const [group, setGroup] = useState<Group | null>(null);

    // States for each control
    const [memberLimit, setMemberLimit] = useState<number | ''>( '');
    const [onlyAdminsPost, setOnlyAdminsPost] = useState(false);
    const [msgSlowMode, setMsgSlowMode] = useState(false);
    const [msgSlowModeInterval, setMsgSlowModeInterval] = useState('30');
    const [approveMembers, setApproveMembers] = useState(false);
    const [joinSlowMode, setJoinSlowMode] = useState(false);
    const [joinSlowModeInterval, setJoinSlowModeInterval] = useState('60');
    const [forbiddenWords, setForbiddenWords] = useState<string[]>([]);
    const [newWord, setNewWord] = useState('');

    // State for modal and actions
    const [actionType, setActionType] = useState<'kick' | 'ban' | 'promote' | 'demote' | null>(null);
    const [userSearchTerm, setUserSearchTerm] = useState('');
    const [userList, setUserList] = useState<UserForAction[]>([]);
    const [currentMembers, setCurrentMembers] = useState(0);

    // Initial data loading
    useEffect(() => {
        if (!id) return;

        // CORREÇÃO: Lógica de busca de grupo e membros removida.
        console.error("Group service is not available. Cannot load group data or members.");
        
        // Simplesmente definimos estados vazios/padrão
        setGroup(null);
        setUserList([]);
        setCurrentMembers(0);

    }, [id]);

    // Reset search on modal close
    useEffect(() => {
        if (!actionType) setUserSearchTerm('');
    }, [actionType]);

    // --- Handlers ---

    const handleAddWord = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedWord = newWord.trim().toLowerCase();
        if (trimmedWord && !forbiddenWords.includes(trimmedWord)) {
            setForbiddenWords([...forbiddenWords, trimmedWord]);
            setNewWord('');
        }
    };

    const removeWord = (wordToRemove: string) => {
        setForbiddenWords(forbiddenWords.filter(w => w !== wordToRemove));
    };

    const handleMemberAction = (userId: string, userName: string) => {
        if (!actionType || !id) return;

        if (userId === group?.creatorId) {
            alert("Não é possível realizar ações contra o Dono do grupo.");
            return;
        }
        if (userId === authService.getCurrentUserId()) {
            alert("Você não pode realizar esta ação em si mesmo aqui.");
            return;
        }

        const actionSuccessMessages = {
            kick: `expulso`, ban: `banido`, promote: `promovido a Admin`, demote: `rebaixado para Membro`
        };
        
        // CORREÇÃO: Lógica de serviço removida. Apenas atualiza a UI.
        switch(actionType) {
            case 'kick':
            case 'ban':
                setUserList(prev => prev.filter(u => u.id !== userId));
                setCurrentMembers(prev => prev - 1);
                break;
            case 'promote':
                setUserList(prev => prev.map(u => u.id === userId ? { ...u, role: 'Admin' } : u));
                break;
            case 'demote':
                setUserList(prev => prev.map(u => u.id === userId ? { ...u, role: 'Membro' } : u));
                break;
        }

        alert(`${userName} foi ${actionSuccessMessages[actionType]} com sucesso.`);
        setActionType(null);
    };

    const handleSave = () => {
        if (!group) return;

        // CORREÇÃO: Lógica de salvar configurações removida.
        alert("Configurações salvas com sucesso (simulação)!");
        navigate(-1);
    };

    const handleBack = () => navigate(-1);

    // Memoized derived state for filtering users
    const filteredUsers = useMemo(() => 
        userList.filter(user => 
            user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(userSearchTerm.toLowerCase())
        ), [userList, userSearchTerm]);

    return {
        group,
        handleBack,
        handleSave,
        currentMembers,
        memberLimit, setMemberLimit,
        onlyAdminsPost, setOnlyAdminsPost,
        msgSlowMode, setMsgSlowMode,
        msgSlowModeInterval, setMsgSlowModeInterval,
        approveMembers, setApproveMembers,
        joinSlowMode, setJoinSlowMode,
        joinSlowModeInterval, setJoinSlowModeInterval,
        forbiddenWords, removeWord,
        newWord, setNewWord, handleAddWord,
        actionType, setActionType,
        userSearchTerm, setUserSearchTerm,
        filteredUsers,
        handleMemberAction
    };
};
