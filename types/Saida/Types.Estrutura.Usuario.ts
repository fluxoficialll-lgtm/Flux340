export interface Usuario {
  id: string;
  nome: string;
  email: string;
  apelido: string;
  bio: string;
  site: string;
  urlFoto: string;
  privado: boolean;
  perfilCompleto: boolean;
  dataCriacao: Date;
  dataAtualizacao: Date;
}
