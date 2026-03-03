
import React, { lazy } from 'react';
import { ControleDeAcessoAuth } from './ControleDeAcessoAuth';

const Login = lazy(() => import('../pages/Login').then(module => ({ default: module.Login })));
const Register = lazy(() => import('../pages/Register').then(module => ({ default: module.Register })));
const VerifyEmail = lazy(() => import('../pages/VerifyEmail').then(module => ({ default: module.VerifyEmail })));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword').then(module => ({ default: module.ForgotPassword })));
const ResetPassword = lazy(() => import('../pages/ResetPassword').then(module => ({ default: module.ResetPassword })));
const Banned = lazy(() => import('../pages/Banned').then(module => ({ default: module.Banned })));

export const authRoutes = [
  { path: '/', element: <ControleDeAcessoAuth><Login /></ControleDeAcessoAuth> },
  { path: '/register', element: <ControleDeAcessoAuth><Register /></ControleDeAcessoAuth> },
  { path: '/verify-email', element: <VerifyEmail /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/banned', element: <Banned /> }
];
