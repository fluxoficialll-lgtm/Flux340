
import { groupService } from './groupService.js';
import { fileService } from '../ServiçoDeArquivos/fileService.js';
import { authService } from '../ServiçoDeAutenticação/authService.js';

export const ServiçoCriaçãoGrupoPrivado = {
    /**
     * Cria um novo grupo privado, orquestrando o upload de imagem de capa e a criação do grupo.
     * @param {{ name: string, description: string }} groupData - Dados básicos do grupo.
     * @param {File | null} coverFile - O arquivo da imagem de capa.
     * @param {string | undefined} coverImageBase64 - A imagem de capa como base64 (do crop).
     * @returns {Promise<object>} - O objeto do grupo recém-criado.
     */
    async criar(groupData, coverFile, coverImageBase64) {
        let finalCoverUrl = coverImageBase64;

        if (coverFile) {
            try {
                finalCoverUrl = await fileService.uploadFile(coverFile);
            } catch (error) {
                console.error("Falha no upload da imagem de capa:", error);
                throw new Error("Não foi possível fazer o upload da imagem de capa.");
            }
        }

        const currentUserId = authService.getCurrentUserId();
        const currentUserEmail = authService.getCurrentUserEmail();

        const newGroup = {
            id: Date.now().toString(),
            name: groupData.name,
            description: groupData.description,
            coverImage: finalCoverUrl,
            isVip: false,
            isPrivate: true,
            lastMessage: "Grupo privado criado.",
            time: "Agora",
            creatorId: currentUserId || '',
            creatorEmail: currentUserEmail || undefined,
            memberIds: currentUserId ? [currentUserId] : [],
            adminIds: currentUserId ? [currentUserId] : []
        };

        try {
            const createdGroup = await groupService.createGroup(newGroup);
            return createdGroup;
        } catch (error) {
            console.error("Falha ao criar o grupo privado:", error);
            throw new Error("Ocorreu um erro ao registrar o novo grupo.");
        }
    }
};
