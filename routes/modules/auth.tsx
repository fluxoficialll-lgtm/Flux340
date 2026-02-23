
import React, { lazy } from 'react';

const Login = lazy(() => import('../../pages/Login'));
const Register = lazy(() => import('../../pages/Register'));
const VerifyEmail = lazy(() => import('../../pages/VerifyEmail'));
const ForgotPassword = lazy(() => import('../../pages/ForgotPassword'));
const ResetPassword = lazy(() => import('../../pages/ResetPassword'));
const Banned = lazy(() => import('../../pages/Banned'));

export const authRoutes = [
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/verify-email', element: <VerifyEmail /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },
  { path: '/banned', element: <Banned /> }
];
