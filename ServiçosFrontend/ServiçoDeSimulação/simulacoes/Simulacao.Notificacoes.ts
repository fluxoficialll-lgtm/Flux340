
// --- SIMULAÇÃO DO SERVIÇO DE NOTIFICAÇÕES ---

// Definição de tipos de notificação para clareza
export type NotificationType = 'new_follower' | 'like' | 'comment' | 'mention' | 'group_invite' | 'system_update' | 'venda_realizada' | 'venda_pendente' | 'cobranca' | 'compartilhamento' | 'comment_reply' | 'friend_request';

export interface MockNotification {
    id: string;
    type: NotificationType;
    actor: { // Quem realizou a ação
        name: string;
        avatar: string;
        handle: string;
    };
    entity?: { // Onde a ação aconteceu (post, comentário, etc.)
        id?: string;
        type: 'post' | 'comment' | 'group';
        text?: string; 
    };
    relatedPostId?: string;
    createdAt: string;
    read: boolean;
    relatedGroupId?: string;
}

// --- DADOS SIMULADOS ---
const mockNotifications: MockNotification[] = [
    {
        id: 'notif-12',
        type: 'friend_request',
        actor: { name: 'Fernanda Costa', avatar: 'https://i.pravatar.cc/150?u=fernanda', handle: 'fer_costa' },
        createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 minuto atrás
        read: false,
    },
    {
        id: 'notif-1',
        type: 'new_follower',
        actor: { name: 'Carlos', avatar: 'https://i.pravatar.cc/150?u=carlos', handle: 'carlos_dev' },
        createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        read: false,
    },
    {
        id: 'notif-2',
        type: 'like',
        actor: { name: 'Beatriz', avatar: 'https://i.pravatar.cc/150?u=beatriz', handle: 'bia_design' },
        entity: { id: 'post-123', type: 'post', text: 'Adorei o novo recurso de Grupos VIP!...' },
        createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
        read: false,
    },
    {
        id: 'notif-3',
        type: 'comment',
        actor: { name: 'Ana', avatar: 'https://i.pravatar.cc/150?u=ana', handle: 'ana_g' },
        entity: { id: 'comment-456', type: 'comment', text: 'Live hoje à noite, pessoal! Vamos jogar...' },
        relatedPostId: 'post-123',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
        read: true,
    },
    {
        id: 'notif-4',
        type: 'mention',
        actor: { name: 'Daniel', avatar: 'https://i.pravatar.cc/150?u=daniel', handle: 'dani_photo' },
        entity: { id: 'comment-789', type: 'comment', text: 'Concordo, @user_simulado, ótima ideia!' },
        relatedPostId: 'post-456',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        read: false,
    },
    {
        id: 'notif-5',
        type: 'group_invite',
        actor: { name: 'Equipe Flux', avatar: 'https://i.pravatar.cc/150?u=flux_team', handle: 'flux' },
        entity: { id: 'group-abc', type: 'group', text: 'Grupo de Beta Testers' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        read: true,
    },
    {
        id: 'notif-11',
        type: 'comment_reply',
        actor: { name: 'Roberto', avatar: 'https://i.pravatar.cc/150?u=roberto', handle: 'roberto_code' },
        entity: { id: 'comment-abc', type: 'comment', text: 'Com certeza! Estarei lá.' },
        relatedPostId: 'post-123',
        createdAt: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
        read: false,
    },
    {
        id: 'notif-7',
        type: 'venda_realizada',
        actor: { name: 'Comprador Anônimo', avatar: 'https://i.pravatar.cc/150?u=comprador', handle: 'comprador_xyz' },
        entity: { type: 'post', text: 'Curso de React Avançado' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        read: false,
    },
    {
        id: 'notif-8',
        type: 'venda_pendente',
        actor: { name: 'Mariana', avatar: 'https://i.pravatar.cc/150?u=mariana', handle: 'mariana_art' },
        entity: { type: 'post', text: 'eBook de Design Gráfico' },
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        read: false,
    },
    {
        id: 'notif-9',
        type: 'cobranca',
        actor: { name: 'Loja de Exemplo', avatar: 'https://i.pravatar.cc/150?u=loja', handle: 'loja_exemplo' },
        entity: { type: 'post', text: 'Assinatura VIP' },
        relatedGroupId: 'group-vip-123',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        read: false,
    },
    {
        id: 'notif-10',
        type: 'compartilhamento',
        actor: { name: 'Juliana', avatar: 'https://i.pravatar.cc/150?u=juliana', handle: 'ju_sales' },
        entity: { id: 'post-789', type: 'post', text: 'Confira esta ferramenta de design incrível!' },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
        read: false,
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
