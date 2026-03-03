
/**
 * @file Define as estruturas de tipos de dados para a criação de um grupo público.
 */

/**
 * Define o formato do objeto de dados para criar um novo grupo público.
 */
export interface DadosGrupoPublico {
  nomeGrupo: string;
  descricao: string;
  arquivoCapa: File | null;
}

/**
 * Define o formato do objeto de erros para a validação do formulário de criação de grupo público.
 */
export interface ErrosCriacaoGrupoPublico {
  nomeGrupo?: string;
  geral?: string;
}
