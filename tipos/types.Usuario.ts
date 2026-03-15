
// Define o perfil público de um usuário.
export interface PerfilDoUsuario {
    nome: string;
    apelido: string;
    bio: string;
    website: string;
    isPrivado: boolean;
    urlDaFoto?: string;
    profile_completed: boolean;
    flags?: {
        isVetoed?: boolean;
        isVip?: boolean;
    };
}

// Define a estrutura para um usuário, autor de um post.
export interface User {
    id: string;
    username: string;
    nickname: string;
    avatar: string;
}

// Define as opções de uma enquete.
export interface PollOption {
    text: string;
    votes: number;
    voters: string[];
}

// Define um grupo associado a um post.
export interface Group {
    id: string;
    name: string;
    isPublic: boolean;
    memberCount: number;
    bannerUrl: string;
}

// Define a estrutura de um post no feed.
export interface Post {
    id: string;
    author: User;
    text: string;
    likes: number;
    commentsCount: number;
    createdAt: string;
    type: 'text' | 'poll' | 'group';
    likedBy: string[];
    poll?: {
        options: PollOption[];
    };
    group?: Group;
    mediaUrl?: string;
    mediaType?: 'image' | 'video';
    views?: number;
}
