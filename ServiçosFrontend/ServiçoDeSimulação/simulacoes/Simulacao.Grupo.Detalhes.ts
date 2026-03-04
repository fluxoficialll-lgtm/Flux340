// --- SIMULAÇÃO DO SERVIÇO DE DETALHES DE GRUPO ---

import { mockGroups as publicGroups } from './Simulacao.Lista.Grupos';
import { myMockGroups } from './Simulacao.Grupo.Proprio';

// --- DADOS CENTRALIZADOS ---
// Combina todos os grupos de todas as simulações em um único mapa para fácil busca.
const allMockGroups = [...publicGroups, ...myMockGroups].reduce((acc, group) => {
    // @ts-ignore
    acc[group.id] = group;
    return acc;
}, {});


const handleGetGroupDetails = async (url: URL, config?: RequestInit): Promise<Response> => {
    // Extrai o ID do grupo da URL (ex: /api/groups/group-1 -> group-1)
    const groupId = url.pathname.split('/').pop();
    console.log(`[SIMULAÇÃO] ✅ Buscando detalhes para o grupo: ${groupId}.`);

    await new Promise(res => setTimeout(res, 250));

    // @ts-ignore
    if (groupId && allMockGroups[groupId]) {
        // @ts-ignore
        return new Response(JSON.stringify(allMockGroups[groupId]), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } else {
        console.error(`[SIMULAÇÃO] ❌ Grupo com ID '${groupId}' não encontrado.`);
        return new Response(JSON.stringify({ message: 'Grupo não encontrado.' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};


// --- HANDLERS ---
export const groupDetailsHandlers = {
    '/api/groups/:id': handleGetGroupDetails,
};
