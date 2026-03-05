
import React, { lazy } from 'react';
import { ProtectedRoute } from '../Componentes/ComponentesDeAuth/ProtectedRoute';

const Groups = lazy(() => import('../pages/Groups').then(m => ({ default: m.Groups })));
const GroupChat = lazy(() => import('../pages/GroupChat').then(m => ({ default: m.GroupChat })));
const GroupLanding = lazy(() => import('../pages/GroupLanding').then(m => ({ default: m.GroupLanding })));
const CreateGroup = lazy(() => import('../pages/CreateGroup').then(m => ({ default: m.CreateGroup })));
const CreateVipGroup = lazy(() => import('../pages/CreateVipGroup').then(m => ({ default: m.CreateVipGroup })));
const CreatePublicGroup = lazy(() => import('../pages/CreatePublicGroup').then(m => ({ default: m.CreatePublicGroup })));
const CreatePrivateGroup = lazy(() => import('../pages/CreatePrivateGroup').then(m => ({ default: m.CreatePrivateGroup })));
const EditGroup = lazy(() => import('../pages/EditGroup').then(m => ({ default: m.EditGroup })));
const VipGroupSales = lazy(() => import('../pages/VipGroupSales').then(m => ({ default: m.VipGroupSales })));
const GroupSettings = lazy(() => import('../pages/GroupSettings').then(m => ({ default: m.GroupSettings })));
const SuccessBridge = lazy(() => import('../pages/SuccessBridge').then(m => ({ default: m.SuccessBridge })));
const PGGrupoConfiguracoesInformacoes = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Informacoes').then(m => ({ default: m.PGGrupoConfiguracoesInformacoes })));
const PGGrupoConfiguracoesAcesso = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Acesso').then(m => ({ default: m.PGGrupoConfiguracoesAcesso })));
const PGGrupoConfiguracoesModeracao = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Moderacao').then(m => ({ default: m.PGGrupoConfiguracoesModeracao })));
const PGGrupoConfiguracoesMembros = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Membros').then(m => ({ default: m.PGGrupoConfiguracoesMembros })));
const PGGrupoConfiguracoesVip = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Vip').then(m => ({ default: m.PGGrupoConfiguracoesVip })));
const PGGrupoConfiguracoesEstatisticas = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Estatisticas').then(m => ({ default: m.PGGrupoConfiguracoesEstatisticas })));
const PGGrupoConfiguracoesAuditoria = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Auditoria').then(m => ({ default: m.PGGrupoConfiguracoesAuditoria })));
const PGGrupoConfiguracoesAgendamento = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Agendamento').then(m => ({ default: m.PGGrupoConfiguracoesAgendamento })));
const PGGrupoConfiguracoesPlataformaVendas = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.PlataformaVendas').then(m => ({ default: m.PGGrupoConfiguracoesPlataformaVendas })));
const PGGrupoConfiguracoesCargos = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Cargos').then(m => ({ default: m.PGGrupoConfiguracoesCargos })));
const PGGrupoConfiguracoesCheckout = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Checkout').then(m => ({ default: m.PGGrupoConfiguracoesCheckout })));
const GroupSalesPlatformView = lazy(() => import('../pages/groups/GroupSalesPlatformView').then(m => ({ default: m.GroupSalesPlatformView })));
const SalesFolderContentPage = lazy(() => import('../pages/groups/SalesFolderContentPage').then(m => ({ default: m.SalesFolderContentPage })));
const GroupLimits = lazy(() => import('../pages/LimitAndControl').then(m => ({ default: m.GroupLimits })));
const ManageGroupLinks = lazy(() => import('../pages/ManageGroupLinks').then(m => ({ default: m.ManageGroupLinks })));
const GroupRevenue = lazy(() => import('../pages/GroupRevenue').then(m => ({ default: m.GroupRevenue })));
const VipSalesHistory = lazy(() => import('../pages/VipSalesHistory').then(m => ({ default: m.VipSalesHistory })));

export const groupRoutes = [
    { path: '/groups', element: <ProtectedRoute><Groups /></ProtectedRoute> },
    { path: '/group-chat/:id', element: <ProtectedRoute><GroupChat /></ProtectedRoute> },
    { path: '/group-chat/:id/:channelId', element: <ProtectedRoute><GroupChat /></ProtectedRoute> },
    { path: '/group-landing/:id', element: <GroupLanding /> },
    { path: '/vip-group-sales/:id', element: <VipGroupSales /> },
    { path: '/create-group', element: <ProtectedRoute><CreateGroup /></ProtectedRoute> },
    { path: '/create-group/vip', element: <ProtectedRoute><CreateVipGroup /></ProtectedRoute> },
    { path: '/create-group/public', element: <ProtectedRoute><CreatePublicGroup /></ProtectedRoute> },
    { path: '/create-group/private', element: <ProtectedRoute><CreatePrivateGroup /></ProtectedRoute> },
    { path: '/edit-group/:id', element: <ProtectedRoute><EditGroup /></ProtectedRoute> },
    { path: '/payment-success-bridge/:id', element: <ProtectedRoute><SuccessBridge /></ProtectedRoute> },
    { path: '/group-settings/:id', element: <ProtectedRoute><GroupSettings /></ProtectedRoute> },
    { path: '/group-settings/:id/info', element: <ProtectedRoute><PGGrupoConfiguracoesInformacoes /></ProtectedRoute> },
    { path: '/group-settings/:id/access', element: <ProtectedRoute><PGGrupoConfiguracoesAcesso /></ProtectedRoute> },
    { path: '/group-settings/:id/moderation', element: <ProtectedRoute><PGGrupoConfiguracoesModeracao /></ProtectedRoute> },
    { path: '/group-settings/:id/members', element: <ProtectedRoute><PGGrupoConfiguracoesMembros /></ProtectedRoute> },
    { path: '/group-settings/:id/roles', element: <ProtectedRoute><PGGrupoConfiguracoesCargos /></ProtectedRoute> },
    { path: '/group-settings/:id/vip', element: <ProtectedRoute><PGGrupoConfiguracoesVip /></ProtectedRoute> },
    { path: '/group-settings/:id/stats', element: <ProtectedRoute><PGGrupoConfiguracoesEstatisticas /></ProtectedRoute> },
    { path: '/group-settings/:id/audit', element: <ProtectedRoute><PGGrupoConfiguracoesAuditoria /></ProtectedRoute> },
    { path: '/group-settings/:id/schedule', element: <ProtectedRoute><PGGrupoConfiguracoesAgendamento /></ProtectedRoute> },
    { path: '/group-settings/:id/sales-platform', element: <ProtectedRoute><PGGrupoConfiguracoesPlataformaVendas /></ProtectedRoute> },
    { path: '/group-settings/:id/checkout-config', element: <ProtectedRoute><PGGrupoConfiguracoesCheckout /></ProtectedRoute> },
    { path: '/group-platform/:id', element: <ProtectedRoute><GroupSalesPlatformView /></ProtectedRoute> },
    { path: '/group-folder/:groupId/:folderId', element: <ProtectedRoute><SalesFolderContentPage /></ProtectedRoute> },
    { path: '/group-limits/:id', element: <ProtectedRoute><GroupLimits /></ProtectedRoute> },
    { path: '/group-links/:id', element: <ProtectedRoute><ManageGroupLinks /></ProtectedRoute> },
    { path: '/group-revenue/:id', element: <ProtectedRoute><GroupRevenue /></ProtectedRoute> },
    { path: '/vip-sales-history/:id', element: <ProtectedRoute><VipSalesHistory /></ProtectedRoute> }
  ];
