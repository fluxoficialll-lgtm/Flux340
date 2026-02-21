import { ulid } from 'ulid';
import { Buffer } from 'buffer';

/**
 * Prefixes para IDs únicos do sistema.
 * ATENÇÃO: Nunca altere estes valores depois da aplicação estar em produção.
 */
export const ID_PREFIX = {
  MENSAGEM: 'msg',
  USUARIO: 'usr',
  POST: 'pst',
  GRUPO: 'grp',
  PAGAMENTO: 'pay',
  MEDIA: 'med',
  NOTIFICACAO: 'ntf',
  ITEM_DO_MARKETPLACE: 'itm',
  CONVERSA: 'cnv',
  COMENTARIO: 'cmt',
  TRANSACAO: 'trn',
  EVENTO: 'evt',
  CAMPANHA_DE_ANUNCIO: 'adc',
};

/**
 * Regex para validar a parte ULID de um ID (26 caracteres, Crockford Base32).
 */
const ULID_REGEX = '[0-9A-HJKMNP-TV-Z]{26}';

/**
 * Regex para validar o formato completo do ID (prefixo_ulid).
 */
const ID_REGEX = new RegExp(`^([a-z]{3})_(${ULID_REGEX})$`);

/**
 * Gera um ID único, ordenável e tipado para uma entidade específica.
 * Esta é a ÚNICA função que deve ser usada para criar novos IDs no sistema.
 * @param {string} prefix O prefixo da entidade (ex: ID_PREFIX.USUARIO).
 * @returns {string} Um novo ID formatado, como "usr_01H8XJWBWBAQ4Z4Q9Z4Q9Z4Q9".
 */
export const gerarId = (prefix) => {
  return `${prefix}_${ulid()}`;
};

/**
 * Valida o formato geral de um ID (string, prefixo_ulid).
 * @param {*} valor O valor a ser verificado.
 * @returns {boolean} `true` se o formato do ID for válido.
 */
export const ehIdValido = (valor) => {
  return typeof valor === 'string' && ID_REGEX.test(valor);
};

/**
 * Verifica se um ID é válido e pertence a um prefixo de entidade específico.
 * @param {*} id O ID a ser verificado.
 * @param {string} prefixo O prefixo esperado (ex: ID_PREFIX.USUARIO).
 * @returns {boolean} `true` se o ID for válido e tiver o prefixo correto.
 */
export const ehIdDoTipo = (id, prefixo) => {
  return ehIdValido(id) && id.startsWith(`${prefixo}_`);
};

/**
 * Extrai o prefixo de uma string de ID.
 * @param {string} id A string de ID completa.
 * @returns {string | null} O prefixo da entidade, ou `null` se o ID for inválido.
 */
export const obterPrefixo = (id) => {
  const match = id.match(ID_REGEX);
  if (!match) return null;
  return match[1];
};

/**
 * Extrai a parte ULID de uma string de ID.
 * @param {string} id A string de ID completa.
 * @returns {string | null} O ULID puro, ou `null` se o ID for inválido.
 */
export const obterUlid = (id) => {
  const match = id.match(ID_REGEX);
  if (!match) return null;
  return match[2];
};

/**
 * Ordena um array de IDs. A ordenação é temporal por padrão, graças ao ULID.
 * @param {string[]} ids Array de strings de ID.
 * @returns {string[]} Um novo array com os IDs ordenados.
 */
export const ordenarIds = (ids) => {
  return [...ids].sort();
};

/**
 * Garante que um valor é um ID válido, opcionalmente de um tipo específico.
 * Lança um erro se a validação falhar. Útil para "assertion guards".
 * @param {*} id O valor a ser validado.
 * @param {string} [prefixo] O prefixo esperado (opcional).
 */
export const garantirId = (id, prefixo) => {
  if (!ehIdValido(id)) {
    throw new Error(`Formato de ID inválido: ${id}`);
  }

  if (prefixo && !ehIdDoTipo(id, prefixo)) {
    throw new Error(`O ID não corresponde ao prefixo esperado '${prefixo}': ${id}`);
  }
};

/**
 * Compara dois IDs. Como ULIDs são ordenáveis lexicograficamente, uma comparação de string é suficiente.
 * @param {string} a
 * @param {string} b
 * @returns {-1 | 0 | 1} como em `String.prototype.localeCompare()`.
 */
export const compararIds = (a, b) => {
  return a.localeCompare(b);
};

/**
 * Cria um ID determinístico a partir de uma "seed".
 * ATENÇÃO: Use apenas para casos especiais, como testes ou quando a unicidade não é crítica.
 * Não é tão único quanto um ULID padrão.
 * @param {string} prefixo O prefixo da entidade.
 * @param {string} seed Uma string para basear a geração do ID.
 * @returns {string}
 */
export const criarIdDeterministico = (prefixo, seed) => {
  const base = Buffer.from(seed).toString('base64').slice(0, 10);
  return `${prefixo}_${base}${ulid().slice(10)}`;
};
