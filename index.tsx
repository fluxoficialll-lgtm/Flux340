
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App';

// I18N E VALIDAÇÃO DE AMBIENTE
import './ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/i18n.js';
import { loadEnvironment } from './ServiçosFrontend/ValidaçãoDeAmbiente/config.ts';

// SERVIÇOS GLOBAIS
import { initAuditorDeRequisições } from './ServiçosFrontend/ServiçoDeTelemetria/AuditorDeRequisições.js';
import { servicoDeSimulacao } from './ServiçosFrontend/ServiçoDeSimulação/index.ts';
import MonitorDeErrosDeInterface from './Componentes/ComponentesDePrevençãoDeErros/MonitorDeErrosDeInterface.jsx';

const queryClient = new QueryClient();

// --- INICIALIZAÇÃO E CORREÇÃO DO AMBIENTE DE SIMULAÇÃO ---

const isProduction = import.meta.env.MODE === 'production';

initAuditorDeRequisições();

if (!isProduction) {
  // A verificação abaixo garante que a limpeza do Service Worker ocorra apenas UMA VEZ.
  // Após o recarregamento forçado, a simulação iniciará normalmente com os arquivos corretos.
  if (!localStorage.getItem('__SIMULATION_WORKER_CLEARED__')) {
    console.warn("--- APLICANDO CORREÇÃO: Reiniciando o worker de simulação. A página vai recarregar para aplicar as novas simulações. ---");
    localStorage.setItem('__SIMULATION_WORKER_CLEARED__', 'true');
    // Esta função desregistra o worker antigo e força o recarregamento da página.
    servicoDeSimulacao.reiniciarSimulacaoNoNavegador();
  } else {
    // Inicialização padrão após a correção ter sido aplicada.
    servicoDeSimulacao.iniciarSimulacao();
    console.log("✅ Modo de Simulação ATIVADO (Worker atualizado).");
  }
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
