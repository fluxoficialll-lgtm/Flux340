
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Geral.ts

import API_Sistema_Geral from '../APIs/APIsServicoGrupos/API.Sistema.Geral';
// import ServicoLog from '../ServicoLogs/ServicoDeLog';

const contextoBase = "Servico.Sistema.Geral";

// --- Configurações Gerais e Estatísticas ---

export const getGroupDetails = async (groupId: string): Promise<any> => {
    const contexto = `${contextoBase}.getGroupDetails`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Geral.obterDetalhes(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateGroupSettings = async (groupId: string, settings: object): Promise<any> => {
    const contexto = `${contextoBase}.updateGroupSettings`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Geral.atualizarConfiguracoes(groupId, settings);
        return data;
    } catch (error) {
        throw error;
    }
};

export const getGroupStats = async (groupId: string): Promise<any> => {
    const contexto = `${contextoBase}.getGroupStats`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Geral.obterEstatisticas(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};

// --- Diretrizes do Grupo ---

export const getGuidelines = async (groupId: string): Promise<any> => {
    const contexto = `${contextoBase}.getGuidelines`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Geral.obterDiretrizes(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateGuidelines = async (groupId: string, guidelines: object): Promise<any> => {
    const contexto = `${contextoBase}.updateGuidelines`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Geral.atualizarDiretrizes(groupId, guidelines);
        return data;
    } catch (error) {
        throw error;
    }
};

// --- Configurações de Notificação ---

export const getNotificationSettings = async (groupId: string): Promise<any> => {
    const contexto = `${contextoBase}.getNotificationSettings`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Geral.obterConfiguracoesNotificacao(groupId);
        return data;
    } catch (error) {
        throw error;
    }
};

export const updateNotificationSettings = async (groupId: string, settings: object): Promise<any> => {
    const contexto = `${contextoBase}.updateNotificationSettings`;
    if (!groupId) {
        // ServicoLog.aviso(contexto, 'ID do grupo não fornecido.');
        return Promise.reject('ID do grupo não fornecido.');
    }
    try {
        const { data } = await API_Sistema_Geral.atualizarConfiguracoesNotificacao(groupId, settings);
        return data;
    } catch (error) {
        throw error;
    }
};
