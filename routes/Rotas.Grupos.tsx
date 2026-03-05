
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
const PGGrupoConfiguracoesAcessoEConvites = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.AcessoEConvites').then(m => ({ default: m.PGGrupoConfiguracoesAcessoEConvites })));
const PGGrupoConfiguracoesModeracao = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Moderacao').then(m => ({ default: m.PGGrupoConfiguracoesModeracao })));
const PGGrupoConfiguracoesAcoesAdministrativas = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.AcoesAdministrativas').then(m => ({ default: m.PGGrupoConfiguracoesAcoesAdministrativas })));
const PGGrupoConfiguracoesAuditoriaDeMensagens = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.AuditoriaDeMensagens').then(m => ({ default: m.PGGrupoConfiguracoesAuditoriaDeMensagens })));
const PGGrupoConfiguracoesAuditoriaDeDenuncias = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.AuditoriaDeDenuncias').then(m => ({ default: m.PGGrupoConfiguracoesAuditoriaDeDenuncias })));
const PGGrupoConfiguracoesAuditoriaDeEntradaESaida = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.AuditoriaDeEntradaESaida').then(m => ({ default: m.PGGrupoConfiguracoesAuditoriaDeEntradaESaida })));
const PGGrupoConfiguracoesAuditoriaDeAjustes = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.AuditoriaDeAjustes').then(m => ({ default: m.PGGrupoConfiguracoesAuditoriaDeAjustes })));
const PGGrupoConfiguracoesMembros = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Membros').then(m => ({ default: m.PGGrupoConfiguracoesMembros })));
const PGGrupoConfiguracoesVip = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Vip').then(m => ({ default: m.PGGrupoConfiguracoesVip })));
const PGGrupoConfiguracoesEstatisticas = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Estatisticas').then(m => ({ default: m.PGGrupoConfiguracoesEstatisticas })));
const PGGrupoConfiguracoesAuditoria = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Auditoria').then(m => ({ default: m.PGGrupoConfiguracoesAuditoria })));
const PGGrupoConfiguracoesMensagensAgendadas = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.MensagensAgendadas').then(m => ({ default: m.PGGrupoConfiguracoesMensagensAgendadas })));
const PGGrupoConfiguracoesPlataformaVendas = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.PlataformaVendas').then(m => ({ default: m.PGGrupoConfiguracoesPlataformaVendas })));
const PGGrupoConfiguracoesPlataformasADS = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.PlataformasADS').then(m => ({ default: m.PGGrupoConfiguracoesPlataformasADS })));
const PGGrupoConfiguracoesCargos = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Cargos').then(m => ({ default: m.PGGrupoConfiguracoesCargos })));
const PGGrupoConfiguracoesManutencaoCargos = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.ManutencaoCargos').then(m => ({ default: m.PGGrupoConfiguracoesManutencaoCargos })));
const PGGrupoConfiguracoesDiretrizes = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Diretrizes').then(m => ({ default: m.PGGrupoConfiguracoesDiretrizes })));
const PGGrupoConfiguracoesDistribuiçaoDeCargos = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.DistribuiçaoDeCargos').then(m => ({ default: m.PGGrupoConfiguracoesDistribuiçaoDeCargos })));
const PGGrupoConfiguracoesCheckout = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.Checkout').then(m => ({ default: m.PGGrupoConfiguracoesCheckout })));
const PGGrupoConfiguracoesNotificacoesGerais = lazy(() => import('../pages/groups/settings/PG.Grupo.Configuracoes.NotificacoesGerais').then(m => ({ default: m.PGGrupoConfiguracoesNotificacoesGerais })));
const PGPlataformaHospedagemArquivos = lazy(() => import('../pages/groups/PG.Plataforma.Hospedagem.Arquivos').then(m => ({ default: m.PGPlataformaHospedagemArquivos })));
const PGGrupoConteudoPastaVendas = lazy(() => import('../pages/groups/PG.Grupo.ConteudoPastaVendas').then(m => ({ default: m.PGGrupoConteudoPastaVendas })));
const GroupLimits = lazy(() => import('../pages/LimitAndControl').then(m => ({ default: m.GroupLimits })));
const ManageGroupLinks = lazy(() => import('../pages/ManageGroupLinks').then(m => ({ default: m.ManageGroupLinks })));
const GroupRevenue = lazy(() => import('../pages/GroupRevenue').then(m => ({ default: m.GroupRevenue })));
const VipSalesHistory = lazy(() => import('../pages/VipSalesHistory').then(m => ({ default: m.VipSalesHistory })));
const PG_Chat_Grupo = lazy(() => import('../pages/PG.Chat.Grupo').then(m => ({ default: m.PG_Chat_Grupo })));

