
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { authService } from '../ServiçosFrontend/ServiçoDeAutenticação/authService';
import { servicoDeSimulacao } from '../ServiçosFrontend/ServiçoDeSimulação';
import { Group, User, GroupLink, VipMediaItem } from '../types';
import { useModal } from '../Componentes/ComponenteDeInterfaceDeUsuario/ModalSystem';

export const useGroupSettings = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { showConfirm, showAlert } = useModal();
    
    const [group, setGroup] = useState<Group | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // ... (estados do formulário)
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [coverImage, setCoverImage] = useState<string | undefined>(undefined);
    const [approveMembers, setApproveMembers] = useState(false);
    const [pendingRequests, setPendingRequests] = useState<User[]>([]);
    const [links, setLinks] = useState<GroupLink[]>([]);
    const [onlyAdminsPost, setOnlyAdminsPost] = useState(false);
    const [msgSlowMode, setMsgSlowMode] = useState(false);
    const [msgSlowModeInterval, setMsgSlowModeInterval] = useState('30');
    const [joinSlowMode, setJoinSlowMode] = useState(false);
    const [joinSlowModeInterval, setJoinSlowModeInterval] = useState('60');
    const [memberLimit, setMemberLimit] = useState<number | ''>('');
    const [forbiddenWords, setForbiddenWords] = useState<string[]>([]);
    const [members, setMembers] = useState<{ id: string, name: string, role: string, isMe: boolean, avatar?: string }[]>([]);
    const [vipPrice, setVipPrice] = useState('');
    const [vipCurrency, setVipCurrency] = useState<'BRL' | 'USD'>('BRL');
    const [vipDoorText, setVipDoorText] = useState('');
    const [vipButtonText, setVipButtonText] = useState('');
    const [vipMediaItems, setVipMediaItems] = useState<VipMediaItem[]>([]);
    const [pixelId, setPixelId] = useState('');
    const [pixelToken, setPixelToken] = useState('');
    const [isSalesPlatformEnabled, setIsSalesPlatformEnabled] = useState(false);
    const [salesFoldersCount, setSalesFoldersCount] = useState(0);

    useEffect(() => {
        console.error("groupService not available. Group settings will not be loaded.");
        // CORREÇÃO: Utiliza a função correta para obter o ID do usuário.
        const currentUserId = authService.getCurrentUser()?.id;
        const email = authService.getCurrentUserEmail();
        setCurrentUserEmail(email);
        setLoading(false);
    }, [id]);

    const handleSave = async () => {
        console.error("groupService not available. Cannot save group settings.");
        await showAlert('Funcionalidade Desativada', 'A edição de grupos não está disponível no momento.');
    };

    const handleLeaveDelete = async (type: 'leave' | 'delete') => {
        console.error("groupService not available. Cannot leave or delete group.");
        const action = type === 'leave' ? 'Sair do' : 'Excluir o';
        await showAlert('Funcionalidade Desativada', `${action} grupo não está disponível no momento.`);
    };

    return {
        id, group, loading, isOwner, isAdmin, handleSave, handleLeaveDelete,
        form: {
            groupName, setGroupName, description, setDescription, coverImage, setCoverImage,
            approveMembers, setApproveMembers, pendingRequests, setPendingRequests,
            links, setLinks, onlyAdminsPost, setOnlyAdminsPost,
            msgSlowMode, setMsgSlowMode, msgSlowModeInterval, setMsgSlowModeInterval,
            joinSlowMode, setJoinSlowMode, joinSlowModeInterval, setJoinSlowModeInterval,
            memberLimit, setMemberLimit, forbiddenWords, setForbiddenWords,
            members, setMembers, vipPrice, setVipPrice, vipCurrency, setVipCurrency,
            vipDoorText, setVipDoorText, vipButtonText, setVipButtonText,
            vipMediaItems, setVipMediaItems, pixelId, setPixelId, pixelToken, setPixelToken,
            isSalesPlatformEnabled, setIsSalesPlatformEnabled,
            salesFoldersCount, setSalesFoldersCount
        }
    };
};
