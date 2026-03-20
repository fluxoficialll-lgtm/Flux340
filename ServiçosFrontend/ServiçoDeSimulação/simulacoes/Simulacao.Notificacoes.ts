
import { Notificacao } from "../../types/Saida/Types.Estrutura.Notificacao";

// --- SIMULAÇÃO DO SERVIÇO DE NOTIFICAÇÕES ---

// Definição de tipos de notificação para clareza
export type NotificationType = 'new_follower' | 'like' | 'comment' | 'mention' | 'group_invite' | 'system_update' | 'venda_realizada' | 'venda_pendente' | 'cobranca' | 'compartilhamento' | 'comment_reply' | 'friend_request' | 'login' | 'compra_sucesso';

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
        id: 'notif-14',
        type: 'compra_sucesso',
        actor: { name: 'Loja da Comunidade', avatar: 'https://i.pravatar.cc/150?u=loja_comunidade', handle: 'loja_comunidade' },
        entity: { type: 'post', text: 'Acesso VIP ao Grupo' },
        createdAt: new Date(Date.now() - 1000 * 15).toISOString(), // 15 segundos atrás
        read: false,
    },
    {
        id: 'notif-13',
        type: 'login',
        actor: { name: 'Sistema', avatar: 'https://i.pravatar.cc/150?u=sistema', handle: 'sistema' },
        createdAt: new Date(Date.now() - 1000 * 30).toISOString(), // 30 segundos atrás
        read: false,
    },
    {
        id: 'notif-12',
        type: 'friend_request',
        actor: { name: 'Fernanda Costa', avatar: 'https://i.pravatar.cc/150?u=fernanda', handle: 'fer_costa' },
        createdAt: new Date(Date.now() - 1000 * 60 * 1).toISOString(), // 1 minuto atrás
        read: false,
    },
    {
        id: 'notif-5',
        type: 'group_invite',
        actor: { name: 'Equipe Flux', avatar: 'https://i.pravatar.cc/150?u=flux_team', handle: 'flux' },
        entity: { id: 'group-abc', type: 'group', text: 'Grupo de Beta Testers' },
        createdAt: new Date(Date.now() - 1000 * 60 * 1.5).toISOString(), // 1.5 minutos atrás
        read: false, // Alterado para false para testar o card
    },
    {
        id: 'notif-1',
        type: 'new_follower',
        actor: { name: 'Carlos', avatar: 'https://i.pravatar.cc/150?u=carlos', handle: 'carlos_dev' },
        createdAt: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
        read: false,
    },
];

// --- LÓGICA DE TRANSFORMAÇÃO --- (Movida do serviço para cá)
const transformarMockParaNotificacao = (mock: MockNotification): Notificacao => ({
    id: mock.id,
    tipo: mock.type === 'new_follower' ? 'follow' : mock.type as any,
    nomeUsuario: mock.actor.handle,
    nomeExibicao: mock.actor.name,
    urlAvatar: mock.actor.avatar,
    timestamp: mock.createdAt,
    dataCriacao: mock.createdAt,
    conteudoRelacionado: mock.entity?.text,
    seguindoDeVolta: false, 
    lida: false, 
});

// --- FUNÇÃO DE BUSCA SIMULADA --- (Nova função exportada)
export const simularBuscaDeNotificacoes = async (): Promise<Notificacao[]> => {
    console.log("[SIMULAÇÃO] ✅ Iniciando busca e transformação de notificações simuladas.");
    try {
        const response = await fetch('/api/notificacoes');
        if (!response.ok) {
            throw new Error(`Falha na requisição da API simulada: ${response.statusText}`);
        }
        const mockData: MockNotification[] = await response.json();
        return mockData.map(transformarMockParaNotificacao);
    } catch (error) {
        console.error("[SIMULAÇÃO] Erro ao buscar ou transformar notificações:", error);
        return [];
    }
};


// --- HANDLER PARA A API (msw) ---
const handleGetNotifications = async (url: URL, config?: RequestInit): Promise<Response> => {
    await new Promise(res => setTimeout(res, 400)); // Simula atraso de rede

    return new Response(JSON.stringify(mockNotifications), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};


// --- EXPORTAÇÃO DOS HANDLERS (para msw) ---
export const notificationsHandlers = {
    '/api/notificacoes': handleGetNotifications,
};
