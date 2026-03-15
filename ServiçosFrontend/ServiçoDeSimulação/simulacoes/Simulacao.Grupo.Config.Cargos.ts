
// --- SIMULAÇÃO DO SERVIÇO DE CONFIGURAÇÃO DE CARGOS DE GRUPO ---

import { GroupRole } from "../../../tipos/types.Grupo";

// --- DADOS SIMULADOS ---
let mockRoles: GroupRole[] = [
    { 
        id: 'dev', 
        name: 'Desenvolvedor', 
        color: '#00c2ff', 
        priority: 100, 
        permissions: { isAdmin: true, canManageRoles: true } as any,
    },
    { 
        id: 'mod', 
        name: 'Moderador', 
        color: '#22c55e', 
        priority: 50, 
        permissions: { canKickMembers: true, canDeleteMessages: true } as any,
    },
    { 
        id: 'vip', 
        name: '💎 VIP Member', 
        color: '#be185d', 
        priority: 20, 
        permissions: { canBypassSlowMode: true } as any,
    },
];

// --- HANDLERS PARA AS ROTAS ---

const handleGetGroupRoles = async (url: URL): Promise<Response> => {
    console.log(`[SIMULAÇÃO] ✅ Buscando cargos para o grupo. URL: ${url.pathname}`);
    await new Promise(res => setTimeout(res, 400));
    return new Response(JSON.stringify(mockRoles), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
};

const handleCreateGroupRole = async (url: URL, config?: RequestInit): Promise<Response> => {
    console.log(`[SIMULAÇÃO] ✅ Criando novo cargo. URL: ${url.pathname}`);
    const body = await new Response(config?.body).json();
    const newRole: GroupRole = {
        id: `role_${Date.now()}`,
        priority: 1,
        permissions: {} as any, // Mock simplificado
        ...body,
    };
    mockRoles.push(newRole);
    await new Promise(res => setTimeout(res, 600));
    return new Response(JSON.stringify(newRole), {
        status: 201, // 201 Created
        headers: { 'Content-Type': 'application/json' },
    });
};

const handleUpdateGroupRole = async (url: URL, config?: RequestInit): Promise<Response> => {
    const roleId = url.pathname.split('/')[4];
    console.log(`[SIMULAÇÃO] ✅ Atualizando cargo ${roleId}.`);
    const body = await new Response(config?.body).json();
    let updatedRole: GroupRole | null = null;
    
    mockRoles = mockRoles.map(role => {
        if (role.id === roleId) {
            updatedRole = { ...role, ...body };
            return updatedRole;
        }
        return role;
    });

    await new Promise(res => setTimeout(res, 500));

    if (updatedRole) {
        return new Response(JSON.stringify(updatedRole), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ message: "Cargo não encontrado" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
};

const handleDeleteGroupRole = async (url: URL): Promise<Response> => {
    const roleId = url.pathname.split('/')[4];
    console.log(`[SIMULAÇÃO] ✅ Deletando cargo ${roleId}.`);
    
    const initialLength = mockRoles.length;
    mockRoles = mockRoles.filter(role => role.id !== roleId);

    await new Promise(res => setTimeout(res, 700));

    if (mockRoles.length < initialLength) {
        return new Response(null, { status: 204 }); // 204 No Content
    }
    return new Response(JSON.stringify({ message: "Cargo não encontrado" }), { status: 404, headers: { 'Content-Type': 'application/json' } });
};

const handleAssignRole = async (url: URL, config?: RequestInit): Promise<Response> => {
    // Extrair memberId da URL. Ex: /api/groups/abc/members/123/assign-role -> 123
    const parts = url.pathname.split('/');
    const memberId = parts[parts.length - 2]; 
    const body = await new Response(config?.body).json();
    const { roleId } = body;

    console.log(`[SIMULAÇÃO] ✅ Atribuindo cargo ${roleId} ao membro ${memberId}.`);
    
    // Neste escopo, não temos acesso direto ao mockMembers, 
    // mas para o propósito da simulação de API, retornar sucesso é suficiente.
    // A lógica de estado real será gerenciada no frontend.

    await new Promise(res => setTimeout(res, 300));
    return new Response(JSON.stringify({ success: true, memberId, roleId }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};


export const groupRolesConfigHandlers = {
    '/api/groups/:groupId/roles': {
        GET: handleGetGroupRoles,
        POST: handleCreateGroupRole,
    },
    '/api/groups/:groupId/roles/:roleId': {
        PUT: handleUpdateGroupRole,
        DELETE: handleDeleteGroupRole,
    },
    '/api/groups/:groupId/members/:memberId/assign-role': {
        POST: handleAssignRole,
    }
};
