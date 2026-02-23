
import React, { lazy } from 'react';
import { ProtectedRoute } from '../../Componentes/ComponentesDeAuth/ProtectedRoute';

const Feed = lazy(() => import('../../pages/Feed'));
const PostDetails = lazy(() => import('../../pages/PostDetails'));
const CreatePost = lazy(() => import('../../pages/CreatePost'));
const CreatePoll = lazy(() => import('../../pages/CreatePoll'));
const Reels = lazy(() => import('../../pages/Reels'));
const CreateReel = lazy(() => import('../../pages/CreateReel'));
const ReelsSearch = lazy(() => import('../../pages/ReelsSearch'));
const FeedSearch = lazy(() => import('../../pages/FeedSearch'));

export const feedRoutes = [
  { path: '/feed', element: <ProtectedRoute><Feed /></ProtectedRoute> },
  { path: '/post/:id', element: <ProtectedRoute><PostDetails /></ProtectedRoute> },
  { path: '/create-post', element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
  { path: '/create-poll', element: <ProtectedRoute><CreatePoll /></ProtectedRoute> },
  { path: '/reels', element: <ProtectedRoute><Reels /></ProtectedRoute> },
  { path: '/reels/:id', element: <ProtectedRoute><Reels /></ProtectedRoute> },
  { path: '/reels-search', element: <ProtectedRoute><ReelsSearch /></ProtectedRoute> },
  { path: '/feed-search', element: <ProtectedRoute><FeedSearch /></ProtectedRoute> },
  { path: '/create-reel', element: <ProtectedRoute><CreateReel /></ProtectedRoute> }
];
