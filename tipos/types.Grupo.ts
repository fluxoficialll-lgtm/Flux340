export interface GroupRolePermissions {
    // Administração Geral
    isAdmin: boolean; // (Perigoso) Dá todas as permissões abaixo
    canEditGroupInfo: boolean; // Editar nome, descrição, avatar, etc.
    canManageRoles: boolean; // Criar, editar e deletar cargos com prioridade menor
    canViewAuditLogs: boolean; // Ver o histórico de ações administrativas
    canViewRevenue: boolean; // (VIP) Acessar o painel financeiro do grupo

    // Moderação de Chat
    canSendMessages: boolean; // Enviar mensagens nos canais de texto
    canDeleteMessages: boolean; // Apagar mensagens de outros membros
    canPinMessages: boolean; // Fixar mensagens no topo de um canal
    canBypassSlowMode: boolean; // Enviar mensagens sem ser afetado pelo modo lento

    // Controle de Membros
    canKickMembers: boolean; // Expulsar membros do grupo
    canBanMembers: boolean; // Banir membros permanentemente
    canApproveMembers: boolean; // Aprovar solicitações de entrada
    canInviteMembers: boolean; // Criar e gerenciar links de convite

    // Catálogo e Escala (Conteúdo)
    canManageFolders: boolean; // Criar, renomear e apagar pastas na plataforma de vendas
    canManageFiles: boolean; // Adicionar, remover e organizar arquivos nas pastas
    canPostScheduled: boolean; // Agendar o envio de mensagens ou mídias
    canManageAds: boolean; // Criar e gerenciar anúncios para o grupo

    // Novas Permissões Detalhadas
    canToggleSlowMode: boolean; // Ativar ou desativar o modo lento em um canal
    canSetSlowModeInterval: boolean; // Definir o intervalo de tempo entre as mensagens no modo lento
    canCreateSubgroups: boolean; // Criar subgrupos ou canais dentro do grupo principal
    canManagePolls: boolean; // Criar e gerenciar enquetes nos canais
    canManageNotifications: boolean; // Enviar notificações para todos os membros (@everyone)
    canMentionEveryone: boolean; // Permite que o usuário use as menções @everyone e @here
}

export interface GroupRole {
    id: string;
    name: string;
    color: string;
    priority: number;
    permissions: GroupRolePermissions;
}
