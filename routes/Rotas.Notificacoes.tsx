
import React, { lazy } from 'react';
import { ProtectedRoute } from '../Componentes/ComponentesDeAuth/ProtectedRoute';

const Notifications = lazy(() => import('../pages/Notifications').then(m => ({ default: m.Notifications })));
const PG_Lista_Conversas = lazy(() => import('../pages/PG.Lista.Conversas').then(m => ({ default: m.PG_Lista_Conversas })));

export const notificationRoutes = [
  { path: '/notifications', element: <ProtectedRoute><Notifications /></ProtectedRoute> },
  { path: '/messages', element: <ProtectedRoute><PG_Lista_Conversas /></ProtectedRoute> }
];
