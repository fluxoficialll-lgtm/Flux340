
// tipos/Register.types.ts

/**
 * Define o formato dos dados de entrada para o formulário de registro.
 */
export type DadosEntradaRegistro = {
  email: string;
  senha: string;
  confirmacaoSenha: string;
  termosAceitos: boolean;
  indicadoPor?: string;
};

/**
 * Define o formato do objeto de erros para o formulário de registro.
 */
export type ErrosRegistro = {
  email?: string;
  senha?: string;
  confirmacao?: string;
  formulario?: string;
};
