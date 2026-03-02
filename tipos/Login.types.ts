import React from 'react';

export interface LoginDadosIniciaisProps {
    onSelecionarEmail: () => void;
    slotBotaoGoogle: React.ReactNode;
    carregando: boolean;
    processandoGoogle: boolean;
}

export interface LoginDadosEmailProps {
    email: string;
    definirEmail: (email: string) => void;
    senha: string;
    definirSenha: (senha: string) => void;
    aoSubmeter: (e: React.FormEvent) => void;
    aoVoltar: () => void;
    carregando: boolean;
    erro: string;
}
