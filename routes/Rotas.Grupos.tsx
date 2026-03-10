
import React, { lazy } from 'react';
import { ProtectedRoute } from '../Componentes/ComponentesDeAuth/ProtectedRoute';

const Groups = lazy(() => import('../pages/Groups').then(m => ({ default: m.Groups })));
const GroupChat = lazy(() => import('../pages/GroupChat').then(m => ({ default: m.GroupChat })));
const CreateGroup = lazy(() => import('../pages/CreateGroup').then(m => ({ default: m.CreateGroup })));
const CreateVipGroup = lazy(() => import('../pages/CreateVipGroup').then(m => ({ default: m.CreateVipGroup })));
const CreatePublicGroup = lazy(() => import('../pages/CreatePublicGroup').then(m => ({ default: m.CreatePublicGroup })));
const CreatePrivateGroup = lazy(() => import('../pages/CreatePrivateGroup').then(m => ({ default: m.CreatePrivateGroup })));
const EditGroup = lazy(() => import('../pages/EditGroup').then(m => ({ default: m.EditGroup })));
const VipGroupSales = lazy(() => import('../pages/VipGroupSales').then(m => ({ default: m.VipGroupSales })));
const SuccessBridge = lazy(() => import('../pages/SuccessBridge').then(m => ({ default: m.SuccessBridge })));
const PGPlataformaHospedagemArquivos = lazy(() => import('../pages/groups/PG.Plataforma.Hospedagem.Arquivos').then(m => ({ default: m.PGPlataformaHospedagemArquivos })));
const PGGrupoConteudoPastaVendas = lazy(() => import('../pages/groups/PG.Grupo.ConteudoPastaVendas').then(m => ({ default: m.PGGrupoConteudoPastaVendas })));
const GroupLimits = lazy(() => import('../pages/LimitAndControl').then(m => ({ default: m.GroupLimits })));
const ManageGroupLinks = lazy(() => import('../pages/ManageGroupLinks').then(m => ({ default: m.ManageGroupLinks })));
const PGGrupoReceita = lazy(() => import('../pages/groups/PG.Grupo.Receita').then(m => ({ default: m.PGGrupoReceita })));
const VipSalesHistory = lazy(() => import('../pages/VipSalesHistory').then(m => ({ default: m.VipSalesHistory })));
const PG_Chat_Grupo = lazy(() => import('../pages/PG.Chat.Grupo').then(m => ({ default: m.PG_Chat_Grupo })));

export const groupRoutes = [
    { path: '/groups', element: <ProtectedRoute><Groups /></ProtectedRoute> },
    { path: '/group-chat/:id', element: <ProtectedRoute><GroupChat /></ProtectedRoute> },
    { path: '/pg-chat-grupo', element: <PG_Chat_Grupo /> },
    { path: '/vip-group-sales/:id', element: <VipGroupSales /> },
    { path: '/create-group', element: <ProtectedRoute><CreateGroup /></ProtectedRoute> },
    { path: '/create-group/vip', element: <ProtectedRoute><CreateVipGroup /></ProtectedRoute> },
    { path: '/create-group/public', element: <ProtectedRoute><CreatePublicGroup /></ProtectedRoute> },
    { path: '/create-group/private', element: <ProtectedRoute><CreatePrivateGroup /></ProtectedRoute> },
    { path: '/edit-group/:id', element: <ProtectedRoute><EditGroup /></ProtectedRoute> },
    { path: '/payment-success-bridge/:id', element: <ProtectedRoute><SuccessBridge /></ProtectedRoute> },
    { path: '/group/:id/files', element: <ProtectedRoute><PGPlataformaHospedagemArquivos /></ProtectedRoute> },
    { path: '/group-folder/:groupId/:folderId', element: <ProtectedRoute><PGGrupoConteudoPastaVendas /></ProtectedRoute> },
    { path: '/group-limits/:id', element: <ProtectedRoute><GroupLimits /></ProtectedRoute> },
    { path: '/group-links/:id', element: <ProtectedRoute><ManageGroupLinks /></ProtectedRoute> },
    { path: '/group/:id/revenue', element: <ProtectedRoute><PGGrupoReceita /></ProtectedRoute> },
    { path: '/vip-sales-history/:id', element: <ProtectedRoute><VipSalesHistory /></ProtectedRoute> }
  ];
