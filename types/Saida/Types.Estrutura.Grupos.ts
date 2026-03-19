
export interface Grupo {
  id: string;
  nome: string;
  descricao: string;
  tipo: "publico" | "privado" | "pago";
  preco?: number;
  moeda?: string;
  donoId: string;
  dataCriacao: string;
  limiteMembros?: number;
  imagemCapa?: string;
  tipoAcesso: "direto" | "convite";
  provedorPagamentoId?: string;
  dataExpiracao?: string;
  vipDoor?: any;
  pixel?: any;
}
