
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
            // --- CORREÇÃO DEFINITIVA ---
            // A URL foi alterada para a rota específica de detalhes do chat de grupo,
            // evitando o conflito com a rota da lista de grupos.
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
}

// Exporta uma instância única do serviço para ser usada em toda a aplicação.
export const groupSystem = new GroupSystem();
