
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { Notification as NotificationItem, Group, PriceInfo } from '../tipos';
import { MockNotification } from '../ServiçosFrontend/ServiçoDeSimulação/simulacoes/Simulacao.Notificacoes';

export const HookNotificacoes = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [pageLoading, setPageLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [displayPriceInfo, setDisplayPriceInfo] = useState<PriceInfo | null>(null);
    const navigate = useNavigate();

    const [authState, setAuthState] = useState(authService.getState());
    const { isAuthenticated, isLoading: isAuthLoading } = authState;

    useEffect(() => {
        const unsubscribe = authService.subscribe(setAuthState);
        return () => unsubscribe();
    }, []);

    const fetchNotifications = useCallback(async () => {
        setPageLoading(true);
        try {
            // Simulação ou lógica de busca real
            const isSimulating = localStorage.getItem('isSimulating') === 'true';
            if (isSimulating) {
                const response = await fetch('/api/notificacoes');
                const mockData: MockNotification[] = await response.json();
                const formattedNotifications = mockData.map((notif): NotificationItem => ({
                    ...notif,
                    type: notif.type === 'new_follower' ? 'follow' : notif.type as any,
                    username: notif.actor.handle,
                    displayName: notif.actor.name,
                    avatarUrl: notif.actor.avatar,
                    timestamp: notif.createdAt,
                    relatedContent: notif.entity?.text,
                    isFollowing: false,
                }));
                setNotifications(formattedNotifications);
            } else {
                console.log("Serviço de notificação não encontrado, carregando array vazio.");
                setNotifications([]);
            }
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        } finally {
            setPageLoading(false);
        }
    }, []);

    useEffect(() => {
        // Efeito #1: Lida apenas com o redirecionamento.
        // Ele espera o fim do carregamento da autenticação.
        if (!isAuthLoading) {
            // Se, após o carregamento, o usuário NÃO estiver autenticado, redireciona.
            if (!isAuthenticated) {
                navigate('/');
            }
        }
    }, [isAuthLoading, isAuthenticated, navigate]);

    useEffect(() => {
        // Efeito #2: Lida apenas com a busca de dados.
        // Ele espera o fim do carregamento E a confirmação da autenticação.
        if (!isAuthLoading && isAuthenticated) {
            fetchNotifications();
        }
    }, [isAuthLoading, isAuthenticated, fetchNotifications]);


    const handleFollowToggle = useCallback(async (id: number, username: string) => {
        console.log('Ação de seguir/deixar de seguir não implementada.');
    }, []);

    const handlePendingAction = useCallback(async (action: 'accept' | 'reject', notification: any) => {
        console.log('Ação pendente não implementada.');
    }, []);

    const handleIgnoreExpiring = useCallback((groupId: string) => {
        console.log('Ação de ignorar expiração não implementada.');
    }, []);

    const handlePayClick = useCallback(async (group: Group) => {
        console.log('Ação de pagamento não implementada.');
    }, []);

    const filteredNotifications = useMemo(() => {
        return notifications.filter(notif => {
            if (filter === 'all') return true;
            if (filter === 'mentions') return notif.type === 'mention';
            if (filter === 'follow') return notif.type === 'follow';
            if (filter === 'likes') return notif.type === 'like';
            return false;
        });
    }, [notifications, filter]);

    return {
        notifications,
        isLoading: pageLoading,
        filter,
        setFilter,
        filteredNotifications,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedGroup,
        displayInfo: displayPriceInfo,
        handleFollowToggle,
        handlePendingAction,
        handleIgnoreExpiring,
        handlePayClick,
        navigate,
    };
};
