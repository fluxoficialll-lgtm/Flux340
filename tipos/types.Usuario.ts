/**
 * Interface que define o perfil de um usuário.
 */
export interface PerfilDoUsuario {
    nome: string;
    apelido: string;
    bio: string;
    website: string;
    isPrivado: boolean;
    urlDaFoto?: string;
    profile_completed: boolean;
}
