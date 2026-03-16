
// --- SIMULAÇÃO DO SERVIÇO DE CONFIGURAÇÕES GERAIS E ESTATÍSTICAS DE GRUPO ---

import { mockGroupDetails } from './Simulacao.Grupo.Detalhes'; // Importa os IDs dos grupos

// --- DADOS SIMULADOS ---

const mockStats = { /* ... dados mantidos ... */ };
let mockSettings = { /* ... dados mantidos ... */ };
let mockGuidelines = { /* ... dados mantidos ... */ };
let mockNotificationSettings = { /* ... dados mantidos ... */ };

// --- HANDLERS PARA AS ROTAS ---

const handleGetGroupStats = async (url: URL): Promise<Response> => {
    const groupId = url.pathname.split('/')[3];
    console.log(`[SIMULAÇÃO] ✅ Buscando estatísticas para o grupo ${groupId}.`);
    await new Promise(res => setTimeout(res, 300));
    return new Response(JSON.stringify(mockStats), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

const handleUpdateGroupSettings = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/')[3];
    console.log(`[SIMULAÇÃO] ✅ Atualizando configurações do grupo ${groupId}.`);
    const updates = await new Response(config?.body).json();
    mockSettings = { ...mockSettings, ...updates };
    await new Promise(res => setTimeout(res, 700));
    return new Response(JSON.stringify(mockSettings), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

const handleGuidelinesRequest = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/')[3];
    if (config?.method === 'PUT') {
        console.log(`[SIMULAÇÃO] ✅ Atualizando diretrizes do grupo ${groupId}.`);
        const { content } = await new Response(config?.body).json();
        mockGuidelines.content = content;
        await new Promise(res => setTimeout(res, 600));
        return new Response(JSON.stringify(mockGuidelines), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    console.log(`[SIMULAÇÃO] ✅ Buscando diretrizes para o grupo ${groupId}.`);
    await new Promise(res => setTimeout(res, 450));
    return new Response(JSON.stringify(mockGuidelines), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

const handleNotificationSettingsRequest = async (url: URL, config?: RequestInit): Promise<Response> => {
    const groupId = url.pathname.split('/')[3];
    if (config?.method === 'PUT') {
        console.log(`[SIMULAÇÃO] ✅ Atualizando configs de notificação do grupo ${groupId}.`);
        const updates = await new Response(config?.body).json();
        mockNotificationSettings = { ...mockNotificationSettings, ...updates };
        await new Promise(res => setTimeout(res, 500));
        return new Response(JSON.stringify(mockNotificationSettings), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
    console.log(`[SIMULAÇÃO] ✅ Buscando configs de notificação para o grupo ${groupId}.`);
    await new Promise(res => setTimeout(res, 550));
    return new Response(JSON.stringify(mockNotificationSettings), { status: 200, headers: { 'Content-Type': 'application/json' } });
};

// --- GERAÇÃO DE HANDLERS ESTÁTICOS (A SOLUÇÃO DEFINITIVA) ---

const generatedHandlers = {};

Object.keys(mockGroupDetails).forEach(groupId => {
    generatedHandlers[`/api/groups/${groupId}/stats`] = handleGetGroupStats;
    generatedHandlers[`/api/groups/${groupId}/settings`] = handleUpdateGroupSettings;
    generatedHandlers[`/api/groups/${groupId}/guidelines`] = handleGuidelinesRequest;
    generatedHandlers[`/api/groups/${groupId}/notification-settings`] = handleNotificationSettingsRequest;
});

export const groupGeneralConfigHandlers = generatedHandlers;
