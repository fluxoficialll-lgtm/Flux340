
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // CORREÇÃO: Importa o provider.

import App from './App';

// I18N E VALIDAÇÃO DE AMBIENTE
import './ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/i18n.js';
import { loadEnvironment } from './ServiçosFrontend/ValidaçãoDeAmbiente/config.ts';

// SERVIÇOS GLOBAIS
import { initAuditorDeRequisições } from './ServiçosFrontend/ServiçoDeTelemetria/AuditorDeRequisições.js';
import { servicoDeSimulacao } from './ServiçosFrontend/ServiçoDeSimulação/index.ts';
import MonitorDeErrosDeInterface from './Componentes/ComponentesDePrevençãoDeErros/MonitorDeErrosDeInterface.jsx';

// CRIAÇÃO DO CLIENTE - CORREÇÃO: Instancia o QueryClient.
const queryClient = new QueryClient();

// --- INICIALIZAÇÃO ---

const isProduction = import.meta.env.MODE === 'production';

initAuditorDeRequisições();

if (!isProduction) {
  servicoDeSimulacao.iniciarSimulacao();
  console.log("✅ Modo de Simulação ATIVADO.");
} else {
  console.log("✅ Modo de Produção ATIVADO.");
}

console.log("✅ Serviços de Telemetria inicializados.");

// --- MONTAGEM DA APLICAÇÃO REACT ---
document.addEventListener('DOMContentLoaded', () => {
  loadEnvironment();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Elemento 'root' não foi encontrado.");
  }

  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  if (!googleClientId) {
    console.error("VITE_GOOGLE_CLIENT_ID não definida.");
  }
  
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      {/* CORREÇÃO: Adiciona o QueryClientProvider envolvendo a aplicação */}
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={googleClientId || ""}>
          <MonitorDeErrosDeInterface>
            <App />
          </MonitorDeErrosDeInterface>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
});
