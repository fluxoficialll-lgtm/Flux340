
import { Group } from './index'; // Supondo que o tipo Group já existe

/**
 * Define a estrutura de um arquivo de mídia para preview e upload.
 */
export interface TipoArquivoMidia {
  arquivo: File;
  url: string;
  tipo: 'image' | 'video';
}

/**
 * Define o formato dos dados para a criação de uma nova postagem.
 */
export interface DadosCriacaoPost {
  texto: string;
  arquivosMidia: TipoArquivoMidia[];
  isConteudoAdulto: boolean;
  localizacao: string;
  grupoSelecionado: Group | null;
  // Campos específicos para anúncio
  isAnuncio: boolean;
  orcamentoAnuncio?: string;
  linkAnuncio?: string;
}

/**
 * Define o formato do objeto de erros para a criação de postagem.
 */
export interface ErrosCriacaoPost {
  geral?: string;
  conteudo?: string;
}
