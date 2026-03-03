
/**
 * @file Define as estruturas de tipos de dados para a criação de um Reel.
 */

/**
 * Define o formato do objeto de dados para criar um novo Reel.
 */
export interface DadosCriacaoReel {
  descricao: string;
  arquivoVideo: File | null;
  groupId?: string; // Opcional, para postar o Reel em um grupo específico
  musicaId?: string; // ID da música selecionada, opcional
}

/**
 * Define o formato do objeto de erros para a validação do formulário de criação de Reel.
 */
export interface ErrosCriacaoReel {
  descricao?: string;
  arquivoVideo?: string;
  geral?: string;
}
