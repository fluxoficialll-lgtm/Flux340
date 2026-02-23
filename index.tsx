
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/i18n.js';
import { initAuditorDeRequisições } from './ServiçosFrontend/ServiçoDeTelemetria/AuditorDeRequisições.js';
import { rastreadorDeEventos } from './ServiçosFrontend/ServiçoDeTelemetria/RastreadorDeEventos.js';
import { FiltroDeTelemetria } from './ServiçosFrontend/ServiçoDeTelemetria/FiltroDeTelemetria.js';
import { loadEnvironment } from './ServiçosFrontend/ValidaçãoDeAmbiente/config.ts';

document.addEventListener('DOMContentLoaded', () => {
  loadEnvironment();
  initAuditorDeRequisições();

  if (typeof window !== 'undefined') {
    window.addEventListener('error', (e) => {
      if (e.message && e.message.includes('ResizeObserver loop')) {
        e.stopImmediatePropagation();
        return;
      }
      const error = e.error || e.message;
      if (FiltroDeTelemetria.shouldTrack(error)) {
        rastreadorDeEventos.trackCriticalError(error, 'GLOBAL_WINDOW_ERROR');
      } else {
        e.stopImmediatePropagation();
      }
    });
    window.addEventListener('unhandledrejection', (e) => {
      if (FiltroDeTelemetria.shouldTrack(e.reason)) {
        rastreadorDeEventos.trackCriticalError(e.reason, 'UNHANDLED_PROMISE_REJECTION');
      }
    });
  }

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error("VITE_GOOGLE_CLIENT_ID não está definida. A autenticação com Google não funcionará.");
  }
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId || ""}>
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
});
