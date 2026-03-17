
import { useEffect } from 'react';
import authService from '../ServiçosFrontend/ServiçoDeAutenticação/authService.js';
import { servicoDeSincronizacaoDeSessao } from '../ServiçosFrontend/ServiçoDeSincronização/ServicoDeSincronizacaoDeSessao.js';
import { SyncState } from '../ServiçosFrontend/ServiçoDeSincronização/EstadoDeSincronizacao.js';
import { socketService } from '../ServiçosFrontend/ServiçoDeSincronização/Servico.Sincronizacao.Tempo.Real.js';

export const useSincronizacao = () => {
  useEffect(() => {
    const user = authService.getCurrentUser();
    const email = user?.email;
    
    // 1. Conecta o serviço de soquete se o usuário estiver logado
    if (email) {
        socketService.connect();
    }

    // 2. Orquestra a sincronização inicial (completa ou em background)
    const initializeSync = async () => {
        if (email && SyncState.shouldDoFullSync()) {
            await servicoDeSincronizacaoDeSessao.performFullSync();
        } else {
            await servicoDeSincronizacaoDeSessao.performBackgroundSync();
        }
    };

    initializeSync();

    // 3. Mantém a sincronização em background periodicamente
    const backgroundSyncInterval = setInterval(() => {
      if (authService.getCurrentUser()) {
        servicoDeSincronizacaoDeSessao.performBackgroundSync();
      }
    }, 300000); // A cada 5 minutos

    // 4. Limpeza ao desmontar o hook
    return () => {
      clearInterval(backgroundSyncInterval);
      socketService.disconnect();
    };
  }, []);
};
