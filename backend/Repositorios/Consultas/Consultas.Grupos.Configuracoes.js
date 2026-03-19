
/**
 * @file Armazena as consultas SQL para a tabela de configurações de grupos.
 * Separar as queries em seu próprio arquivo melhora a manutenibilidade e a clareza do código do repositório.
 */

export const ConsultasGruposConfiguracoes = {
    /**
     * Query para atualizar as configurações gerais de um grupo.
     */
    ATUALIZAR_CONFIGURACOES: `
        UPDATE grupos_configuracoes 
        SET nome = ?, descricao = ?, privacidade = ?
        WHERE id_grupo = ?;
    `,

    /**
     * Query para buscar todas as configurações de um grupo pelo seu ID.
     */
    OBTER_CONFIGURACOES_POR_ID: `
        SELECT * FROM grupos_configuracoes WHERE id_grupo = ?;
    `,

    // -- Outras queries podem ser adicionadas aqui --
    // Ex: ATUALIZAR_DIRETRIZES, OBTER_ESTATISTICAS, etc.
};
