
// Arquivo: ServiçosFrontend/ServiçoDeGrupos/Servico.Sistema.Geral.js

import API_Sistema_Geral from '../APIs/APIsServicoGrupos/API.Sistema.Geral.js';
// import ServicoLog from '../ServicoLogs/ServicoDeLog.js';

const contextoBase = "Servico.Sistema.Geral";

// --- Configurações Gerais e Estatísticas ---

export const getGroupDetails = async (groupId) => {
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

export const updateGroupSettings = async (groupId, settings) => {
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

export const getGroupStats = async (groupId) => {
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

export const getGuidelines = async (groupId) => {
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

export const updateGuidelines = async (groupId, guidelines) => {
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

export const getNotificationSettings = async (groupId) => {
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

export const updateNotificationSettings = async (groupId, settings) => {
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
