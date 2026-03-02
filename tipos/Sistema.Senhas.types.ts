/**
 * Tipos de Erro de Autenticação e Senhas
 * Enum para padronizar as mensagens de erro relacionadas a senhas e autenticação.
 */
export enum ErroSenha {
    FORMATO_INVALIDO = "O formato do e-mail é inválido.",
    SENHA_MUITO_CURTA = "A senha deve ter pelo menos 6 caracteres.",
    SENHAS_NAO_CONFEREM = "As senhas não coincidem.",
}
