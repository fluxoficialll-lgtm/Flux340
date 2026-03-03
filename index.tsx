
import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App';

// I18N E VALIDAÇÃO DE AMBIENTE - ESSENCIAL PARA CARREGAR PRIMEIRO
import './ServiçosFrontend/ServiçoDeSegurançaDeConteúdo/i18n.js';
import { loadEnvironment } from './ServiçosFrontend/ValidaçãoDeAmbiente/config.ts';

// INICIALIZAÇÃO DOS SERVIÇOS GLOBAIS (SINGLETONS)
// A ordem é importante: A telemetria deve ser a primeira a "envelopar" o fetch.
// A simulação vem depois, garantindo que ela opere dentro do ambiente de telemetria.
import { initAuditorDeRequisições } from './ServiçosFrontend/ServiçoDeTelemetria/AuditorDeRequisições.js';
import { servicoDeSimulacao } from './ServiçosFrontend/ServiçoDeSimulação/index.ts';
import MonitorDeErrosDeInterface from './Componentes/ComponentesDePrevençãoDeErros/MonitorDeErrosDeInterface.jsx';

// --- INICIALIZAÇÃO IMEDIATA ---
// Garantimos que os serviços que manipulam o fetch global estejam ativos ANTES do React montar a aplicação.
initAuditorDeRequisições();
servicoDeSimulacao.iniciarSimulacao(); // FORÇA A ATIVAÇÃO DA SIMULAÇÃO IMEDIATAMENTE.

console.log("✅ Serviços de Telemetria e Simulação (MOCK) inicializados com sucesso.");


// --- MONTAGEM DA APLICAÇÃO REACT ---
document.addEventListener('DOMContentLoaded', () => {
  loadEnvironment();

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Elemento 'root' não encontrado para montar a aplicação React.");
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
