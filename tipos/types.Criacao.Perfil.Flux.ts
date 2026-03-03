
import React from 'react';

/**
 * Define o formato dos dados do formulário para completar o perfil.
 */
export interface DadosFormularioPerfil {
    nickname: string;
    name: string;
    bio: string;
    perfilPrivado: boolean;
}

/**
 * Define o formato do objeto de erros para a página de completar perfil.
 */
export interface ErrosCompletarPerfil {
    nomeUsuario?: string;
    formulario?: string;
}

export interface PropsPaginaCompletarPerfil {
    dadosFormulario: DadosFormularioPerfil;
    previaImagem: string | null;
    carregando: boolean;
    erros: ErrosCompletarPerfil;
    cortarAberto: boolean;
    setCortarAberto: (aberto: boolean) => void;
    imagemOriginal: string | null;
    updateField: (key: keyof DadosFormularioPerfil, value: string | boolean) => void;
    aoMudarImagem: (e: React.ChangeEvent<HTMLInputElement>) => void;
    aoSalvarImagemCortada: (imagem: string) => void;
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
