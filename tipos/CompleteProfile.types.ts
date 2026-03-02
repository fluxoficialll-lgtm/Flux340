import React from 'react';

export interface DadosFormularioPerfil {
    nickname: string;
    name: string;
    bio: string;
}

export interface PropsPaginaCompletarPerfil {
    dadosFormulario: DadosFormularioPerfil;
    perfilPrivado: boolean;
    previaImagem: string | null;
    carregando: boolean;
    erroNomeUsuario: string;
    cortarAberto: boolean;
    setCortarAberto: (aberto: boolean) => void;
    imagemOriginal: string | null;
    aoMudarInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    aoMudarImagem: (e: React.ChangeEvent<HTMLInputElement>) => void;
    aoSalvarImagemCortada: (imagem: string) => void;
    aoMudarPrivacidade: (privado: boolean) => void;
    aoSubmeter: (e: React.FormEvent) => void;
    aoSair: () => void;
}

export interface PropsModalCortarImagem {
    aberto: boolean;
    imagemSrc: string | null;
    aoFechar: () => void;
    aoSalvar: (imagem: string) => void;
}

export interface PropsSwitch {
    label: string;
    marcado: boolean;
    aoMudar: (marcado: boolean) => void;
}
