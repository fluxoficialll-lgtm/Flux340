
// --- SIMULAÇÃO DO SERVIÇO DE NOTIFICAÇÕES ---

// Definição de tipos de notificação para clareza
export type NotificationType = 'new_follower' | 'like' | 'comment' | 'mention' | 'group_invite' | 'system_update';

export interface MockNotification {
    id: string;
    type: NotificationType;
    actor: { // Quem realizou a ação
        name: string;
        avatar: string;
        handle: string;
    };
    entity?: { // Onde a ação aconteceu (post, comentário, etc.)
        type: 'post' | 'comment' | 'group';
        text?: string; 
    };
    timestamp: string;
    read: boolean;
}

// --- DADOS SIMULADOS ---
const mockNotifications: MockNotification[] = [
    {
        id: 'notif-1',
        type: 'new_follower',
        actor: { name: 'Carlos', avatar: 'https://i.pravatar.cc/150?u=carlos', handle: 'carlos_dev' },
        timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        read: false,
    },
    {
        id: 'notif-2',
        type: 'like',
        actor: { name: 'Beatriz', avatar: 'https://i.pravatar.cc/150?u=beatriz', handle: 'bia_design' },
        entity: { type: 'post', text: 'Adorei o novo recurso de Grupos VIP!...' },
        timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        read: false,
    },
    {
        id: 'notif-3',
        type: 'comment',
        actor: { name: 'Ana', avatar: 'https://i.pravatar.cc/150?u=ana', handle: 'ana_g' },
        entity: { type: 'post', text: 'Live hoje à noite, pessoal! Vamos jogar...' },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        read: true,
    },
    {
        id: 'notif-4',
        type: 'mention',
        actor: { name: 'Daniel', avatar: 'https://i.pravatar.cc/150?u=daniel', handle: 'dani_photo' },
        entity: { type: 'comment', text: 'Concordo, @user_simulado, ótima ideia!' },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        read: false,
    },
    {
        id: 'notif-5',
        type: 'group_invite',
        actor: { name: 'Equipe Flux', avatar: 'https://i.pravatar.cc/150?u=flux_team', handle: 'flux' },
        entity: { type: 'group', text: 'Grupo de Beta Testers' },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: true,
    },
    {
        id: 'notif-6',
        type: 'system_update',
        actor: { name: 'Sistema', avatar: 'https://i.pravatar.cc/150?u=system', handle: 'system' },
        entity: { type: 'post', text: 'Atualizamos nossos Termos de Serviço.' },
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        read: true,
    }
];


// --- HANDLER PARA A API ---
const handleGetNotifications = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log('[SIMULAÇÃO] ✅ Buscando notificações.');
    await new Promise(res => setTimeout(res, 400)); // Simula atraso de rede

    return new Response(JSON.stringify(mockNotifications), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};


// --- EXPORTAÇÃO DOS HANDLERS ---
export const notificationsHandlers = {
    '/api/notificacoes': handleGetNotifications,
};
