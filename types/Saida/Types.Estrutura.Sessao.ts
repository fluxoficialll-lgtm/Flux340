
import { Usuario } from './Types.Estrutura.Usuario';

export interface Sessao {
  token: string;
  usuario: Usuario;
}
