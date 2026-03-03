
/**
 * Define a estrutura de um arquivo de mídia para o item do marketplace.
 */
export interface TipoMidiaMarketplace {
  arquivo: File;
  url: string;
  tipo: 'image' | 'video';
}

/**
 * Define o formato dos dados para a criação de um novo item no marketplace.
 */
export interface DadosItemMarketplace {
  titulo: string;
  preco: string;
  categoria: string;
  localizacao: string;
  descricao: string;
  arquivoCapa: File | null;
  arquivosAdicionais: TipoMidiaMarketplace[];
  isAnuncioPago: boolean;
}

/**
 * Define o formato do objeto de erros para a criação de item no marketplace.
 */
export interface ErrosCriacaoMarketplace {
  titulo?: string;
  preco?: string;
  imagemCapa?: string;
  geral?: string;
}
