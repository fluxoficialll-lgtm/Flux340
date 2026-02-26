
import { groupService } from './groupService.js';
import { fileService } from '../ServiçoDeArquivos/fileService.js';
import { authService } from '../ServiçoDeAutenticação/authService.js';

export const ServiçoCriaçãoGrupoPago = {
    /**
     * Cria um novo grupo VIP, orquestrando uploads e a criação final.
     * @param {object} payload - Os dados do grupo vindos do hook.
     * @param {function} onProgress - Callback para reportar o progresso do upload.
     * @returns {Promise<object>} - O objeto do grupo recém-criado.
     */
    async criar(payload, onProgress) {
        const {
            groupName, description, coverImage, selectedCoverFile,
            vipMediaItems, vipDoorText, vipButtonText, price, currency,
            accessType, accessConfig, selectedProviderId, pixelId, pixelToken
        } = payload;

        const totalToUpload = vipMediaItems.filter(i => i.file).length + (selectedCoverFile ? 1 : 0);
        let uploadedCount = 0;

        const updateProgress = () => {
            if (onProgress) {
                const progress = totalToUpload > 0 ? Math.round((uploadedCount / totalToUpload) * 100) : 100;
                onProgress(progress, uploadedCount, totalToUpload);
            }
        };

        updateProgress();

        let finalCoverUrl = coverImage;
        if (selectedCoverFile) {
            finalCoverUrl = await fileService.uploadFile(selectedCoverFile);
            uploadedCount++;
            updateProgress();
        }

        const uploadedVipMedia = [];
        const filesToUpload = vipMediaItems.filter(i => i.file);
        const staticItems = vipMediaItems.filter(i => !i.file);

        for (const item of filesToUpload) {
            const url = await fileService.uploadFile(item.file);
            uploadedVipMedia.push({ url, type: item.type });
            uploadedCount++;
            updateProgress();
        }

        const finalMediaGallery = [...staticItems.map(i => ({ url: i.url, type: i.type })), ...uploadedVipMedia];

        const currentUserId = authService.getCurrentUserId();
        const currentUserEmail = authService.getCurrentUserEmail();

        const rawPrice = price.replace(/\./g, '').replace(',', '.');
        const numericPrice = parseFloat(rawPrice);

        let expirationValue = undefined;
        if (accessType === 'temporary') expirationValue = accessConfig?.interval;
        else if (accessType === 'one_time') expirationValue = `${accessConfig?.days}d${accessConfig?.hours}h`;

        const newGroup = {
            id: Date.now().toString(),
            name: groupName,
            description: description,
            coverImage: finalCoverUrl,
            isVip: true,
            price: numericPrice.toString(),
            currency: currency,
            accessType: accessType,
            selectedProviderId: selectedProviderId,
            expirationDate: expirationValue,
            vipDoor: {
                mediaItems: finalMediaGallery,
                text: vipDoorText || "Bem-vindo ao VIP!",
                buttonText: vipButtonText
            },
            lastMessage: "Grupo criado. Configure os conteúdos.",
            time: "Agora",
            creatorId: currentUserId || '',
            creatorEmail: currentUserEmail || undefined,
            memberIds: currentUserId ? [currentUserId] : [],
            adminIds: currentUserId ? [currentUserId] : [],
            status: 'active',
            pixelId: pixelId || undefined,
            pixelToken: pixelToken || undefined
        };

        return await groupService.createGroup(newGroup);
    }
};
