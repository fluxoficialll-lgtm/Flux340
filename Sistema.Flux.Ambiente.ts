
import { servicoDeSimulacao } from './ServiçosFrontend/ServiçoDeSimulação/index.ts';

/**
 * Configura e valida o ambiente da aplicação (Nível 2).
 * Isso inclui verificar o modo (produção/desenvolvimento) e lidar com a
 * inicialização de serviços específicos do modo de desenvolvimento, como a simulação.
 */
export function configurarAmbiente() {
  const isProduction = import.meta.env.MODE === 'production';

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

  console.log("✅ Ambiente (Nível 2) configurado.");
}
