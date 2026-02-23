
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/i18n.js';
import { initAuditorDeRequisições } from './ServiçosFrontend/ServiçoDeTelemetria/AuditorDeRequisições.js';
import { rastreadorDeEventos } from './ServiçosFrontend/ServiçoDeTelemetria/RastreadorDeEventos.js';
import { FiltroDeTelemetria } from './ServiçosFrontend/ServiçoDeTelemetria/FiltroDeTelemetria.js';
import { loadEnvironment } from './ServiçosFrontend/ValidaçãoDeAmbiente/config.ts';

// 1. Carregar configuração de ambiente de forma segura
loadEnvironment();

// 2. Inicialização de Telemetria e Observabilidade
initAuditorDeRequisições();

// 3. Captura Global de Erros (Safety Net)
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

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
