
// --- SIMULAÇÃO DO SERVIÇO DE CONFIGURAÇÃO DE CONVITES DE GRUPO ---

// Por enquanto, não temos um tipo específico para InviteLink em `tipos`, usaremos `any`.
// import { InviteLink } from "../../../tipos/types.Grupo"; 

// --- DADOS SIMULADOS ---
let mockLinks: any[] = [
    { 
        id: 'link-1', 
        name: 'Link Permanente Principal', 
        url: 'https://flux.com/invite/a1b2c3d4e5', 
        type: 'permanent', 
        uses: 150, 
        isActive: true 
    },
    { 
        id: 'link-2', 
        name: 'Campanha de Marketing #1', 
        url: 'https://flux.com/invite/f6g7h8i9j0', 
        type: 'temporary', 
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Expira em 7 dias
        uses: 25, 
        isActive: true 
    },
    { 
        id: 'link-3', 
        name: 'Link Expirado',
        url: 'https://flux.com/invite/k1l2m3n4o5', 
        type: 'temporary', 
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // Expirou ontem
        uses: 5, 
        isActive: false 
    },
];

// --- HANDLERS PARA AS ROTAS ---

const handleGetInviteLinks = async (url: URL): Promise<Response> => {
    console.log(`[SIMULAÇÃO] ✅ Buscando links de convite. URL: ${url.pathname}`);
    await new Promise(res => setTimeout(res, 450));
    return new Response(JSON.stringify(mockLinks.filter(link => link.isActive)), { // Retorna apenas links ativos
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

const handleCreateInviteLink = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log(`[SIMULAÇÃO] ✅ Criando novo link de convite. URL: ${url.pathname}`);
    const body = await new Response(config?.body).json();
    
    const newLink = {
        id: `link_${Date.now()}`,
        url: `https://flux.com/invite/${Math.random().toString(36).substring(2, 12)}`,
        uses: 0,
        isActive: true,
        ...body,
    };

    mockLinks.push(newLink);
    await new Promise(res => setTimeout(res, 550));
    return new Response(JSON.stringify(newLink), {
        status: 201, // Created
        headers: { 'Content-Type': 'application/json' },
    });
};

const handleRevokeInviteLink = async (url: URL): Promise<Response> => {
    const linkId = url.pathname.split('/').pop();
    console.log(`[SIMULAÇÃO] ✅ Revogando (desativando) link ${linkId}.`);
    
    let linkFound = false;
    mockLinks = mockLinks.map(link => {
        if (link.id === linkId) {
            linkFound = true;
            return { ...link, isActive: false };
        }
        return link;
    });

    await new Promise(res => setTimeout(res, 650));

    if (linkFound) {
        return new Response(JSON.stringify({ success: true, message: `Link ${linkId} revogado.` }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    return new Response(JSON.stringify({ message: "Link não encontrado" }), {
        status: 404, 
        headers: { 'Content-Type': 'application/json' }
    });
};

export const groupInvitesConfigHandlers = {
    '/api/groups/:groupId/invites': {
        GET: handleGetInviteLinks,
        POST: handleCreateInviteLink,
    },
    '/api/groups/:groupId/invites/:linkId': {
        DELETE: handleRevokeInviteLink, // Usando DELETE para revogar/desativar
    },
};
