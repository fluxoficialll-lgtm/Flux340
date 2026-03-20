
// types/Saida/Types.Estrutura.Notificacao.ts

/**
 * Define a estrutura de um item de notificação individual, como recebido pela aplicação.
 */
export interface Notificacao {
    id: number | string;
    tipo: string;             // Ex: 'seguir', 'mencao', 'curtida'
    nomeUsuario: string;      // Ex: @fulano
    nomeExibicao: string;     // Ex: Fulano de Tal
    urlAvatar: string;
    timestamp: string;        // Timestamp da notificação para exibição
    dataCriacao: string;      // Timestamp original para lógica de agrupamento
    lida?: boolean;           // Opcional: indica se a notificação foi lida

    // -- Campos Condicionais --

    conteudoRelacionado?: string;  // Ex: texto de um comentário
    seguindoDeVolta?: boolean;    // Para 'seguir', indica se você segue o usuário

    grupo?: {
        id: string;
        nome: string;
    };

    [key: string]: any; // Permite flexibilidade
}

/**
 * Agrupa as notificações por um critério, geralmente um período de tempo (ex: 'Hoje').
 */
export interface NotificacaoAgrupada {
    [chave: string]: Notificacao[];
}

/**
 * Representação simplificada de um Grupo, usada em contextos de notificação.
 */
export interface Grupo {
    id: string;
    nome: string;
    urlAvatar?: string;
}

/**
 * Informações de preço para modais de pagamento iniciados por notificações.
 */
export interface InfoPreco {
    preco: number;
    moeda: string;
    precoFormatado: string;
}
