
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { notificationService } from '../ServiçosFrontend/ServiçoDeNotificação/notificationService.js';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { Notification as NotificationItem, Group, PriceInfo } from '../tipos';
import { MockNotification } from '../ServiçosFrontend/ServiçoDeSimulação/simulacoes/Simulacao.Notificacoes';

export const HookNotificacoes = () => {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [displayPriceInfo, setDisplayPriceInfo] = useState<PriceInfo | null>(null);
    const navigate = useNavigate();

    const fetchNotifications = useCallback(async () => {
        setIsLoading(true);
        try {
            const isSimulating = localStorage.getItem('isSimulating') === 'true';

            if (isSimulating) {
                console.log("[SIMULAÇÃO] useNotifications: Buscando notificações do endpoint de simulação /api/notificacoes");
                const response = await fetch('/api/notificacoes');
                const mockData: MockNotification[] = await response.json();

                const formattedNotifications = mockData.map((notif): NotificationItem => {
                    // Mantém a estrutura original de 'actor' e 'entity' que os novos componentes esperam
                    const baseNotification = {
                        ...notif,
                        type: notif.type === 'new_follower' ? 'follow' : notif.type as any,
                    };

                    // Adiciona/transforma propriedades para compatibilidade com componentes existentes e a UI
                    const compatibleNotification: NotificationItem = {
                        ...baseNotification,
                        username: notif.actor.handle,
                        displayName: notif.actor.name,
                        avatarUrl: notif.actor.avatar,
                        timestamp: notif.createdAt, // Usa 'createdAt' dos dados simulados e atribui a 'timestamp'
                        relatedContent: notif.entity?.text,
                        isFollowing: false, // Valor padrão para simulação
                    };

                    return compatibleNotification;
                });

                setNotifications(formattedNotifications);

            } else {
                 const fetchedNotifications = await notificationService.getNotifications();
                 const notificationsWithDisplayNames = await Promise.all(
                     fetchedNotifications.map(async (notif) => {
                         const user = await authService.fetchUserByHandle(notif.username);
                         return { ...notif, displayName: user?.profile?.nickname || user?.profile?.name || notif.username };
                     })
                 );
                 setNotifications(notificationsWithDisplayNames);
            }
        } catch (error) {
            console.error("Erro ao buscar notificações:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadInitialData = async () => {
            const token = authService.getToken();
            if (!token) { 
                navigate('/');
                return; 
            }
            await fetchNotifications();
        };
        loadInitialData();
    }, [fetchNotifications, navigate]);

    const handleFollowToggle = useCallback(async (id: number, username: string) => {
        // ... (resto do código)
    }, []);

    const handlePendingAction = useCallback(async (action: 'accept' | 'reject', notification: any) => {
        // ... (resto do código)
    }, []);

    const handleIgnoreExpiring = useCallback((groupId: string) => {
        // ... (resto do código)
    }, []);

    const handlePayClick = useCallback(async (group: Group) => {
        // ... (resto do código)
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
        isLoading,
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
