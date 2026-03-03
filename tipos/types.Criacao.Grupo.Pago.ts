
import { CurrencyType } from './index';

/**
 * Define a estrutura de um item de mídia para a porta VIP.
 */
export interface TipoMidiaVip {
  arquivo?: File;
  url: string;
  tipo: 'image' | 'video';
}

/**
 * Define as configurações de acesso para um grupo VIP.
 */
export type ConfiguracaoAcesso = {
  duracaoDias?: number; // Para acesso temporário
} | null;

/**
 * Define o formato dos dados para a criação de um novo grupo VIP.
 */
export interface DadosGrupoVip {
  nomeGrupo: string;
  descricao: string;
  arquivoCapa: File | null;
  itensMidiaVip: TipoMidiaVip[];
  textoPortaVip: string;
  textoBotaoVip: string;
  preco: string;
  moeda: CurrencyType;
  tipoAcesso: 'lifetime' | 'temporary' | 'one_time';
  configuracaoAcesso: ConfiguracaoAcesso;
  idProvedorSelecionado: string | null;
  pixelId: string;
  pixelToken: string;
}

/**
 * Define o formato do objeto de erros para a criação de grupo VIP.
 */
export interface ErrosCriacaoGrupoVip {
  nomeGrupo?: string;
  preco?: string;
  provedor?: string;
  geral?: string;
}
