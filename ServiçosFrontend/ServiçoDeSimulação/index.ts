
import { ControleDeSimulacao } from './ControleDeSimulacao';

/**
 * Exporta a instância única do ControleDeSimulacao como o serviço de simulação padrão.
 * Isso garante que toda a aplicação use a mesma instância do orquestrador de simulação,
 * resolvendo o erro de "subscribe is not a function" e unificando o controle.
 */
export const servicoDeSimulacao = ControleDeSimulacao;
