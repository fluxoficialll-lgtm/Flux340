
// --- MOCK DO SERVIÇO DE RELACIONAMENTO ---

class RelationshipService {
    /**
     * Simula a verificação se um usuário está seguindo outro.
     * @param {string} followerId - O ID de quem segue.
     * @param {string} followingId - O ID de quem está sendo seguido.
     * @returns {Promise<boolean>}
     */
    isFollowing(followerId, followingId) {
        console.log(`[Relationship Mock] Verificando se ${followerId} segue ${followingId}`);
        // Mock: O usuário nunca segue ninguém inicialmente.
        return Promise.resolve(false);
    }

    /**
     * Simula a ação de seguir ou deixar de seguir um usuário.
     * @param {string} followerId - O ID de quem segue.
     * @param {string} followingId - O ID de quem está sendo seguido.
     * @returns {Promise<void>}
     */
    toggleFollow(followerId, followingId) {
        console.log(`[Relationship Mock] ${followerId} está seguindo/deixando de seguir ${followingId}`);
        // A lógica de estado real seria gerenciada no banco de dados ou estado da aplicação.
        return Promise.resolve();
    }

    /**
     * Simula a busca por seguidores de um usuário.
     * @param {string} userId - O ID do usuário.
     * @returns {string[]} - Retorna uma lista de IDs de usuários.
     */
    getFollowers(userId) {
        console.log(`[Relationship Mock] Buscando seguidores de ${userId}`);
        return []; // Retorna uma lista vazia para simulação
    }

    /**
     * Simula a busca por usuários que um usuário segue.
     * @param {string} userId - O ID do usuário.
     * @returns {string[]} - Retorna uma lista de IDs de usuários.
     */
    getFollowing(userId) {
        console.log(`[Relationship Mock] Buscando quem ${userId} segue`);
        return []; // Retorna uma lista vazia para simulação
    }
}

export const relationshipService = new RelationshipService();
