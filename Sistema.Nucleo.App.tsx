
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter } from 'react-router-dom';
import { ModalProvider } from './Componentes/ComponenteDeInterfaceDeUsuario/ModalSystem';
import { GlobalTracker } from './Componentes/layout/GlobalTracker';
import { DeepLinkHandler } from './Componentes/layout/DeepLinkHandler';
import AppRoutes from './routes/AppRoutes';
import { HookAutenticacaoSincronizacao } from './hooks/Hook.Autenticacao.Sincronizacao';
// A importação do ControleDeSimulacao foi removida para garantir o isolamento total.
import MonitorDeErrosDeInterface from './Componentes/ComponentesDePrevençãoDeErros/MonitorDeErrosDeInterface.jsx';

const Maintenance = lazy(() => import('./pages/Maintenance'));

// O componente DemoModeBadge foi removido pois dependia do sistema de simulação.

const LoadingFallback = () => (
    <div className="h-screen w-full bg-[#0c0f14] flex flex-col items-center justify-center gap-4">
        <i className="fa-solid fa-circle-notch fa-spin text-[#00c2ff] text-2xl"></i>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[3px]">
            Iniciando Protocolos...
        </span>
    </div>
);

const SistemaNucleoApp: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [isMaintenance, setIsMaintenance] = useState(false);

  HookAutenticacaoSincronizacao();

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Lógica de inicialização original, sem qualquer referência à simulação.
        const config = { maintenanceMode: false }; 
        setIsMaintenance(config.maintenanceMode);

      } catch (e) {
        console.error("Erro crítico no boot do sistema:", e);
        setIsMaintenance(false); 
      } finally {
        setIsReady(true);
      }
    };
    
    initializeApp();
  }, []);

  if (!isReady) {
    return <LoadingFallback />;
  }

  if (isMaintenance) {
    return (
        <Suspense fallback={<LoadingFallback />}>
            <Maintenance />
        </Suspense>
    );
  }

  return (
    <MonitorDeErrosDeInterface>
      <ModalProvider>
        <HashRouter>
          <GlobalTracker />
          <DeepLinkHandler />
          {/* O DemoModeBadge foi removido da renderização. */}
          <Suspense fallback={<LoadingFallback />}>
            <AppRoutes />
          </Suspense>
        </HashRouter>
      </ModalProvider>
    </MonitorDeErrosDeInterface>
  );
};

export default SistemaNucleoApp;
