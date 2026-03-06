
import React, { lazy } from 'react';
import { ProtectedRoute } from '../Componentes/ComponentesDeAuth/ProtectedRoute';

const Feed = lazy(() => import('../pages/Feed').then(module => ({ default: module.Feed })));
const PGDetalhesPostFeed = lazy(() => import('../pages/PG.Detalhes.Post.Feed.tsx').then(module => ({ default: module.PGDetalhesPostFeed })));
const CreatePost = lazy(() => import('../pages/CreatePost').then(module => ({ default: module.CreatePost })));
const CreatePoll = lazy(() => import('../pages/CreatePoll').then(module => ({ default: module.CreatePoll })));
const PG_Reels = lazy(() => import('../pages/PG.Reels').then(module => ({ default: module.PG_Reels })));
const CreateReel = lazy(() => import('../pages/CreateReel').then(module => ({ default: module.CreateReel })));
const ReelsSearch = lazy(() => import('../pages/ReelsSearch').then(module => ({ default: module.ReelsSearch })));
const FeedSearch = lazy(() => import('../pages/FeedSearch').then(module => ({ default: module.FeedSearch })));
const LocationSelector = lazy(() => import('../pages/LocationSelector'));

export const feedRoutes = [
  { path: '/feed', element: <ProtectedRoute><Feed /></ProtectedRoute> },
  { path: '/post/:id', element: <ProtectedRoute><PGDetalhesPostFeed /></ProtectedRoute> },
  { path: '/create-post', element: <ProtectedRoute><CreatePost /></ProtectedRoute> },
  { path: '/create-poll', element: <ProtectedRoute><CreatePoll /></ProtectedRoute> },
  { path: '/reels', element: <ProtectedRoute><PG_Reels /></ProtectedRoute> },
  { path: '/reels/:id', element: <ProtectedRoute><PG_Reels /></ProtectedRoute> },
  { path: '/reels-search', element: <ProtectedRoute><ReelsSearch /></ProtectedRoute> },
  { path: '/feed-search', element: <ProtectedRoute><FeedSearch /></ProtectedRoute> },
  { path: '/create-reel', element: <ProtectedRoute><CreateReel /></ProtectedRoute> },
  { path: '/location-selector', element: <ProtectedRoute><LocationSelector /></ProtectedRoute> }
];