export const groupRoutes = [
    { path: '/groups', element: <ProtectedRoute><Groups /></ProtectedRoute> },
    { path: '/group-chat/:id', element: <ProtectedRoute><GroupChat /></ProtectedRoute> },
    { path: '/group-chat/:id/:channelId', element: <ProtectedRoute><GroupChat /></ProtectedRoute> },
    { path: '/pg-chat-grupo', element: <PG_Chat_Grupo /> },
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
    { path: '/group-settings/:id/access', element: <ProtectedRoute><PGGrupoConfiguracoesAcessoEConvites /></ProtectedRoute> },
    { path: '/group-settings/:id/moderation', element: <ProtectedRoute><PGGrupoConfiguracoesModeracao /></ProtectedRoute> },
    { path: '/group-settings/:id/admin-actions', element: <ProtectedRoute><PGGrupoConfiguracoesAcoesAdministrativas /></ProtectedRoute> },
    { path: '/group-settings/:id/message-audit', element: <ProtectedRoute><PGGrupoConfiguracoesAuditoriaDeMensagens /></ProtectedRoute> },
    { path: '/group-settings/:id/report-audit', element: <ProtectedRoute><PGGrupoConfiguracoesAuditoriaDeDenuncias /></ProtectedRoute> },
    { path: '/group-settings/:id/entry-exit-audit', element: <ProtectedRoute><PGGrupoConfiguracoesAuditoriaDeEntradaESaida /></ProtectedRoute> },
    { path: '/group-settings/:id/settings-audit', element: <ProtectedRoute><PGGrupoConfiguracoesAuditoriaDeAjustes /></ProtectedRoute> },
    { path: '/group-settings/:id/members', element: <ProtectedRoute><PGGrupoConfiguracoesMembros /></ProtectedRoute> },
    { path: '/group-settings/:id/roles', element: <ProtectedRoute><PGGrupoConfiguracoesCargos /></ProtectedRoute> },
    { path: '/group-settings/:id/role-maintenance', element: <ProtectedRoute><PGGrupoConfiguracoesManutencaoCargos /></ProtectedRoute> },
    { path: '/group-settings/:id/guidelines', element: <ProtectedRoute><PGGrupoConfiguracoesDiretrizes /></ProtectedRoute> },
    { path: '/group-settings/:id/role-distribution', element: <ProtectedRoute><PGGrupoConfiguracoesDistribuiçaoDeCargos /></ProtectedRoute> },
    { path: '/group-settings/:id/vip', element: <ProtectedRoute><PGGrupoConfiguracoesVip /></ProtectedRoute> },
    { path: '/group-settings/:id/stats', element: <ProtectedRoute><PGGrupoConfiguracoesEstatisticas /></ProtectedRoute> },
    { path: '/group-settings/:id/audit', element: <ProtectedRoute><PGGrupoConfiguracoesAuditoria /></ProtectedRoute> },
    { path: '/group-settings/:id/schedule', element: <ProtectedRoute><PGGrupoConfiguracoesMensagensAgendadas /></ProtectedRoute> },
    { path: '/group-settings/:id/sales-platform', element: <ProtectedRoute><PGGrupoConfiguracoesPlataformaVendas /></ProtectedRoute> },
    { path: '/group-settings/:id/ads-platforms', element: <ProtectedRoute><PGGrupoConfiguracoesPlataformasADS /></ProtectedRoute> },
    { path: '/group-settings/:id/checkout-config', element: <ProtectedRoute><PGGrupoConfiguracoesCheckout /></ProtectedRoute> },
    { path: '/group-settings/:id/general-notifications', element: <ProtectedRoute><PGGrupoConfiguracoesNotificacoesGerais /></ProtectedRoute> },
    { path: '/group-platform/:id', element: <ProtectedRoute><PGPlataformaHospedagemArquivos /></ProtectedRoute> },
    { path: '/group-folder/:groupId/:folderId', element: <ProtectedRoute><PGGrupoConteudoPastaVendas /></ProtectedRoute> },
    { path: '/group-limits/:id', element: <ProtectedRoute><GroupLimits /></ProtectedRoute> },
    { path: '/group-links/:id', element: <ProtectedRoute><ManageGroupLinks /></ProtectedRoute> },
    { path: '/group-revenue/:id', element: <ProtectedRoute><GroupRevenue /></ProtectedRoute> },
    { path: '/vip-sales-history/:id', element: <ProtectedRoute><VipSalesHistory /></ProtectedRoute> }
  ];
