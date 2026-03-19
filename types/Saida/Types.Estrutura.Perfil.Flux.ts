export interface Perfil {
  id: string;
  usuarioId: string;
  nome: string;
  apelido: string;
  bio: string;
  urlFoto: string;
  site: string;
  privado: boolean;
  perfilCompleto: boolean;
  dataCriacao: string;
  dataAtualizacao: string;
}
