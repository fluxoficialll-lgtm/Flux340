
/**
 * @file Define as estruturas de tipos de dados para a criação de um grupo privado.
 */

/**
 * Define o formato do objeto de dados para criar um novo grupo privado.
 * A privacidade é gerenciada no backend, mas o formulário de criação coleta estes dados.
 */
export interface DadosGrupoPrivado {
  nomeGrupo: string;
  descricao: string;
  arquivoCapa: File | null;
}

/**
 * Define o formato do objeto de erros para a validação do formulário de criação de grupo privado.
 */
export interface ErrosCriacaoGrupoPrivado {
  nomeGrupo?: string;
  geral?: string;
}
