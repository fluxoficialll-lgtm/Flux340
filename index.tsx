import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';
import './ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/i18n.js';
import { initAuditorDeRequisições } from './ServiçosFrontend/ServiçoDeTelemetria/AuditorDeRequisições.js';
import { loadEnvironment } from './ServiçosFrontend/ValidaçãoDeAmbiente/config.ts';
import MonitorDeErrosDeInterface from './Componentes/ComponentesDePrevençãoDeErros/MonitorDeErrosDeInterface.jsx';

document.addEventListener('DOMContentLoaded', () => {
  loadEnvironment();
  initAuditorDeRequisições();

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
        <MonitorDeErrosDeInterface>
          <App />
        </MonitorDeErrosDeInterface>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
});
