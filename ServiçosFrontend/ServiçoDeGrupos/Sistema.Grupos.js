
// --- SISTEMA DE GRUPOS ---

/**
 * Define um serviço para interagir com a API de grupos.
 */
class GroupSystem {
    /**
     * Busca os detalhes de um grupo específico, incluindo nome, participantes e mensagens.
     * @param {string} groupId O ID do grupo a ser buscado.
     * @returns {Promise<object>} Uma promessa que resolve com os dados do grupo.
     */
    async getGroupDetails(groupId) {
        try {
            const response = await fetch(`/api/group-chat/${groupId}`);
            if (!response.ok) {
                console.error(`Erro ao buscar o chat do grupo ${groupId}. Status: ${response.status}`);
                throw new Error('Grupo não encontrado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Falha na requisição de detalhes do chat do grupo:', error);
            throw error;
        }
    }

    /**
     * Busca a lista de membros e solicitações pendentes de um grupo.
     * @param {string} groupId O ID do grupo.
     * @returns {Promise<{members: Array, pending: Array}>} Os membros e as solicitações.
     */
    async getGroupMembers(groupId) {
        console.log(`[groupSystem] Buscando membros para o grupo: ${groupId}`);
        try {
            const response = await fetch(`/api/groups/${groupId}/members`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Falha ao buscar membros do grupo:", error);
            return { members: [], pending: [] }; // Retorna um estado seguro em caso de falha.
        }
    }

    /**
     * CORREÇÃO: Adiciona a função `getTopGroups` que estava faltando.
     * Esta função é necessária para o hook `useTopGroups` e busca os grupos
     * mais relevantes para o usuário logado.
     * @param {string} userId O ID do usuário para personalizar os resultados.
     * @returns {Promise<Array>} Uma promessa que resolve com a lista dos principais grupos.
     */
    async getTopGroups(userId) {
        console.log(`[groupSystem] Buscando os principais grupos para o usuário: ${userId}`);
        try {
            // A URL assume um endpoint que filtra os top groups por usuário.
            const response = await fetch(`/api/groups/top?userId=${userId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Falha ao buscar os principais grupos:", error);
            return []; // Retorna uma lista vazia em caso de erro para não quebrar a UI.
        }    
    }
}

// Exporta uma instância única do serviço para ser usada em toda a aplicação.
export const groupSystem = new GroupSystem();
