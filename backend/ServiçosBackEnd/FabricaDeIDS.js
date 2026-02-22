
import { randomUUID } from 'crypto';

/**
 * Gera um ID único para uma entidade no sistema.
 * Esta é a ÚNICA função que deve ser usada para criar novos IDs.
 * @returns {string} Um novo UUID v4 puro, para compatibilidade com o banco de dados.
 */
export const gerarId = () => {
  return randomUUID();
};

/**
 * Ordena um array de IDs (UUIDs) em ordem lexicográfica.
 * @param {string[]} ids Array de UUIDs.
 * @returns {string[]} Um novo array com os IDs ordenados.
 */
export const ordenarIds = (ids) => {
  return [...ids].sort();
};

// Todo o sistema de prefixos (ID_PREFIX, ehIdValido, obterPrefixo, etc.) foi removido
// para alinhar com a decisão de usar UUIDs puros em todo o sistema.
