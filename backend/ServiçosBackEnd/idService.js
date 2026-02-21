import { ulid } from 'ulid';

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
};

/**
 * Gera um ID único e ordenável para uma entidade específica.
 * @param {string} prefix O prefixo da entidade (ex: ID_PREFIX.USUARIO).
 * @returns {string} Um novo ID formatado, como "usr_01H8XJWBWBAQ4Z4Q9Z4Q9Z4Q9".
 */
export const gerarId = (prefix) => {
  if (!prefix) {
    throw new Error('O prefixo é obrigatório para gerar um ID.');
  }
  return `${prefix}_${ulid()}`;
};
